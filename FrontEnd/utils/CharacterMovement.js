// import { settings } from "./settings.js"
class CharacterMovement {
  // !TODO: add a "on floor" variable for game objects
  // !TODO: figure out how to pass image parameter into vending contents
  music = null;
  constructor() {
    this.level = null;
    localStorage.setItem("soundTogg",1)

    // initailize music
  }

  display() {
    let volumeSetting = localStorage.getItem("soundTogg")
      ? parseFloat(localStorage.getItem("soundTogg"))
      : 1;
      console.log("here's volume setting", volumeSetting)
    //! Level Schema
    // stop("soundtrack");
    this.music = play("soundtrack", {
      volume: volumeSetting,
      loop: true,

      // detune: soundSettings.detune,
    });
    // console.log("here are sound settings: ", soundSettings);
    // console.log("here is music settings: ", this.music.volume);

    const block_size = 32;

    const map = [
      // "=====================",
      "=$$$$$$$$$$$$$$$$$$$$$=",
      "=*********************=",
      "==$            *=",
      "==$            *=",
      "==$            *=",
      "==$            *=",
      "==$            *=",
      "==$            *=",
      "==$            *=",
      "==$            *=",
      "==$            *=",
      "==$                    ",
      "=9999999999    !99999=",
      "=9999999999    !99999=",
      "---------------------",
    ];

    add([sprite("walk"), pos(0, 0), z(5), scale(0.5)]);
    add([
      sprite("tables"),
      pos(0, 0),
      z(6),
      // scale(.5)
    ]);

    const level_config = {
      tileWidth: 64,
      tileHeight: 64,
      pos: vec2(-65, -70),

      // "=": () => [rect(block_size, block_size), color(255, 0, 0), area(), "wall"],
      tiles: {
        "=": () => [
          rect(block_size * 2, block_size),
          color(255, 0, 0),
          "wall",
          area(),
          body({ isStatic: true }),
          // z(15)
        ],
        "-": () => [
          rect(block_size / 2, block_size / 2),
          color(255, 0, 0),
          "wall",
          area(),
          body({ isStatic: true }),
          pos(0, 25),
          // z(15)
        ],
        $: () => [
          rect(block_size * 2, block_size * 2),
          color(128, 128, 128),
          area(),
          body({ isStatic: true }),
          pos(0, 25),
          // z(15)
        ],

        "*": () => [
          rect(block_size * 2, block_size * 2.5),
          color(255, 0, 0),
          area(),
          body({ isStatic: true }),
          pos(5, 25),
          // z(15)
        ],
        9: () => [
          rect(block_size * 3.5, block_size * 3.25),
          color(128, 128, 128),
          area(),
          body({ isStatic: true }),
          pos(0, 15),
          // z(15)
        ],
        "!": () => [
          rect(block_size * 5, block_size * 5),
          color(255, 0, 0),
          area(),
          body({ isStatic: true }),
          pos(-35, 0),
          // z(15)
        ],

        // "(":drawer,
      },
    };

    var level = addLevel(map, level_config);
  }

  play() {
    let volumeSetting = localStorage.getItem("soundTogg")
      ? parseFloat(localStorage.getItem("soundTogg"))
      : 1;
    // ! Game Objects
    const block_size = 64;

    const cricut = add([
      rect(block_size * 2.25, block_size),
      "machine",
      "cricut",
      // sprite("cricut"),
      area(),
      color(0, 0, 255),
      pos(330, 710),
      // z(10),
      body({ isStatic: true }),
      { access: false },
      { buildNoBlueprint: false },
    ]);

    let cricutAlertBox;
    let neededAlert;
    let PLAalertBox;
    let buildAlert;

    // const block_size = 64;

    const cdrawer = add([
      rect(block_size * 2, block_size),
      color(0, 0, 225),
      area(),
      body({ isStatic: true }),
      pos(85, 700),
      rotate(270),
      // z(10),
      "cdrawer",
      { access: false },
      { alertSprite: "cricutAlert" },
    ]);

    const drawer = add([
      rect(block_size * 2, block_size),
      color(0, 100, 0),
      area(),
      body({ isStatic: true }),
      pos(900 - 15 - 10, 250 - 10 - 10),
      rotate(270),
      // z(10),
      "drawer",
      { access: false },
    ]);

    // let cricutAlertBox;

    // !Tables
    const handTools = add([
      rect(block_size * 1.65, block_size * 4),
      color(256, 0, 0),
      area(),
      body({ isStatic: true }),
      pos(260, 260),
      z(0),
      "handTools",
      { access: false },
    ]);
    const leatherTools = add([
      rect(block_size * 1.65, block_size * 4),
      color(256, 0, 0),
      area(),
      body({ isStatic: true }),
      pos(470, 260),
      z(0),
      "leatherTable",
      { access: false },
    ]);

    const craftingTable = add([
      rect(block_size * 1.65, block_size * 4),
      color(256, 0, 0),
      area(),
      body({ isStatic: true }),
      pos(670, 260),
      z(0),
      "craftingTable",
      { access: false },
    ]);

    // !Machines
    const printer1 = add([
      rect(block_size, block_size * 2),
      color(0, 0, 255),
      area(),
      body({ isStatic: true }),
      pos(65, 200),
      // z(10),
      "printer",
      { access: false },
    ]);
    const printer2 = add([
      rect(block_size, block_size * 2),
      color(0, 0, 255),
      area(),
      body({ isStatic: true }),
      pos(65, 365),
      // z(10),
      "printer",
      { access: false },
    ]);
    const sewingMachine = add([
      rect(block_size * 2.5, block_size),
      color(255, 0, 0),
      area(),
      body({ isStatic: true }),
      pos(500, 710),
      z(0),
      "printer",
      { access: false },
    ]);
    const solderingStation = add([
      rect(block_size * 2.25, block_size),
      color(255, 0, 0),
      area(),
      body({ isStatic: true }),
      pos(140, 40),
      // z(10),

      "printer",
      { access: false },
    ]);
    //loading items
    let hasSavedItems = [];

    let hasSavedTools = [];

    function fetchUserItems(username) {
      return new Promise((resolve, reject) => {
        fetch(`http://localhost:8081/user_items?username=${username}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const itemNames = data.items; // Access the items property

            itemNames.forEach((itemName) => {
              const savedItem = add([
                // rect(item.width, item.height) ,
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
                },
              ]);
              // console.log(`itemNames values: ${itemName}`);
              hasSavedItems.push(itemName);
              vendingKeys.push(savedItem.itemKey);
              vendingContents.push(savedItem);
              // console.log(`pushed`);
            });
            resolve(itemNames);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    fetchUserItems("cats")
      .then((itemNames) => {
        console.log(itemNames);
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
      });
    // load in tools
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

            toolNames.forEach((toolName) => {
              // console.log(`toolNames values: ${toolName}`);
              hasSavedTools.push(toolName);
              // console.log(`pushed`);
            });
            resolve(toolNames);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    fetchUserTools("cats")
      .then((itemTools) => {
        console.log(itemTools);
      })
      .catch((error) => {
        console.error("Error fetching user items:", error);
      });

    // !Materials
    let nearCraftingTable = false;
    let currentIndex = 0;
    const items = {
      scissors: {
        spriteName: "scissors",
        alertSprite: "scissorsAlert",
        initialPos: { x: 300, y: 300 },
        hasFound: false,
        alertBox: null,
      },
      paper: {
        spriteName: "paper",
        alertSprite: "paperAlert",
        initialPos: { x: 280, y: 300 },
        hasFound: false,
        alertBox: null,
        // onTable: false
      },

      yarn: {
        spriteName: "yarn",
        alertSprite: "yarnAlert",

        initialPos: { x: 330, y: 300 },
        hasFound: false,
        alertBox: null,
      },
      hammer: {
        spriteName: "hammer",
        alertSprite: "hammerAlert",
        initialPos: { x: 310, y: 300 },
        hasFound: false,
        alertBox: null,
        // onTable: false
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

    // !Player

    // add creates game object to be displayed on the screen
    // add function returns game objects, can store in const or var

    let SPEED = 500;

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
    // Drawer functionality
    drawer.access = false;
    // Machine functionlaity
    cricut.access = false;
    let hasUnlockedCricut = false;
    // Blueprint
    this.foundBlueprint = false;

    // PLA Logic
    this.isAlertedPLA = false;
    this.hasFoundPLA = false;
    //! TEMP!
    let benchyFound = false;
    let benchyAdded = false;

    let paperCraft = true;
    let scissorsCraft = true;

    // C Drawer Logic
    cdrawer.access = false;
    // Scissors Logic
    this.isAlertedScissors = false;
    this.hasFoundScissors = false;
    // Paper Logic
    this.isAlertedPaper = false;
    this.hasFoundPaper = false;

    let canPopItem = true;
    // cricut drawer
    let myCDrawer = ["", "wood", "paper", "scissors"];
    const myCDrawerData = {
      scissors: { alertBox: null, hasFound: false },
      paper: { alertBox: null, hasFound: false },
      wood: { alertBox: null, hasFound: false },
      // benchy: {alertBox: null, hasFound: false}
    };
    const woodObject = myCDrawerData.wood;
    const finalItems = ["", "benchy"];
    const finalItemsData = {
      benchy: { alertBox: null, hasFound: false },
    };
    // drawer by printers
    let myDrawer = ["PLA"];
    const myDrawerData = {
      PLA: { alertBox: null, hasFound: false },
    };
    const PLA = myDrawerData["PLA"];

    // let cdrawerItems = ["", "banana", "cherry"];
    //*Player Collides and interacts
    function playerCraftsScissorsPaper() {
      if (paperCraft && scissorsCraft) {
        console.log("trueeeee");
      } else {
        console.log("fallsslssee");
      }
    }

    //! Listen for spacebar key press, when near drawer activate alert
    // For the player's interaction with drawer: Scissors, Paper, Wood, noItems
    function interactWithCDrawer() {
      if (cdrawer.access) {
        if (myCDrawer.length >= 0 && canPopItem) {
          let itemName = myCDrawer.pop();
          let foundCItem = myCDrawerData[itemName];
          canPopItem = false;
          if (foundCItem) {
            if (foundCItem.alertBox === null && !foundCItem.hasFound) {
              let currSpriteAlert = `${itemName}Alert`;
              foundCItem.alertBox = add([
                area(),
                "alert",
                pos(center().x - 100, center().y - 200),
                color(230, 230, 250),
                sprite(`${currSpriteAlert}`),
                color(230, 230, 250),
                z(10),
                scale(0.25),
              ]);
              cdrawer.access = false;
              foundCItem.alertBox = true;
              foundCItem.hasFound = true;
            }
          }
        }
        if (myCDrawer.length <= 0) {
          noItemsAlert = add([
            area(),
            "alert",
            pos(center().x - 100, center().y - 200),
            color(230, 230, 250),
            z(10),
            sprite("noItems"),
            scale(0.45),
          ]);
        }
      }
    }
    // For the player's interaction with drawer: PLA, noItems
    function interactWithDrawer() {
      if (drawer.access) {
        if (myDrawer.length > 0 && canPopItem) {
          const itemName = myDrawer.pop();
          const foundItem = myDrawerData[itemName];
          canPopItem = false;
          if (foundItem.alertBox === null && !foundItem.hasFound) {
            PLAalertBox = add([
              area(),
              "alert",
              pos(center().x - 100, center().y - 200),
              color(230, 230, 250),
              sprite("PLAalert"),
              color(230, 230, 250),
              z(10),
              scale(0.45),
            ]);
            drawer.access = false;
            foundItem.alertBox = true;
            foundItem.hasFound = true;
          }
        } else {
          noItemsAlert = add([
            area(),
            "alert",
            pos(center().x - 100, center().y - 200),
            color(230, 230, 250),
            z(10),
            sprite("noItems"),
            scale(0.45),
          ]);
        }
      }
    }
    function discoverCricut() {
      if (cricut.access && !hasUnlockedCricut) {
        cricutAlertBox = add([
          area(),
          "alert",
          pos(center().x - 100, center().y - 200),
          color(230, 230, 250),
          z(15),
          sprite("cricutAlertBox"),
          scale(0.75),
        ]);
        cricut.access = false;
        this.isAlertedPLA = true;
        // cricut.access = false;
        hasUnlockedCricut = true;
      }
      if (cricut.access && hasUnlockedCricut && !PLA.hasFound) {
        neededAlert = add([
          area(),
          "alert",
          pos(center().x - 100, center().y - 200),
          color(230, 230, 250),
          z(10),
          sprite("neededAlert"),
          scale(0.75),
        ]);
        // cricut.access = false;
        cricut.access = false;
        // cricut.buildNoBlueprint = true;
      }
    }
    function cricutCraft() {
      if (cricut.access && hasUnlockedCricut && PLA.hasFound) {
        buildAlert = add([
          area(),
          "alert",
          pos(center().x - 100, center().y - 200),
          color(230, 230, 250),
          z(10),
          sprite("3DBenchyAlert"),
          scale(0.75),
        ]);
        benchyFound = true;
        // cricut.access = false;
        cricut.access = false;
        // cricut.buildNoBlueprint = true;
      }
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
      add([
        text(`You possess ${ingredients.length} items:`),
        pos(415, 175),
        z(51),
        color(0, 0, 0),
        scale(0.5),
        "crafting",
      ]);
      for (let index = 0; index < ingredients.length; index++) {
        await new Promise((resolve) => setTimeout(resolve, 750));

        const trailCircle = add([
          circle(64),
          pos(currentx + 40, currenty + 35),
          z(52),
          color(228, 228, 228),
          "crafting",
        ]);
        if(volumeSetting){
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
      let result = {};
      let dubious = true;

      if (tableItems.includes("hammer") && tableItems.includes("paper")) {
        let madeItemKey = "wood";
        result.itemKey = madeItemKey;
        dubious = true;
      } else {
        let madeItemKey = "trash";
        result.itemKey = madeItemKey;
        dubious = false;
      }

      // console.log("dub", dubious);
      let message = dubious
        ? "Congratulations! You can make something with these items."
        : "That's definitely creative... let's see what happens!";

      console.log("result item key", result.itemKey);
      add([
        text(`${message}`),
        pos(215, 525 - 100 + 50),
        z(51),
        color(0, 0, 0),
        scale(0.5),
        "crafting",
      ]);
      // add([
      //   text(`Would you like to proceed?`),
      //   pos(215 + 150 + 50 - 25, 525 + 50 - 100),
      //   z(51),
      //   color(0, 0, 0),
      //   scale(0.5),
      //   "crafting",
      // ]);
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
        if (tableItems.length >= 2) {
          madeCraft(result);

          async function madeCraft() {
            destroyAll("crafting");
            add([
              text(`You made ${result.itemKey}!`),
              pos(440 + 40 + 25 - 50, 615), // adjust as necessary to position the text on the button
              z(53),
              color(0, 0, 0), // color of the text,
              scale(0.5),
              "crafting",
            ]);

            await new Promise((resolve) => setTimeout(resolve, 500));
            if(volumeSetting){
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
              },
            ]);
            // console.log("here result", result.itemKey);
            // updatePocketVending(madeItem, inPocket);
            // console.log("here venidng", vendingContents);
            // console.log(
            //   "here venidng contains",
            //   !vendingContents.includes(madeItem)
            // );

            if (
              !vendingContents.includes(madeItem.itemKey) &&
              !vendingKeys.includes(madeItem.itemKey)
            ) {
              vendingContents.push(madeItem);
              vendingKeys.push(madeItem.itemKey);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));

            exitCraft();
            if(volumeSetting){
              play("bubble");

            }
            let item = vendingContents[length - 1];
            // console.log("here's item", item.itemKey)
            updatePocketVending(result, inPocket);

            // updatePocket(madeItem, inPocket);
            madeItem.use(body({ isStatic: true }));
            // atCraftingTable = false;
          }
          async function exitCraft() {
            clearTable();
            destroyAll("crafting");
            destroyAll("madeItem");
            destroyAll("craftPop");
            isCraftingVisible = false;
          }
        }
      });

      //  Would you like to proceed?

      // setTimeout(3000);
    }
    //! IF PLAYER COLLIDING AGAINST PAPER SCISSORS THEN MAKE PAPER AIRPLANE???
    onKeyPress("b", () => {
      playerCraftsScissorsPaper();
      console.log("plays sound?");
      // getSound("bubble");
      if(volumeSetting){
        play("bubble");

      }
    });

    onKeyPress("enter", () => {
      //! DRAWER
      //* Cricut Drawer: Scissors, Paper, Wood, noItems
      //  interactWithCDrawer.call(this);
      //* Printing Drawer: PLA Plastic, (Pliers)
      interactWithDrawer.call(this);
      // !Machines
      //* Cricut: discovery, needs
      discoverCricut.call(this);
      //* Cricut: craft
      cricutCraft.call(this);
    });

    // !TODO: make the enter function dynamic for sprite
    // dismiss alerts
    function handleEnterPress() {
      // discoverCricut.call(this);
      //     //* Cricut: craft
      // cricutCraft.call(this);
      const itemKeys = Object.keys(items);

      if (currentIndex < itemKeys.length) {
        const currentKey = itemKeys[currentIndex];
        const currentValue = items[currentKey];
        // *Add back to check items in array when searching in drawer
        // console.log("Current item key:", currentKey);
        // console.log("Current item details:", currentValue);

        interactWithItem(currentKey);

        // Move to the next item
        currentIndex++;
      } else {
        alert("There are no more items in this drawer.");
      }
    }
    onKeyPress("enter", () => {
      // Destroys all alerts
      canPopItem = true;
      // *Add items after alert onto floor, then when we combine it will work perfectly wiht no problems
      //* Scissors
      if (cdrawer.access) {
        handleEnterPress();
      }
      setTimeout(() => {
        destroyAll("alert");
      }, 2000);

      // !TODO: Remove benchy, since final item
      let xDisplace = 10;
      if (benchyFound && !benchyAdded) {
        add(
          [
            sprite("3DBenchy"),
            pos(center().x + xDisplace, center().y),
            body({ isStatic: true }),
            area(),
            scale(1.5),
            z(5),
          ],
          "material"
        );
        benchyAdded = true;
      }
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
    onCollide("player", "drawer", (s, w) => {
      drawer.access = true;
    });

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
    function handleSavingData() {
      //hard coded items and tools, should be dynamic at some point
      console.log("vending keys", vendingKeys);
      let currItems = [];
      let currTools = [];

      for (let i = 0; i < vendingKeys.length; i++) {
        if (vendingKeys[i] === "hammer" || vendingKeys[i] === "scissors") {
          currTools.push(vendingKeys[i]);
        } else {
          currItems.push(vendingKeys[i]);
        }
      }
      // let currItems = vendingKeys;
      // * will be renamed as machines
      // let currTools = ["hammer"]
      console.log(currItems, "currItems");
      console.log(currTools, "currTools");

      const username = "cats";

      for (let i = 0; i < currItems.length; i++) {
        const currItem = currItems[i];
        // console.log(`hasSaved: ${hasSavedItems}`);
        if (!hasSavedItems.includes(currItems[i])) {
          {
            console.log(`Attempting to save ${currItem}`);

            fetch("http://localhost:8081/user_items", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: currItem, username: username }),
            })
              .then((response) => {
                if (!response.ok) {
                  return Promise.reject("Failed to save items");
                }
                console.log(`Item ${currItem} saved!`, response);
              })
              .catch((error) => {
                console.error("Error saving items:", error);
              });
            hasSavedItems.push(currItem);
          }
        } else {
          console.log(`You've already saved ${currItem}`);
        }
      }
      for (let j = 0; j < currTools.length; j++) {
        const currTool = currTools[j];
        // console.log(`hasSaved: ${hasSavedTools}`);

        // if hasn't saved
        if (!hasSavedTools.includes(currTools[j])) {
          console.log(`Attempting to save ${currTool}`);
          fetch("http://localhost:8081/user_tools", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: currTool, username: username }),
          })
            .then((response) => {
              if (!response.ok) {
                return Promise.reject("Failed to save items");
              }
              console.log(`Tool ${currTool} saved!`, response);
            })
            .catch((error) => {
              console.error("Error saving items:", error);
            });
          hasSavedTools.push(currTool);
        } else {
          console.log(`You've already saved ${currTool}`);
        }
      }
    }
    // saving for now :D
    // onKeyPress("z", () => {
    //   handleSavingData();
    // });
    let menuOpen = false;
    onKeyPress("z", () => {
      if (!menuOpen) {
        menuOpen = true;
        SPEED = 0;
        const saveButton = add([
          text("Press Enter to Save!"),
          pos(415 + 15 + 50 + 15, 615), // adjust as necessary to position the text on the button
          z(53),
          color(0, 0, 0), // color of the text,
          scale(0.5),
          "saving",
        ]);
        // Craft Button Flash
        let isBright = true;
        setInterval(() => {
          if (isBright) {
            saveButton.color = rgb(228, 228, 228); // less bright color
          } else {
            saveButton.color = rgb(80, 80, 80); // original color
          }
          isBright = !isBright;
        }, 250);
      }
    });
    onKeyPress("enter", () => {
      if (menuOpen) {
        handleSavingData();
        SPEED = 300;
        menuOpen = false;
        destroyAll("saving");
      }
    });

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
    function showVendingContents(contents) {
      const popup = add([
        rect(500, 600),
        pos(475 - 150, 125 + 25),
        z(11),
        color(105, 105, 105),
        outline(4),
        scale(0.75),
        "vending",
      ]);

      const startX = popup.pos.x + 42.5;
      const startY = popup.pos.y + 30;
      let currentX = startX;
      let currentY = startY;
      let currRow = 0;
      if (vendingContents.length > 0) {
        const selected = add([
          rect(70, 70),
          pos(startX, startY),
          z(10),
          color(255, 255, 255),
          "selected",
        ]);
      }

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
              pos(517.5 - 150 + gridX * 110, 155 + 25 + gridY * 96),
              z(11),
              color(255, 255, 255),
              "selected",
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
              pos(517.5 - 150 + gridX * 110, 155 + 25 + gridY * 96),
              z(11),
              color(255, 255, 255),
              "selected",
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
              pos(517.5 - 150 + gridX * 110, 155 + 25 + gridY * 96),
              z(11),
              color(255, 255, 255),
              "selected",
            ]);
          }
        }
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
              pos(517.5 - 150 + gridX * 110, 155 + 25 + gridY * 96),
              z(11),
              color(255, 255, 255),
              "selected",
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
        const popup = add([
          rect(500, 600),
          pos(475 - 150, 125 + 25),
          z(11),
          color(105, 105, 105),
          outline(4),
          scale(0.75),
          "vending",
        ]);

        const startX = popup.pos.x + 42.5;
        const startY = popup.pos.y + 30;
        let currentX = startX;
        let currentY = startY;
        let currRow = 0;
        if (vendingContents.length > 0) {
          const selected = add([
            rect(70, 70),
            pos(startX, startY),
            z(11),
            color(255, 255, 255),
            "selected",
          ]);
        }
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
            // !TODO: Make sprite image dynamic
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

          onClick(() => {
            // Check if the mouse click occurred within the bounds of itemEntity
            if (isClicked(vendingItem)) {
              updatePocketVending(vendingItem, inPocket);
            }
          });
          // console.log(currRow);
          currRow++;
          currentX += item.width + 50;
        }

        isPopupVisible = true;
      }

      function getDistance(x1, y1, x2, y2) {
        let x = x2 - x1;
        let y = y2 - y1;

        return Math.sqrt(x * x + y * y);
      }
      // Function to check if the mouse click occurred within the bounds of an entity
      function isClicked(item) {
        let distance = getDistance(
          mousePos().x,
          mousePos().y,
          item.pos.x,
          item.pos.y
        );
        return distance <= 55;
      }

      let itemsInPocket = 0;

      function updatePocketVending(material, inPocket) {
        if (itemsInPocket < 2) {
          if (itemsInPocket === 0) {
            if(volumeSetting){
              play("bubble");

            }
            // console.log(`Incoming material: ${material}, ${material.itemKey}`);
            const item1 = add([
              pos(880, 700),
              z(11),
              sprite(`${material.itemKey}`),
              scale(1),
              "material",
              { image: material.itemKey },
              { itemKey: material.itemKey },
            ]);
            console.log(`Pushed item1, ${item1}, ${item1.itemKey}`);
            inPocket.push(item1);
          } else {
            if(volumeSetting){
              play("bubble");

            }
            const item2 = add([
              pos(880, 775),
              z(11),
              z(11),
              sprite(`${material.itemKey}`),
              scale(1),
              "material",
              { image: material.itemKey },
              { itemKey: material.itemKey },
            ]);
            inPocket.push(item2);
          }
          itemsInPocket++;
        } else {
          // shake(5);
          alert("Remove items from pocket to select from vending machine");
        }
      }

      function updatePocket(material, inPocket) {
        if (itemsInPocket < 2) {
          if (itemsInPocket === 0) {
            // console.log("one");
            // pos(855,700)
            material.moveTo(880, 725);
            material.scaleTo(1);
          } else {
            // console.log("two");
            // moves to spot 2
            material.moveTo(880, 775);
          }
          itemsInPocket++;
          inPocket.push(material);
        } else {
          destroy(material);
        }
      }

      // backpack functionality
      onKeyPress("v", () => {
        if (isPopupVisible) {
          destroyAll("vending");
          destroyAll("selected");
          isPopupVisible = false;
          SPEED = 300;
        } else {
          showVendingContents(vendingContents);
          isPopupVisible = true;
          SPEED = 0;
          vendingSelect = 0;
        }
      });

      player.onCollide("material", (materialEntity) => {
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
        if(volumeSetting){
          play("bubble");

        }

        updatePocket(materialEntity, inPocket);
        materialEntity.use(body({ isStatic: true }));
      });

      let atCraftingTable = false;
      let table_x = 700;
      let table_y = 350;
      let onItemsOnTable = 0;
      let tableItems = [];
      function clearTable() {
        tableItems.length = 0;
        destroyAll("onTable");
        destroyAll("craft");
        table_x = 700;
        table_y = 300;
        onItemsOnTable = 0;
        tableItems = [];
      }

      // Crafting logic:
      // !TODO: Remove hardcode after Ollie's code
      let isCraftable = false;

      // prompting trail

      // Dropping item on table
      onKeyPress("q", () => {
        // !TODO: set max items on table
        if (tableItems.length == 0) {
          table_x = 700;
          table_y = 350;
        }

        if (atCraftingTable && onItemsOnTable >= 3) {
          alert("There are too many items on the table; try crafting!");
          // checkCraftable();
        } else {
          console.log(
            "check",
            atCraftingTable && itemsInPocket !== 0 && onItemsOnTable < 6
          );
          if (atCraftingTable && itemsInPocket !== 0 && onItemsOnTable < 6) {
            itemsInPocket--;

            let item = inPocket.pop();
            // console.log("here's item:", item);
            // console.log("here item key", item.itemKey);
            item.use("onTable");

            item.moveTo(table_x, table_y);
            tableItems[onItemsOnTable] = item.itemKey;
            console.log(tableItems);
            table_y += 50;
            onItemsOnTable++;
            checkCraftable(tableItems);
          } else {
            checkCraftable();

            if (itemsInPocket !== 0) {
              if(volumeSetting){
                play("bubble");

              }
              itemsInPocket--;
              let item = inPocket.pop();
              console.log("here is popped", item);
              console.log("key?", item.itemKey);

              destroy(item);
            }
          }
        }
      });

      function checkCraftable() {
        if (
          atCraftingTable &&
          // tableItems.includes("paper") &&
          // tableItems.includes("hammer") || atCraftingTable && tableItems.includes("yarn") && tableItems.includes("hammer")
          tableItems.length >= 2
        ) {
          isCraftable = true;
          if (isCraftable) {
            // console.log("hit");
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
          }
        }
        if (!atCraftingTable) {
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
    }
    onKeyPress("m", () => {
      this.music.paused = true;
      
      go("settings");
    });

  }
  
}
export const characterMovement = new CharacterMovement();
