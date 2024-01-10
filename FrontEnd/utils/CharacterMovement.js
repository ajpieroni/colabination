import InitialItems from "./InitialItems.js";
import Tools from "./Tools.js";
import map from "./map.js";
import handleSavingData from "./Save.js";
import { updatePocket, updatePocketVending } from "./Pocket.js";
import {
  showVendingContents,
  onKeyPressLeft,
  onKeyPressRight,
  onKeyPressDown,
  onKeyPressUp,
} from "./Vending.js";
import { fetchUserItems, fetchUserTools } from "./User.js";
import { handleCollideDocumentationStation } from "./Collide.js";
class CharacterMovement {
  // This file acts as our main control.
  music = null;
  constructor() {
    this.level = null;
    localStorage.setItem("soundTogg", 1);
  }

  display() {
    // Music
    let volumeSetting = localStorage.getItem("soundTogg")
      ? parseFloat(localStorage.getItem("soundTogg"))
      : 1;
    this.music = play("soundtrack", {
      volume: volumeSetting,
      loop: true,
    });

    // Initialize Tools
    Tools();

    // Map Sprites
    add([sprite("walk"), pos(-50, -50), z(5), scale(0.65)]);
    add([sprite("tables"), pos(0, 0), z(6)]);
    map();
  }

  play() {
    // Inventory Control
    let inventoryState = {
      // Init Inventory
      currItems: [],
      currTools: [],
      currFinals: [],
      // Vending & Pocket
      vendingKeys: [],
      isPopupVisible: false,
      vendingContents: [],
      inPocket: [],
      vendingSelect: 0,
      // Documentation Station
      areFinal: [],
      curr_user: localStorage.getItem("username"),
      hasSavedItems: [],
      hasSavedFinal: [],
      itemsInPocket: 0,
    };



    fetchUserItems(
      inventoryState.curr_user,
      inventoryState.hasSavedItems,
      inventoryState.vendingKeys,
      inventoryState.vendingContents,
      inventoryState.areFinal
    )
      .then((itemNames) => {
        console.log(itemNames);
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
        InitialItems();
      });
    fetchUserTools(inventoryState.curr_user)
      .then((itemTools) => {
        console.log(itemTools);
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
      });

    // Music
    let volumeSetting = localStorage.getItem("soundTogg")
      ? parseFloat(localStorage.getItem("soundTogg"))
      : 1;

    // Player
    let SPEED = 300;
    const player = add([
      sprite("characterSprite"),
      scale(0.25),
      pos(center().x + 250, center().y + 300),
      "player",
      area(),
      body(),
      z(10),
    ]);
    // Collision Control
    let collisionState = {
      canAccessDocumentation: false,
      isDocVisible: false,
      eventListenerAttached: false,
      SPEED: 300,
    };

    let toolState = {
      currToolY: 0,
      currentTool: "",
      toolAccess: false,
    };

    onCollide("player", "tool", (s, w) => {
      finalCraftCheck = true;
      console.log(w.toolKey);
      toolState.currToolY = w.pos.y;
      toolState.currentTool = w;
      toolState.toolAccess = true;

      let toolDisplay = toolState.currentTool.toolKey
        // space
        .replace(/([A-Z])/g, " $1")
        //trim
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      checkCraftable();
      add([
        text(toolDisplay, { size: 16 }),
        pos(w.pos.x, toolState.currToolY - 18),
        color(242, 140, 40),
        z(49),
        "interactable",
      ]);
    });
    onCollideEnd("player", "tool", () => {
      toolState.toolAccess = false;
      toolState.currentTool = "";
      destroyAll("interactable");
      checkCraftable();
    });
    // *TODO: move to file
    function craftingBackend(ingredients) {
      // !POSTING

      let toolId;
      // let ingredients = tableItems;
      if (toolState.toolAccess) {
        // *Hands are id=3, we will always use this for crafting table
        toolId = toolState.currentTool.toolId;
        console.log(toolId);
      } else {
        // !TODO: check this doesn't break
        toolId = 3;

        // !TODO: fetch tool id
        // http://localhost:8081/tools/find_by_name/scissors
      }

      console.log(ingredients);

      let item1sprite = ingredients[0];
      console.log("item 1 sprite", item1sprite);
      let item2sprite = ingredients.length > 1 ? ingredients[1] : "nothing";
      console.log("item 2 sprite", item2sprite);

      fetch(`http://localhost:8081/items/find_by_name/${item1sprite}`)
        .then((response) => response.json())
        .then((item1data) => {
          console.log("Item 1:", item1data);
          if (item2sprite !== "nothing") {
            fetch(`http://localhost:8081/items/find_by_name/${item2sprite}`)
              .then((response) => response.json())
              .then((item2data) => {
                console.log("Item 2:", item2data);
                fetchCombination(
                  toolId,
                  item1data.id,
                  item2data.id,
                  handleCreation
                );
              })
              .catch((error) => console.error("Error fetching item 2:", error));
          } else {
            fetchCombination(toolId, item1data.id, 6, handleCreation);
          }
        })
        .catch((error) => console.error("Error fetching item 1:", error));

      // fetchCombination(toolId, item1data, item2data)
      // http://localhost:8081/items/find_by_name/paper
      // http://localhost:8081/tools/find_by_name/scissors
      // http://localhost:8081/combinations?tool=1&item1=1&item2=1
    }
    let result = {};
    // *TODO: move to file

    function fetchCombination(toolId, item1Id, item2Id, callback) {
      console.log(toolId, item1Id, item2Id);
      fetch(
        `http://localhost:8081/combinations?tool=${toolId}&item1=${item1Id}&item2=${item2Id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Combination result:", data);
          console.log(`${data.creation}`);

          fetch(
            `http://localhost:8081/items/find_by_name_craft/${data.creation}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((additionalData) => {
              console.log("new item result:", additionalData);
              callback(data.creation, additionalData.data.isFinal, data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching combination:", error);
        });
    }

    function handleCreation(creation, final, item) {
      result.itemKey = creation;
      result.isFinal = final;
      console.log("here is crafted result: ", result);
    }
    // !Crafting Function: Paper Trail
    let isCraftingVisible = false;
    // *TODO: move to file

    async function showContainer(tableItems) {
      isCraftingVisible = true;

      await new Promise((resolve) => setTimeout(resolve, 500));
      let ingredients = tableItems;
      console.log(ingredients);
      add([
        rect(725, 550),
        pos(150, 125),
        z(50),
        "craft-container",
        "craftPop",
      ]);
      await new Promise((resolve) => setTimeout(resolve, 500));

      let currentx = 400;
      let currenty = 300;
      if (ingredients.length == 3) {
        currentx = currentx - 125;
      }
      if (ingredients.length == 1) {
        currentx = currentx + 100;
      }

      let possessionText = `You possess ${ingredients.length} item${
        ingredients.length > 1 ? "s" : ""
      }:`;
      let toolname = toolState.currentTool.toolKey
        // space
        .replace(/([A-Z])/g, " $1")
        //trim
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      let toolText = `Let's try crafting with the ${toolname}.`;

      add([
        text(possessionText),
        pos(415, 175),
        z(51),
        color(0, 0, 0),
        scale(0.5),
        "crafting",
      ]);

      add([
        text(toolText),
        pos(415 - 200 + 100, 175 + 50),
        z(51),
        color(0, 0, 0),
        scale(0.5),
        "crafting",
      ]);
      console.log("here are ingredients");
      craftingBackend(ingredients);

      for (let index = 0; index < ingredients.length; index++) {
        await new Promise((resolve) => setTimeout(resolve, 750));

        const trailCircle = add([
          circle(64),
          pos(currentx + 40, currenty + 35),
          z(52),
          color(228, 228, 228),
          "crafting",
        ]);
        if (volumeSetting) {
          play("bubble");
        }
        const trailItem = add([
          // rect(item.width, item.height) ,
          pos(currentx, currenty),
          z(100),
          // color(item.color.r, item.color.g, item.color.b),
          "crafting",
          // !TODO: Make sprite image dynamic
          sprite(`${ingredients[index]}`),
          // rect(10,10),
          // sprite(`${image}`),
          scale(1.5),
          // z(11),
          "material",
          {
            itemKey: ingredients[index],
          },
        ]);
        currentx += 200;
      }

      let message;
      if (result.itemKey === "trash") {
        message = "That's definitely creative... let's see what happens!";
      } else {
        message = "Congratulations! You can make something with these items.";
      }

      console.log("result item key", result.itemKey);
      add([
        text(`${message}`),
        pos(215, 525 - 100 + 50),
        z(51),
        color(0, 0, 0),
        scale(0.5),
        "crafting",
      ]);

      // *Craft Button
      const craftButton = add([
        rect(150, 50),
        pos(400 + 50, 600),
        z(52),
        color(228, 228, 228),
        "crafting",
      ]);
      add([
        text("Make!"),
        pos(415 + 15 + 50 + 15, 615), // adjust as necessary to position the text on the button
        z(53),
        color(0, 0, 0), // color of the text,
        scale(0.5),
        "crafting",
      ]);
      // Craft Button Flash
      let isBright = true;
      setInterval(() => {
        if (isBright) {
          craftButton.color = rgb(228, 228, 228); // less bright color
        } else {
          craftButton.color = rgb(80, 80, 80); // original color
        }
        isBright = !isBright;
      }, 250); // the button color will toggle every 500ms
      // !TODO: dynamic
      // let result = "wood";
      let craftCheck = false;
      onKeyPress("enter", () => {
        if (tableItems.length >= 1 && !inventoryState.isPopupVisible && !craftCheck) {
          craftCheck = true;

          console.log("here is popup", inventoryState.isPopupVisible);
          madeCraft(result);
          console.log("pressed");

          async function madeCraft() {
            handleSavingData(
              inventoryState.vendingKeys,
              inventoryState.hasSavedItems,
              inventoryState.areFinal,
              inventoryState.currItems,
              inventoryState.currTools,
              inventoryState.currFinals,
              inventoryState.hasSavedFinal
            );
            let craftText = `You made ${result.itemKey}! ${
              result.isFinal
                ? `You can find ${result.itemKey} in the documentation station.`
                : ""
            }`;

            let textSizeX = result.isFinal
              ? 350 - 100 - 50 - 10 - 5 - 5 - 5 - 5
              : 440 + 40 + 25 - 50;

            destroyAll("crafting");
            add([
              text(craftText),
              pos(textSizeX, 615),
              z(53),
              color(0, 0, 0),
              scale(0.5),
              "crafting",
            ]);

            await new Promise((resolve) => setTimeout(resolve, 500));
            if (volumeSetting) {
              play("bubble");
            }
            const trailCircle = add([
              circle(64),
              pos(440 + 40 + 25 + 25, 135 + 100),
              z(52),
              color(152, 251, 152),
              "crafting",
            ]);
            const madeItem = add([
              // rect(item.width, item.height) ,
              pos(
                440 + 40 + 25 + 25 - 25 - 5 - 5 - 5,
                135 + 100 + 25 - 50 - 10
              ),
              z(100),
              // color(item.color.r, item.color.g, item.color.b),
              "crafting",
              sprite(`${result.itemKey}`),
              // rect(10,10),
              // sprite(`${image}`),
              scale(1.5),
              area(),
              // z(11),
              "madeItem",
              {
                itemKey: result.itemKey,
                isFinal: result.isFinal,
              },
            ]);

            if (
              !inventoryState.vendingContents.includes(madeItem.itemKey) &&
              !inventoryState.vendingKeys.includes(madeItem.itemKey) &&
              !madeItem.isFinal
            ) {
              console.log("passed", !madeItem.isFinal);
              inventoryState.vendingContents.push(madeItem);
              inventoryState.vendingKeys.push(madeItem.itemKey);
            }

            if (madeItem.isFinal && !inventoryState.areFinal.includes(madeItem.itemKey)) {
              console.log(`${madeItem.itemKey} pushed to are final`);
              inventoryState.areFinal.push(madeItem.itemKey);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));

            exitCraft();

            if (volumeSetting) {
              play("bubble");
            }
            let item = inventoryState.vendingContents[length - 1];
            // console.log("here's item", item.itemKey)
            if (!madeItem.isFinal) {
              updatePocketVending(
                result,
                inventoryState.inPocket,
                inventoryState.itemsInPocket,
                volumeSetting
              );
              // console.log(result);
              if (result.n) {
                inventoryState.inPocket = result.inventoryState.inPocket;
                inventoryState.itemsInPocket = result.inventoryState.itemsInPocket;
              }

              handleSavingData(
                inventoryState.vendingKeys,
                inventoryState.hasSavedItems,
                inventoryState.areFinal,
                inventoryState.currItems,
                inventoryState.currTools,
                inventoryState.currFinals,
                inventoryState.hasSavedFinal
              );
            }
            // updatePocket(madeItem, inventoryState.inPocket);
            madeItem.use(body({ isStatic: true }));
            // atCraftingTable = false;
          }
          async function exitCraft() {
            SPEED = 300;
            clearTable();
            destroyAll("crafting");
            destroyAll("madeItem");
            destroyAll("craftPop");
            isCraftingVisible = false;
            craftCheck = false;
            add([
              text("Saving..."),
              pos(615 - 100 - 50, 615),
              z(53),
              color(0, 0, 0),
              scale(0.5),
              "crafting",
            ]);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            destroyAll("crafting");
          }
        }
      });
    }

    onKeyPress("enter", () => {
      // !Craft
      // *TODO: move to file

      if (
        toolState.toolAccess &&
        isCraftable &&
        !isCraftingVisible &&
        tableItems.length >= 1 &&
        !inventoryState.isPopupVisible
      ) {
        SPEED = 0;
        destroyAll("craft");
        add([
          "craft",
          text("Crafting...", {
            // optional object
            size: 36,
            outline: 4,
            color: (0, 0, 0),
            // can specify font here,
          }),
          area(),
          anchor("center"),
          pos(500, 500),
          z(20),

          // scale(.5)
        ]);
        if (volumeSetting) {
          play("craftFX");
        }
        // setTimeout(clearTable, 3000);

        // console.log(`change scene here to ${tableItems}`);
        showContainer(tableItems);
      }
    });

    // !TODO: make the enter function dynamic for sprite
    // dismiss alerts

    onKeyPress("enter", () => {
      setTimeout(() => {
        destroyAll("alert");
      }, 2000);
    });

    //! Player Movement
    // Player search
    // WASD

    onKeyDown("a", () => {
      // .move() is provided by pos() component, move by pixels per second
      player.move(-SPEED, 0);
    });
    onKeyDown("d", () => {
      player.move(SPEED, 0);
    });

    onKeyDown("w", () => {
      player.move(0, -SPEED);
    });

    onKeyDown("s", () => {
      player.move(0, SPEED);
    });
    // Arrow Keys
    onKeyDown("left", () => {
      // .move() is provided by pos() component, move by pixels per second
      player.move(-SPEED, 0);
    });
    onKeyDown("right", () => {
      player.move(SPEED, 0);
    });

    onKeyDown("up", () => {
      player.move(0, -SPEED);
    });

    onKeyDown("down", () => {
      player.move(0, SPEED);
    });

    onCollideEnd("player", "craftingTable", () => {
      atCraftingTable = false;
    });

    // !INVENTORY
    // Character pocket
    const pocket = add([
      // pos(1300, 600),
      // pos(1080,520),
      pos(855, 700),
      rect(200, 200),
      outline(4),
      color(0, 0, 55),
      area(),
      body({ isStatic: true }),
      "pocket",
      z(0),
    ]);

    // !VENDING
    let itemText = "";

    // *TODO: move
    onKeyPress("left", () => {
      console.log("left");
      inventoryState.vendingSelect = onKeyPressLeft(
        inventoryState.isPopupVisible,
        inventoryState.vendingSelect,
        inventoryState.vendingContents
      );
    });

    onKeyPress("right", () => {
      console.log("right");
      inventoryState.vendingSelect = onKeyPressRight(
        inventoryState.isPopupVisible,
        inventoryState.vendingSelect,
        inventoryState.vendingContents
      );
    });
    onKeyPress("down", () => {
      console.log("down");
      inventoryState.vendingSelect = onKeyPressDown(
        inventoryState.isPopupVisible,
        inventoryState.vendingSelect,
        inventoryState.vendingContents
      );
    });

    onKeyPress("up", () => {
      inventoryState.vendingSelect = onKeyPressUp(
        inventoryState.isPopupVisible,
        inventoryState.vendingSelect,
        inventoryState.vendingContents
      );
    });

    onKeyPress("m", () => {
      this.music.paused = true;
      handleSavingData(
        inventoryState.vendingKeys,
        inventoryState.hasSavedItems,
        inventoryState.areFinal,
        inventoryState.currItems,
        inventoryState.currTools,
        inventoryState.currFinals,
        inventoryState.hasSavedFinal
      );
      go("settings");
    });

    onKeyPress("enter", () => {
      if (inventoryState.isPopupVisible && inventoryState.vendingContents.length > 0) {
        let item = inventoryState.vendingContents[inventoryState.vendingSelect];

        let result = updatePocketVending(
          item,
          inventoryState.inPocket,
          inventoryState.itemsInPocket,
          volumeSetting
        );
        if (result.n) {
          inventoryState.inPocket = result.inPocket;
          inventoryState.itemsInPocket = result?.itemsInPocket;
        }
        handleSavingData(
          inventoryState.vendingKeys,
          inventoryState.hasSavedItems,
          inventoryState.areFinal,
          inventoryState.currItems,
          inventoryState.currTools,
          inventoryState.currFinals,
          inventoryState.hasSavedFinal
        );
      }
    });

    inventoryState.itemsInPocket = 0;

    // backpack functionality
    onKeyPress("space", () => {
      if (inventoryState.isPopupVisible) {
        destroyAll("vending");
        destroyAll("itemText");
        destroyAll("selected");
        handleSavingData(
          inventoryState.vendingKeys,
          inventoryState.hasSavedItems,
          inventoryState.areFinal,
          inventoryState.currItems,
          inventoryState.currTools,
          inventoryState.currFinals,
          inventoryState.hasSavedFinal
        );
        inventoryState.isPopupVisible = false;
        SPEED = 300;
      } else {
        if (!collisionState.isDocVisible) {
          showVendingContents(inventoryState.vendingContents, inventoryState.isPopupVisible);
          destroyAll("craft");
          inventoryState.isPopupVisible = true;
          SPEED = 0;
          inventoryState.vendingSelect = 0;
        }
      }
    });
    collisionState.isDocVisible = false;

    function showFinalItems() {
      const docPop = add([
        rect(500, 600),
        pos(325, 150),
        z(11),
        color(204, 229, 255),
        outline(4),
        scale(0.75),
        "final",
      ]);
      const startX = docPop.pos.x + 42.5;
      const startY = docPop.pos.y + 30;
      let currentX = startX;
      let currentY = startY;
      let currRow = 0;
      for (let i = 0; i < inventoryState.areFinal.length; i++) {
        const item = inventoryState.areFinal[i];
        itemText = item.charAt(0).toUpperCase() + item.slice(1);
        console.log(item);

        // const itemKey = item.itemKey;
        // starts a new line

        if (currRow === 3) {
          currentY += item.height + 50;
          currentX = startX;
          currRow = 0;
        }

        const finalItem = add([
          pos(currentX, currentY),
          z(11),
          sprite(`${item}`),
          "final",
          { itemKey: item },
        ]);

        const finalItemText = add([
          pos(currentX, currentY + 50),
          text(itemText, {
            // optional object
            size: 16,
            color: (255, 255, 255),
            // can specify font here,
          }),
          z(11),
          "final",
          // { itemKey: item },
        ]);
        currRow++;
        currentX += 100;
      }

      collisionState.isDocVisible = true;
    }

    let canAccessDocumentation = false;
    let eventListenerAttached = false;

    player.onCollide("documentationStation", () => {
      handleCollideDocumentationStation(collisionState, showFinalItems);
    });

    player.onCollideEnd("documentationStation", () => {
      canAccessDocumentation = false;
      destroyAll("interactable");
    });

    player.onCollide("material", (materialEntity) => {
      if (tableItems.length == 0) {
        console.log("Collided with material", materialEntity.itemKey);
        if (
          !inventoryState.vendingContents.includes(materialEntity) &&
          !inventoryState.vendingKeys.includes(materialEntity.itemKey)
        ) {
          console.log(`Pushing ${materialEntity.itemKey} to vending machine`);
          inventoryState.vendingContents.push(materialEntity);
          inventoryState.vendingKeys.push(materialEntity.itemKey);
        }
        if (volumeSetting) {
          play("bubble");
        }

        console.log("material", materialEntity);
        console.log("Updating pocket");
        let result = updatePocket(materialEntity, inventoryState.inPocket, inventoryState.itemsInPocket);
        inventoryState.inPocket = result?.inPocket;
        inventoryState.itemsInPocket = result?.itemsInPocket;
        materialEntity.use(body({ isStatic: true }));
      }
    });

    let atCraftingTable = false;
    let table_x = 700;
    let table_y = 550;
    let onItemsOnTable = 0;
    let tableItems = [];
    function clearTable() {
      tableItems.length = 0;
      destroyAll("onTable");
      destroyAll("craft");
      table_x = 700;
      table_y = 550;
      onItemsOnTable = 0;
      tableItems = [];
    }

    // Crafting logic:
    // !TODO: Remove hardcode after Ollie's code
    let isCraftable = false;

    // Dropping item on table
    onKeyPress("q", () => {
      console.log("items in pocket on q", inventoryState.itemsInPocket);
      // !TODO: set max items on table
      if (tableItems.length == 0 && toolState.currentTool) {
        table_x = toolState.currentTool.pos.x;
        table_y = toolState.currToolY;
      }

      if (toolState.toolAccess && onItemsOnTable >= 2 && !inventoryState.isPopupVisible) {
        let alertText = "There are too many items on the table; try crafting!";

        add([
          "alertPop",
          text(alertText, {
            // optional object
            size: 24,
            outline: 4,
            color: (0, 0, 0),
            // can specify font here,
          }),
          area(),
          anchor("center"),
          pos(500 + 25, 500 - 300),
          z(20),
          // scale(.5)
        ]);
        add([
          rect(500 + 200 + 200, 50),
          area(),
          anchor("center"),
          pos(500 + 25, 500 - 300),
          z(19),
          color(242, 140, 40),
          "alertPop",
        ]);

        setTimeout(() => {
          destroyAll("alertPop");
        }, 2000);
        // checkCraftable();
      } else {
        console.log(
          "check",
          toolState.toolAccess && inventoryState.itemsInPocket !== 0 && onItemsOnTable < 6
        );
        if (
          toolState.toolAccess &&
          inventoryState.itemsInPocket !== 0 &&
          onItemsOnTable < 6 &&
          !inventoryState.isPopupVisible
        ) {
          console.log("drop item on table");
          console.log("inventoryState.inPocket", inventoryState.inPocket);

          inventoryState.itemsInPocket--;
          console.log("items in pocket after dropping table", inventoryState.itemsInPocket);

          let item = inventoryState.inPocket.shift();

          // console.log("here's item shifted:", item.itemKey);
          // console.log("here item key", item.itemKey);
          item.use("onTable");

          item.moveTo(table_x, table_y);
          if (inventoryState.inPocket.length === 1) {
            inventoryState.inPocket[0].moveTo(880, 725);
          }
          tableItems[onItemsOnTable] = item.itemKey;

          table_y += 50;
          onItemsOnTable++;
          checkCraftable(tableItems);
        } else {
          console.log("hit else");
          checkCraftable();
          rearrangePocket();
        }
      }
    });
    function rearrangePocket() {
      if (inventoryState.inPocket.length > 0) {
        if (volumeSetting) {
          play("bubble");
        }
        let item = inventoryState.inPocket.shift(); // Remove the first item from the pocket
        inventoryState.itemsInPocket--;
        destroy(item);
        // Shift remaining items to the first slot if any
        if (inventoryState.inPocket.length > 0) {
          inventoryState.inPocket[0].moveTo(880, 725);
          if (volumeSetting) {
            play("bubble");
          }
        }
      }
    }
    let finalCraftCheck = false;

    function checkCraftable() {
      if (
        toolState.toolAccess &&
        // tableItems.includes("paper") &&
        tableItems.length >= 1 &&
        !inventoryState.isPopupVisible
      ) {
        isCraftable = true;
        if (isCraftable) {
          // !TODO: allow users to move around, for now, only allow them to stay at the station until the craft is complete
          // console.log("hit");
          SPEED = 0;
          add([
            "craft",
            text("Craft?", {
              // optional object
              size: 36,
              outline: 4,
              color: (0, 0, 0),
              // can specify font here,
            }),
            area(),
            anchor("center"),
            pos(500, 500),
            z(20),
            // scale(.5)
          ]);
          finalCraftCheck = true;
        }
      }
      if (!toolState.toolAccess || inventoryState.isPopupVisible) {
        destroyAll("craft");
      }
    }
    // Crafting Collisions
    onCollide("player", "craftingTable", (s, w) => {
      atCraftingTable = true;
      checkCraftable();
    });
    onCollideEnd("player", "craftingTable", (s, w) => {
      atCraftingTable = false;
      checkCraftable();
    });
    // Function to check session status
    let inactivityTimer;

    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        // Call the logout function after 15 minutes of inactivity
        logout();
      }, 900000); // 15 minutes in milliseconds
    }

    function logout() {
      fetch("http://localhost:8081/logout", { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            go("login");
            window.location.reload();
          }
        })
        .catch((error) => console.error("Error:", error));
    }
    resetInactivityTimer();
    onKeyPress(() => {
      resetInactivityTimer();
    });
    onMouseMove(() => {
      resetInactivityTimer();
    });
  }
}
export const characterMovement = new CharacterMovement();
