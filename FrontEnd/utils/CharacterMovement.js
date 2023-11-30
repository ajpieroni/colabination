import InitialItems from "./InitialItems.js";
import Tools from "./Tools.js";
import map from "./map.js";
import handleSavingData from "./Save.js";
import { updatePocket } from "./Pocket.js";

class CharacterMovement {
  // !TODO: add a "on floor" variable for game objects
  // !TODO: figure out how to pass image parameter into vending contents
  // music = null;
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

    // Map Sprites
    add([sprite("walk"), pos(-50, -50), z(5), scale(0.65)]);
    add([sprite("tables"), pos(0, 0), z(6)]);
    map();
  }

  play() {

    // !Init Inventory 
    let currItems = [];
    let currTools = [];
    let currFinals = [];
    // !Music
    
    let volumeSetting = localStorage.getItem("soundTogg")
      ? parseFloat(localStorage.getItem("soundTogg"))
      : 1;
    // !Load in tools
    Tools();

    let curr_user = localStorage.getItem("username");

    function fetchData(url) {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    fetchData(
      `http://localhost:8081/user_items/final_items?username=${curr_user}`
    )
      .then((final) => {
        console.log("final:", final);
        const itemNames = final.final_items;
        itemNames.forEach((itemName) => {
          const savedItem = add([
            pos(0, 0),
            sprite(`${itemName}`),

            scale(1.5),
            area(),
            z(0),
            "material",
            {
              itemKey: itemName,
            },
          ]);
          console.log(`${itemName} pushed to are final`);
          if (!areFinal.includes(itemName)) {
            areFinal.push(itemName);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching final items:", error);
      });
    //loading items
    let hasSavedItems = [];
    let hasSavedFinal = [];
    let hasSavedTools = [];

    function fetchUserItems(username) {
      console.log(`Fetching for ${username}`);
      return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/user_items?username=${username}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const items = data.items; 
            console.log("items", items);
            let containsPaper = items.some((subArray) =>
              subArray.includes("paper")
            );
            if (items.length == 0) {
              InitialItems(["glass", "thread", "paper", "metal"]);
            }
            if (items.length !== 0) {
              const materials = ["glass", "thread", "paper", "metal"];

              materials.forEach((material) => {
                if (!items.some((subArray) => subArray.includes(material))) {
                  console.log(`doesn't have ${material}`);
                  InitialItems([material]);
                }
              });
            }

            items.forEach((item) => {
              const itemName = item[0];
              const isFinal = item[1];
              console.log(itemName, isFinal);
              const savedItem = add([
                // rect(item.width, item.height) ,
                pos(0, 0),
                pos(0, 0),
                z(0),
                // color(item.color.r, item.color.g, item.color.b),
                sprite(`${itemName}`),
                // rect(10,10),
                // sprite(`${image}`),
                scale(1.5),
                area(),
                // z(11),
                "material",
                {
                  itemKey: itemName,
                  isFinal: isFinal,
                },
              ]);
              if (!savedItem.isFinal) {
                hasSavedItems.push(itemName);
                vendingKeys.push(savedItem.itemKey);
                vendingContents.push(savedItem);
              } else {
                if (!areFinal.includes(itemName)) {
                  areFinal.push(itemName);
                }
              }
            });
            // resolve(itemNames);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    fetchUserItems(curr_user)
      .then((itemNames) => {
        console.log(itemNames);
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
        InitialItems();
      });
    // load in tools

    // InitialItems();

    function fetchUserTools(username) {
      return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/user_tools?username=${username}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const toolNames = data.items; // Access the items property

            if (toolNames) {
              toolNames.forEach((toolName) => {
                hasSavedTools.push(toolName);
              });
              resolve(toolNames);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    fetchUserTools(curr_user)
      .then((itemTools) => {
        console.log(itemTools);
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
      });

    // !Materials
    let nearCraftingTable = false;
    let currentIndex = 0;

    // keep merge?
    const items = {
      // scissors: {
      //   spriteName: "scissors",
      //   alertSprite: "scissorsAlert",
      //   initialPos: { x: 300, y: 300 },
      //   hasFound: false,
      //   alertBox: null,
      // },
      paper: {
        spriteName: "paper",
        alertSprite: "paperAlert",
        initialPos: { x: 280, y: 300 },
        hasFound: false,
        alertBox: null,
        // onTable: false
      },

      thread: {
        spriteName: "thread",
        alertSprite: "threadAlert",

        initialPos: { x: 330, y: 300 },
        hasFound: false,
        alertBox: null,
      },
    };

    // !Init Functions
    function interactWithItem(itemKey) {
      const item = items[itemKey];
      if (cdrawer.access) {
        add([
          sprite(item.alertSprite),
          pos(center().x - 100, 20),
          scale(0.15),
          z(10),
          "alert",
          // pos(item.initialPos.x, item.initialPos.y),
        ]);
      }

      if (item.alertBox == null && !item.hasFound) {
        add([
          sprite(item.spriteName),
          area(),
          body(),
          pos(center().x - 100, center().y),
          z(10),
          scale(1.5),
          "material",
          { image: item.spriteName },
          { itemKey: item.spriteName },
        ]);
      }
    }

    // keep merge

    // !Player

    // add creates game object to be displayed on the screen
    // add function returns game objects, can store in const or var

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

    // isColliding(o: GameObj) => boolean
    // If is currently colliding with another game obj.

    // !TO FIX:
    // -if collide into drawer then into printer, both alerts show
    //* Constructor

    // Tool Logic
    let currToolY = 0;
    let currentTool = "";
    let toolAccess = false;

    onCollide("player", "tool", (s, w) => {
      console.log("collided w tool");
      finalCraftCheck = true;
      console.log(w.toolKey);
      currToolY = w.pos.y;
      currentTool = w;
      toolAccess = true;

      let toolDisplay = currentTool.toolKey
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
        pos(w.pos.x, currToolY - 18),
        color(242, 140, 40),
        z(49),
        "interactable",
      ]);
    });
    onCollideEnd("player", "tool", () => {
      toolAccess = false;
      currentTool = "";
      destroyAll("interactable");
      checkCraftable();
    });

    function craftingBackend(ingredients) {
      // !POSTING

      let toolId;
      // let ingredients = tableItems;
      if (toolAccess) {
        // *Hands are id=3, we will always use this for crafting table
        toolId = currentTool.toolId;
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
      let toolname = currentTool.toolKey
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
        if (tableItems.length >= 1 && !isPopupVisible && !craftCheck) {
          craftCheck = true;

          console.log("here is popup", isPopupVisible);
          madeCraft(result);

          // let craftText = `You made ${result.itemKey}! ${
          //   result.isFinal ? "You can find this final item in your documentation station" : ""
          // }`;
          console.log("pressed");

          async function madeCraft() {
            handleSavingData(vendingKeys, hasSavedItems, areFinal, currItems, currTools, currFinals);
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
              !vendingContents.includes(madeItem.itemKey) &&
              !vendingKeys.includes(madeItem.itemKey) &&
              !madeItem.isFinal
            ) {
              console.log("passed", !madeItem.isFinal);
              vendingContents.push(madeItem);
              vendingKeys.push(madeItem.itemKey);
            }

            if (madeItem.isFinal && !areFinal.includes(madeItem.itemKey)) {
              console.log(`${madeItem.itemKey} pushed to are final`);
              areFinal.push(madeItem.itemKey);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));

            exitCraft();

            if (volumeSetting) {
              play("bubble");
            }
            let item = vendingContents[length - 1];
            // console.log("here's item", item.itemKey)
            if (!madeItem.isFinal) {
              updatePocketVending(result, inPocket);
            }
            // updatePocket(madeItem, inPocket);
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
      if (
        toolAccess &&
        isCraftable &&
        !isCraftingVisible &&
        tableItems.length >= 1 &&
        !isPopupVisible
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

    //! Collide Logic: Player and Machine
    onCollide("player", "machine", (s, w) => {
      cricut.access = true;
    });

    onCollide("player", "cricut", (s, w) => {
      cricut.access = true;
    });

    // Collide Logic: Player and Drawer
    // onCollide("player", "drawer", (s, w) => {
    //   drawer.access = true;
    // });

    // onCollide("player", "documentationStation", (s,w) => {
    //   console.log("hit station"
    //   )
    // })
    // onCollideEnd("player", "documentationStation", (s,w) => {
    //   console.log("left station"
    //   )
    // })

    onCollide("player", "cdrawer", (s, w) => {
      cdrawer.access = true;
    });

    // player.onUpdate(() =>{
    //     if(!player.isColliding())
    // });

    onCollideEnd("player", "cdrawer", () => {
      cdrawer.access = false;
    });

    onCollideEnd("player", "craftingTable", () => {
      //end crafting access
      atCraftingTable = false;
    });

    onCollideEnd("player", "cricut", () => {
      //end crafting access
      cricut.access = false;
    });
    //*isColliding
    player.onUpdate(() => {
      if (player.isColliding("cricut")) {
        cricut.access = true;
      }
      if (player.isColliding("paper")) {
        paperCraft = true;
      }
      if (player.isColliding("scissors")) {
        scissorsCraft = true;
      }
    });

    //handle saving data and uploading to DB

    // saving for now :D
    onKeyPress("z", () => {
      handleSavingData(vendingKeys, hasSavedItems, areFinal, currItems, currTools, currFinals);
    });
    let menuOpen = false;
   

    // !INVENTORY

    let isPopupVisible = false;
    // let vendingContents = [];
    let vendingContents = [];
    let vendingKeys = [];
    let vendingSet = new Set(vendingContents);
    let inPocket = [];
    let vendingSelect = 0;
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

    onKeyPress("left", () => {
      if (isPopupVisible) {
        if (vendingSelect > 0) {
          // console.log(vendingSelect);
          vendingSelect--;
          destroyAll("selected");
          let gridX = vendingSelect % 3;
          let gridY = Math.floor(vendingSelect / 3);
          const selected = add([
            rect(70, 70),
            pos(393 + gridX * 86, 305 + gridY * 100),
            z(11),
            color(255, 255, 255),
            "selected",
          ]);
          destroyAll("itemText");
          let itemText = vendingContents[vendingSelect].itemKey;
          itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
          const selectedText = add([
            "itemText",
            text(itemText, {
              // optional object
              size: 24,
              outline: 4,
              color: (0, 0, 0),
              // can specify font here,
            }),
            area(),
            anchor("center"),
            pos(500 + 25, 500 + 100 + 25),
            z(20),

            // scale(.5)
          ]);
        }
      }
    });
    onKeyPress("right", () => {
      if (isPopupVisible) {
        if (vendingSelect < vendingContents.length - 1) {
          vendingSelect++;
          // console.log(vendingSelect);
          destroyAll("selected");
          let gridX = vendingSelect % 3;
          let gridY = Math.floor(vendingSelect / 3);
          const selected = add([
            rect(70, 70),
            pos(393 + gridX * 86, 305 + gridY * 100),
            z(11),
            color(255, 255, 255),
            "selected",
          ]);
          destroyAll("itemText");
          let itemText = vendingContents[vendingSelect].itemKey;
          itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
          const selectedText = add([
            "itemText",
            text(itemText, {
              // optional object
              size: 24,
              outline: 4,
              color: (0, 0, 0),
              // can specify font here,
            }),
            area(),
            anchor("center"),
            pos(500 + 25, 500 + 100 + 25),
            z(20),

            // scale(.5)
          ]);
        }
      }
    });
    onKeyPress("down", () => {
      if (isPopupVisible) {
        if (vendingSelect + 3 < vendingContents.length) {
          vendingSelect += 3;
          // console.log(vendingSelect);
          destroyAll("selected");
          let gridX = vendingSelect % 3;
          let gridY = Math.floor(vendingSelect / 3);
          const selected = add([
            rect(70, 70),
            pos(393 + gridX * 86, 305 + gridY * 100),
            z(11),
            color(255, 255, 255),
            "selected",
          ]);
          destroyAll("itemText");
          let itemText = vendingContents[vendingSelect].itemKey;
          itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
          const selectedText = add([
            "itemText",
            text(itemText, {
              // optional object
              size: 24,
              outline: 4,
              color: (0, 0, 0),
              // can specify font here,
            }),
            area(),
            anchor("center"),
            pos(500 + 25, 500 + 100 + 25),
            z(20),

            // scale(.5)
          ]);
        }
      }
    });
    onKeyPress("m", () => {
      this.music.paused = true;
      handleSavingData(vendingKeys, hasSavedItems, areFinal, currItems, currTools, currFinals);
      go("settings");
    });

    onKeyPress("up", () => {
      if (isPopupVisible) {
        if (vendingSelect - 3 >= 0) {
          vendingSelect -= 3;
          // console.log(vendingSelect);
          destroyAll("selected");
          let gridX = vendingSelect % 3;
          let gridY = Math.floor(vendingSelect / 3);
          const selected = add([
            rect(70, 70),
            pos(393 + gridX * 86, 305 + gridY * 100),
            z(11),
            color(255, 255, 255),
            "selected",
          ]);
          destroyAll("itemText");
          let itemText = vendingContents[vendingSelect].itemKey;
          itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
          const selectedText = add([
            "itemText",
            text(itemText, {
              // optional object
              size: 24,
              outline: 4,
              color: (0, 0, 0),
              // can specify font here,
            }),
            area(),
            anchor("center"),
            pos(500 + 25, 500 + 100 + 25),
            z(20),

            // scale(.5)
          ]);
        }
      }
    });
    onKeyPress("enter", () => {
      if (isPopupVisible && vendingContents.length > 0) {
        let item = vendingContents[vendingSelect];
        updatePocketVending(item, inPocket);
      }
    });

    function showVendingContents(contents) {
      console.log("vending contents shown");
      const popup = add([
        sprite("backpack"),
        pos(475 - 190, 125 + 25),
        z(11),
        outline(4),
        // scale(0.75),
        "vending",
      ]);
      const startX = popup.pos.x + 108;
      const startY = popup.pos.y + 155;
      let currentX = startX;
      let currentY = startY;
      let currRow = 0;
      contents.sort((a, b) => a.itemKey.localeCompare(b.itemKey));
      if (vendingContents.length > 0) {
        // itemText = (vendingContents[vendingSelect].itemKey);
        let itemText = vendingContents[0].itemKey;
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);

        const selectedText = add([
          "itemText",
          text(itemText, {
            // optional object
            size: 24,
            outline: 4,
            color: (0, 0, 0),
            // can specify font here,
          }),
          area(),
          anchor("center"),
          pos(500 + 25, 500 + 100 + 25),
          z(20),

          // scale(.5)
        ]);

        const selected = add([
          rect(70, 70),
          pos(startX, startY),
          z(11),
          color(255, 255, 255),
          "selected",
        ]);
      }
      contents.sort((a, b) => a.itemKey.localeCompare(b.itemKey));

      for (let i = 0; i < contents.length; i++) {
        const item = contents[i];
        const itemKey = item.itemKey;
        // starts a new line

        if (currRow === 3) {
          currentY += item.height + 50;
          currentX = startX;
          currRow = 0;
        }

        const vendingItem = add([
          // rect(item.width, item.height) ,
          pos(currentX, currentY),
          z(11),
          // color(item.color.r, item.color.g, item.color.b),
          "vending",
          sprite(`${item.itemKey}`),
          // rect(10,10),
          // sprite(`${image}`),
          scale(1.5),
          z(12),
          "material",
          {
            itemKey: itemKey,
          },
        ]);

        // console.log(currRow);
        currRow++;
        currentX += item.width + 35;
      }

      isPopupVisible = true;
    }

    let itemsInPocket = 0;

    function updatePocketVending(material, inPocket) {
      if (itemsInPocket < 2) {
        if (volumeSetting) {
          play("bubble");
        }
        const newItem = add([
          pos(880, itemsInPocket === 0 ? 725 : 775),
          z(11),
          sprite(`${material.itemKey}`),
          scale(1),
          "material",
          { image: material.itemKey },
          { itemKey: material.itemKey },
        ]);
        console.log(`Pushed item, ${newItem}, ${newItem.itemKey}`);
        inPocket.push(newItem);
        itemsInPocket++;
      handleSavingData(vendingKeys, hasSavedItems, areFinal, currItems, currTools, currFinals);

      } else {
        let alertText =
          "Remove items from pocket to select from vending machine";

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
        // shake(5);
      }
    }

    let firstItem = false;


    // backpack functionality
    onKeyPress("space", () => {
      if (isPopupVisible) {
        destroyAll("vending");
        destroyAll("itemText");
        destroyAll("selected");
        handleSavingData(vendingKeys, hasSavedItems, areFinal, currItems, currTools, currFinals);
        isPopupVisible = false;
        SPEED = 300;
      } else {
        if (!isDocVisible) {
          showVendingContents(vendingContents);
          destroyAll("craft");
          isPopupVisible = true;
          SPEED = 0;
          vendingSelect = 0;
        }
      }
    });
    let isDocVisible = false;
    let areFinal = [];

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
      for (let i = 0; i < areFinal.length; i++) {
        const item = areFinal[i];
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

      isDocVisible = true;
    }

    let canAccessDocumentation = false;
    let eventListenerAttached = false;

    player.onCollide("documentationStation", () => {
      canAccessDocumentation = true;

      add([
        text("Documentation Station", { size: 16 }),
        pos(700, 100 - 18),
        color(242, 140, 40),
        z(49),
        "interactable",
      ]);
      if (!eventListenerAttached) {
        eventListenerAttached = true;

        onKeyPress("enter", () => {
          // If documentation cannot be accessed, simply return
          if (!canAccessDocumentation) return;

          if (isDocVisible) {
            destroyAll("final");
            isDocVisible = false;
            SPEED = 300;
          } else {
            showFinalItems();
            isDocVisible = true;
            SPEED = 0;
          }
        });
      }
    });

    player.onCollideEnd("documentationStation", () => {
      canAccessDocumentation = false;
      destroyAll("interactable");
    });

    player.onCollide("material", (materialEntity) => {
      if (tableItems.length == 0) {
        console.log("Collided with material", materialEntity.itemKey);
        // console.log(`Here's the current vending keys: ${vendingKeys}`)
        // console.log(`!vending: ${!vendingKeys.includes(materialEntity.itemKey)}`)
        if (
          !vendingContents.includes(materialEntity) &&
          !vendingKeys.includes(materialEntity.itemKey)
        ) {
          console.log(`Pushing ${materialEntity.itemKey} to vending machine`);
          vendingContents.push(materialEntity);
          vendingKeys.push(materialEntity.itemKey);
        }
        if (volumeSetting) {
          play("bubble");
        }

        console.log("material", materialEntity);
        console.log("Updating pocket");
        let result = updatePocket(materialEntity, inPocket, itemsInPocket);
        inPocket = result.inPocket;
        itemsInPocket = result.itemsInPocket;
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

    // prompting trail

    // Dropping item on table
    onKeyPress("q", () => {
      console.log("items in pocket on q", itemsInPocket);
      // !TODO: set max items on table
      if (tableItems.length == 0 && currentTool) {
        table_x = currentTool.pos.x;
        table_y = currToolY;
      }

      if (toolAccess && onItemsOnTable >= 2 && !isPopupVisible) {
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
          toolAccess && itemsInPocket !== 0 && onItemsOnTable < 6
        );
        if (
          toolAccess &&
          itemsInPocket !== 0 &&
          onItemsOnTable < 6 &&
          !isPopupVisible
        ) {
          console.log("drop item on table");

          itemsInPocket--;
          console.log("items in pocket after dropping table", itemsInPocket);

          let item = inPocket.shift();
          console.log("here's item shifted:", item.itemKey);
          // console.log("here item key", item.itemKey);
          item.use("onTable");

          item.moveTo(table_x, table_y);
          if (inPocket.length === 1) {
            inPocket[0].moveTo(880, 725);
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
      if (inPocket.length > 0) {
        if (volumeSetting) {
          play("bubble");
        }
        let item = inPocket.shift(); // Remove the first item from the pocket
        itemsInPocket--;
        destroy(item);
        // Shift remaining items to the first slot if any
        if (inPocket.length > 0) {
          inPocket[0].moveTo(880, 725);
          if (volumeSetting) {
            play("bubble");
          }
        }
      }
    }
    let finalCraftCheck = false;

    function checkCraftable() {
      if (
        toolAccess &&
        // tableItems.includes("paper") &&
        tableItems.length >= 1 &&
        !isPopupVisible
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
      if (!toolAccess || isPopupVisible) {
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
