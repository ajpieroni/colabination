import InitialItems from "./InitialItems.js";
import Tools from "./Tools.js";
import map from "./map.js";
import { resetInactivityTimer, logout, handleSavingData } from "./Save.js";
import { updatePocket, updatePocketVending } from "./Pocket.js";
import { getSpeed, setSpeed } from "./Player.js";
import {
  craftingBackend,
  openCraftWindow,
  closeCraftWindow,
  removeItemFromCraft,
  executeCraft,
  restartCraft,
} from "./Craft.js";
import { getCurrentItemInBackpack } from "./Vending.js";
import { closeBackpack } from "./Vending.js";
import { addItemToCraftWindow, selectItem } from "./Craft.js";
import { handleCollideDocumentationStationEnd} from "./Collide.js";

import {
  openBackpack,
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
import { checkCraftable} from "./Craft.js";

class Tutorial {
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
    add([sprite("walk"), pos(-50, -50), z(0), scale(0.65)]);
    // add([sprite("tables"), pos(0, 0), z(6)]);
    map();
  }

  play() {
    let craftState = {
      craftCheck: false,
      resultReay: false,
      result: { itemKey: "", isFinal: false },
      // Checks if they've pressed enter on the craft prompt
      craftSelected: false,
      // Checks if the new craft popup is open
      popUp: false,
      // Checks if they are opening the window for the first time, selected item is null
      firstOpen: true,
      isAddingItem: false,
      // Checks for enter keypress
      isCraftWindowOpen: false,
      current: "moving",
      // There is either one or two items placed in the crafting window
      readyToCraft: false,
    };

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
      ingredients: [],
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
    let music = {
      volume: volumeSetting,
    }
    window.music = music;
    

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
      onToolCollide(craftState, toolState, inventoryState, s, w);
    });

    onCollideEnd("player", "tool", () => {
      onToolCollideEnd(toolState, inventoryState);
    });

    let isCraftingVisible = false;
    let tableTemp = inventoryState.tableItems;

    // !NEW CRAFT

    onKeyPress("enter", () => {
      if (
        craftState.current === "moving" &&
        !craftState.popUp &&
        toolState.toolAccess &&
        inventoryState.vendingContents.length > 0
      ) {
        openCraftWindow(craftState, inventoryState, toolState, music);
        craftState.current = "crafting"; // Change state to craft
      } else if (
        craftState.current === "crafting" &&
        !craftState.isAddingItem
      ) {
        selectItem(craftState, inventoryState, music);
      }
    });

    // ON key press q, remove item from craft window
    onKeyPress("q", () => {
      if (craftState.current === "crafting") {
        removeItemFromCraft(inventoryState, music);
      }
    });

    // ON key press space, craft
    onKeyPress("space", () => {
      console.log("Current state:", craftState.current);
      if (craftState.current === "crafting" && craftState.readyToCraft) {
        executeCraft(toolState, craftState, inventoryState, tableState, music);
      } else if (craftState.current === "executed") {
        restartCraft(craftState, inventoryState, toolState);
      }
    });

    onKeyDown("escape", () => {
      // console.log("Pressed")
      closeCraftWindow(craftState, inventoryState);
    });


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

    // !VENDING
    let itemText = "";

    // *TODO: move
    onKeyPress("left", () => {
      console.log(craftState.current);
      if (craftState.current !== "executed") {
        onKeyPressLeft(inventoryState, craftState);
      }
    });

    onKeyPress("right", () => {
      if (craftState.current !== "executed") {
        onKeyPressRight(inventoryState, craftState);
      }
    });

    onKeyPress("down", () => {
      // console.log("down");
      if (craftState.current !== "executed") {
        onKeyPressDown(inventoryState, craftState);
      }
    });

    onKeyPress("up", () => {
      if (craftState.current !== "executed") {
        onKeyPressUp(inventoryState, craftState);
      }
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
        let resultDisplay = itemText
        // space
        .replace(/([A-Z])/g, " $1")
        //trim
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    

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
          text(resultDisplay, {
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
      handleCollideDocumentationStationEnd(collisionState);
    });
    function waitForCollision() {
      return new Promise((resolve) => {
        const checkCollision = () => {
          if (collidedPaper) {
            resolve();
          } else {
            setTimeout(checkCollision, 100); // Check every 100 milliseconds
          }
        };
        checkCollision();
      });
    }
    let readyToCraft = false;
    function waitForStep2() {
      return new Promise((resolve) => {
        const checkCollision = () => {
          if (readyToCraft) {
            resolve();
          } else {
            setTimeout(checkCollision, 100); 
          }
        };
        checkCollision();
      });
    }
    // let collidedHammer = false;
    function waitForHammer() {
      return new Promise((resolve) => {
        const checkCollision = () => {
          if (toolState.currentTool.toolKey === "hammer") {
            resolve();
          } else {
            setTimeout(checkCollision, 100); // Check every 100 milliseconds
          }
        };
        checkCollision();
      });
    }
    let madePaper = false;
    function waitForPaper(){  
      return new Promise((resolve) => {
        const checkCraft = () => {
          if (craftState.result.itemKey === "paper") {
            resolve();
          } else {
            setTimeout(checkCraft, 100); // Check every 100 milliseconds
          }
        };
        checkCraft();
      });
    }
    console.log(toolState.currentTool, "toolstate");
    
    let collidedPaper  = false;
    player.onCollide("material", (materialEntity) => {
      if (inventoryState.tableItems.length == 0) {
        console.log("Collided with material", materialEntity.itemKey);
        if (materialEntity.itemKey === "wood") {
          collidedPaper = true;
        }

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
        craftState.result = updatePocket(
          materialEntity,
          inventoryState.inPocket,
          inventoryState.itemsInPocket
        );
        inventoryState.inPocket = craftState.result?.inPocket;
        inventoryState.itemsInPocket = craftState.result?.itemsInPocket;
        materialEntity.use(body({ isStatic: true }));
      }
    });

   

    // Crafting logic:
    inventoryState.isCraftable = false;

    // Dropping item on table
    onKeyPress("q", () => {
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
  
    function messageCreate(message) {
      add([
        "alert",
        text(message, {
          // optional object
          size: 20,
          outline: 4,
          color: (25,25,112),
          // can specify font here,
        }),
        area(),
        anchor("center"),
        pos(525,125),
        z(500),
        // scale(.5)
      ]);
      // add([
      //   rect(500+200,100),
      //   area(),
      //   anchor("center"),
      //   pos(525, 125),
      //   z(490),
      //   color(230,230,250),
      //   "alert"

      // ])
    }


    async function tutorialStart() {
      setSpeed(0);
      let message = "Welcome to the tutorial! Let's get started.";
      messageCreate(message);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      destroyAll("alert");
    
      message = "Try picking up the items you see on the floor!";
      messageCreate(message); 
      setSpeed(300);
    
      await waitForCollision();
    
      destroyAll("alert");
      message = "Great! Now, let's head to the hammer station.";
      messageCreate(message);
    
      await waitForHammer();
      let step1 = false;
      destroyAll("alert");
      message = "Nice job! Now, let's begin crafting! Press 'Enter' to open the crafting window.";
      step1 = true;
      messageCreate(message);
      if (step1) {
        onKeyPress("enter", () => {
          destroyAll("alert");
          message = "Now, try selecting an item by pressing 'Enter' on the item and try to make paper.";
          messageCreate(message);
          readyToCraft = true;
      });      
      
    }
      await waitForPaper();
      destroyAll("alert");
      message = "Great job! You've made paper! Exit out of Hammer!";
      messageCreate(message);
    }

      function stopTutorial() {
      }
      
      tutorialStart();

  }}
  export const tutorial = new Tutorial();
