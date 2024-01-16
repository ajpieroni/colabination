import InitialItems from "./InitialItems.js";
import Tools from "./Tools.js";
import map from "./map.js";
import { resetInactivityTimer, logout, handleSavingData } from "./Save.js";
import { updatePocket, updatePocketVending } from "./Pocket.js";
import { getSpeed, setSpeed } from "./Player.js";

import {
  showVendingContents,
  onKeyPressLeft,
  onKeyPressRight,
  onKeyPressDown,
  onKeyPressUp,
} from "./Vending.js";
import { fetchUserItems, fetchUserTools, intiailizeUser } from "./User.js";
import {
  handleCollideDocumentationStation,
  onToolCollide,
  onToolCollideEnd,
} from "./Collide.js";
import { checkCraftable, clearTable, dropItem } from "./Craft.js";

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
    let craftCheck = false;
    let resultReady = false;
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
      finalCraftCheck: false,
      tableItems: [],
      isCraftable: false,
      resultReady: false,
    };
    let tableState = {
      atCraftingTable: false,
      table_x: 700,
      table_y: 550,
      onItemsOnTable: 0,
    };

    intiailizeUser(inventoryState);

    // Music
    let volumeSetting = localStorage.getItem("soundTogg")
      ? parseFloat(localStorage.getItem("soundTogg"))
      : 1;

    // Player
    setSpeed(300);
    const player = add([
      sprite("characterSprite"),
      scale(0.25),
      pos(center().x + 250, center().y + 300),
      "player",
      area(),
      body(),
      z(10),
    ]);

    // Logout
    // Function to check session status
    onKeyPress(() => {
      resetInactivityTimer();
    });
    onMouseMove(() => {
      resetInactivityTimer();
    });

    // Collision Control
    let collisionState = {
      canAccessDocumentation: false,
      isDocVisible: false,
      eventListenerAttached: false,
    };

    // Tool Control
    let toolState = {
      currToolY: 0,
      currentTool: "",
      toolAccess: false,
    };

    onCollide("player", "tool", (s, w) => {
      onToolCollide(toolState, inventoryState, s, w);
    });

    onCollideEnd("player", "tool", () => {
      onToolCollideEnd(toolState, inventoryState);
    });

    function craftingBackend(ingredients) {
      // !POSTING

      let toolId;
      if (toolState.toolAccess) {
        toolId = toolState.currentTool.toolId;
      } else {
        toolId = 3;
      }
      console.log("Crafting backend...");
      let item1sprite = ingredients[0];

      let item2sprite = ingredients.length > 1 ? ingredients[1] : "nothing";

      fetch(`http://localhost:8081/items/find_by_name/${item1sprite}`)
        .then((response) => response.json())
        .then((item1data) => {
          if (item2sprite !== "nothing") {
            fetch(`http://localhost:8081/items/find_by_name/${item2sprite}`)
              .then((response) => response.json())
              .then((item2data) => {
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
            console.log("Fetching combination...");
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
              resultReady = true;

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

      console.log("Set result...");
    }

    // !Crafting Function: Paper Trail
    let isCraftingVisible = false;
    // *TODO: move to file
    let tableTemp = inventoryState.tableItems;

    async function showContainer(tableTemp) {
      console.log("Showing container...");
      isCraftingVisible = true;

      await new Promise((resolve) => setTimeout(resolve, 500));
      let ingredients = tableTemp;
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
      craftingBackend(ingredients);

      console.log("resultReady", resultReady);

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
      
      onKeyPress("enter", () => {
        console.log("Result ready: ", resultReady);
        if (
          inventoryState.tableItems.length >= 1 &&
          !inventoryState.isPopupVisible &&
          !craftCheck &&
          resultReady
        ) {
          // !Testing

          craftCheck = !craftCheck;

          console.log("here is popup", inventoryState.isPopupVisible);
          console.log("MADE CRAFT CALLED, enter pressed");
          madeCraft(result);

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

            if (
              madeItem.isFinal &&
              !inventoryState.areFinal.includes(madeItem.itemKey)
            ) {
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
                inventoryState.itemsInPocket =
                  result.inventoryState.itemsInPocket;
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
            // tableState.atCraftingTable = false;
          }
          async function exitCraft() {
            console.log(getSpeed());
            setSpeed(300);
            clearTable(inventoryState, tableState);
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
        inventoryState.isCraftable &&
        !isCraftingVisible &&
        inventoryState.tableItems.length >= 1 &&
        !inventoryState.isPopupVisible &&
        craftCheck == false
      ) {
        setSpeed(0);
        console.log(getSpeed());
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
        showContainer(inventoryState.tableItems);
      }
    });

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
      player.move(-getSpeed(), 0);
    });
    onKeyDown("d", () => {
      player.move(getSpeed(), 0);
    });

    onKeyDown("w", () => {
      player.move(0, -getSpeed());
    });

    onKeyDown("s", () => {
      player.move(0, getSpeed());
    });
    // Arrow Keys
    onKeyDown("left", () => {
      // .move() is provided by pos() component, move by pixels per second
      player.move(-getSpeed(), 0);
    });
    onKeyDown("right", () => {
      player.move(getSpeed(), 0);
    });

    onKeyDown("up", () => {
      player.move(0, -getSpeed());
    });

    onKeyDown("down", () => {
      player.move(0, getSpeed());
    });

    onCollideEnd("player", "craftingTable", () => {
      tableState.atCraftingTable = false;
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
      if (
        inventoryState.isPopupVisible &&
        inventoryState.vendingContents.length > 0
      ) {
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
        console.log(getSpeed());
        setSpeed(300);
      } else {
        if (!collisionState.isDocVisible) {
          showVendingContents(
            inventoryState.vendingContents,
            inventoryState.isPopupVisible
          );
          destroyAll("craft");
          inventoryState.isPopupVisible = true;
          console.log(getSpeed());
          setSpeed(0);
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
      if (inventoryState.tableItems.length == 0) {
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
        let result = updatePocket(
          materialEntity,
          inventoryState.inPocket,
          inventoryState.itemsInPocket
        );
        inventoryState.inPocket = result?.inPocket;
        inventoryState.itemsInPocket = result?.itemsInPocket;
        materialEntity.use(body({ isStatic: true }));
      }
    });

    console.log("here is inv. state", inventoryState);
    clearTable(inventoryState, tableState);

    // Crafting logic:
    inventoryState.isCraftable = false;

    // Dropping item on table
    onKeyPress("q", () => {
      console.log("here is table state", tableState);
      dropItem(toolState, inventoryState, volumeSetting, tableState);
    });

    inventoryState.finalCraftCheck = false;

    // Crafting Collisions
    onCollide("player", "craftingTable", (s, w) => {
      tableState.atCraftingTable = true;
      checkCraftable(toolState, inventoryState, volumeSetting);
    });
    onCollideEnd("player", "craftingTable", (s, w) => {
      tableState.atCraftingTable = false;
      checkCraftable(toolState, inventoryState, volumeSetting);
    });
  }
}
export const characterMovement = new CharacterMovement();
