import InitialItems from "./InitialItems.js";
import Tools, {
  addToolToGame,
  addNewTool,
  checkForToolAddition,
} from "./Tools.js";
import map from "./map.js";
import { resetInactivityTimer, logout, handleSavingData } from "./Save.js";
import {
  closeDocumentationStation,
  showFinalItems,
  docuLeft,
  docuRight,
  docuUp,
  docuDown,
} from "./DocuStation.js";
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
import { handleCollideDocumentationStationEnd } from "./Collide.js";

import {
  openBackpack,
  vendingLeft,
  vendingRight,
  vendingDown,
  vendingUp,
} from "./Vending.js";
import { fetchUserItems, fetchUserTools, initializeUser } from "./User.js";
import {
  handleCollideDocumentationStation,
  onToolCollide,
  onToolCollideEnd,
} from "./Collide.js";
import { checkCraftable } from "./Craft.js";

/**
 * Represents the character movement class.
 * This class acts as the main control for character movement and interactions.
 */
class CharacterMovement {
  // This file acts as our main control.
  // It initializes the game, and controls the player's movement.
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
    const block_size = 64;
    // Map Sprites
    add([sprite("walk"), pos(0, 0), z(0), scale(0.5)]);
    const tableBlock = add([
      rect(block_size * 1.65, block_size * 1.95),
      // make the color green
      color(0, 256, 0),
      area(),
      body({ isStatic: true }),
      pos(260, 260 + 200 - 75 + 15 - 140),
      z(1),
      // note that this block will be destroyed after scissors
      "temp",
    ]);
    add([sprite("tables"), pos(0, 0), z(2), scale(0.5)]);
    map();
  }
  /**
   * Represents the play function.
   */
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
      hint: false,
      hintId: "",
      combinable: {},
      achievements: {
        mystery: false,
        allItems: false,
        corgi: {
          discovered: false,
          populated: false,
        },
      },
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
      vendingSelect: 0,
      // Documentation Station
      areFinal: [],
      docuPage: 0,
      curr_user: localStorage.getItem("username"),
      hasSavedItems: [],
      hasSavedFinal: [],
      finalCraftCheck: false,
      tableItems: [],
      isCraftable: false,
      ingredients: [],
      docuPage: 0,
      docuSelect: 0,
      // pagination for vending
      vendingPage: 0,
    };
    let tableState = {
      atCraftingTable: false,
      table_x: 700,
      table_y: 550,
      onItemsOnTable: 0,
    };
    
    function messageCreate(message) {
      const alertMessage = add([
        "alert",
        text(message, {
          // optional object
          size: 24,
          outline: 4,
          color: (25,25,112),
          // can specify font here,
        }),
        area(),
        anchor("center"),
        pos(525,100),
        z(500),
        // scale(.5)
      ]);
      const blueBox = add([
        rect(500+200+200,100),
        area(),
        anchor("center"),
        pos(525, 100),
        z(19),
        color(1, 33, 105),
        "alert"
      ]);
    }

    if (localStorage.getItem("tutorial") === "true") {
      messageCreate("Welcome to the main game!");
    }
    onKeyPress(() => {
      destroyAll("alert");
    });
    // Music
    let volumeSetting = localStorage.getItem("soundTogg")
      ? parseFloat(localStorage.getItem("soundTogg"))
      : 1;
    let music = {
      volume: volumeSetting,
    };
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
    if (
      craftState.achievements.corgi.discovered &&
      !craftState.achievements.corgi.populated
    ) {
      const corgi = add([
        sprite("corgi"),
        // scale(0.25),
        pos(player.pos.x, player.pos.y + 10),
        "corgi",
        area(),
        body(),
        z(10),
      ]);
      craftState.achievements.corgi.populated = true;
    }

    player.onCollide("helpStation", () => {
      // console.log("Collided with help station");
      displayControlsOnPress();
      
    });
    player.onCollideEnd("helpStation", () => {
      // console.log("Collidedend with help station");
      destroyAll("controls");
    });
    function displayControlsOnPress(){
      add([
        rect(600, 550),
        pos((1024 - 600) / 2, 175),
        color(255, 255, 255),
        opacity(0.8),
        outline(6, rgb(255, 255, 255)),
        "box",
        area(),
        z(11),
        "controls",
      ]);
  
          add([
      text("Controls"),
      pos((1024 - 170) / 2, 210),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);

    add([
      text("Keyboard", {
        size: 28,
      }),
      pos((1024 - 140) / 2, 275),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
    add([
      text("Move ---------- WASD/Arrow Keys", {
        size: 24,
        width: 460,
      }),
      pos((1024 - 450) / 2, 310),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
    add([
      text("Select ------------------ Enter", {
        size: 24,
        width: 460,
      }),
      pos((1024 - 450) / 2, 345),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
    add([
      text("Menu ------------------------ M", {
        size: 24,
        width: 460,
      }),
      pos((1024 - 450) / 2, 380),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
    add([
      text("Game Cabinet", {
        size: 28,
      }),
      pos((1024 - 160) / 2, 415),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
    add([
      text("Move ----------------- Joystick", {
        size: 24,
        width: 460,
      }),
      pos((1024 - 450) / 2, 450),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
    add([
      text("Select ---------------------- A", {
        size: 24,
        width: 460,
      }),
      pos((1024 - 450) / 2, 485),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
    add([
      text("Back Pack ------------------- A", {
        size: 24,
        width: 460,
      }),
      pos((1024 - 450) / 2, 520),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
    add([
      text("Drop ------------------------ B", {
        size: 24,
        width: 460,
      }),
      pos((1024 - 450) / 2, 555),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
    add([
      text("Menu --------------------- Menu", {
        size: 24,
        width: 460,
      }),
      pos((1024 - 450) / 2, 590),
      color(0, 0, 0),
      area(),
      z(12),
      "controls",
    ]);
  }

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
      // hasDiscovered: hashset
      hasDiscovered: new Set(),
      lastStored: new Set(),
      adding: false,
      toolsLeft: 5,
    };

    initializeUser(inventoryState, toolState, craftState);

    function messageCreate(message) {
      const alertMessage = add([
        "alert",
        text(message, {
          // optional object
          size: 24,
          outline: 4,
          color: (25, 25, 112),
          // can specify font here,
        }),
        area(),
        anchor("center"),
        pos(525, 100),
        z(500),
        // scale(.5)
      ]);
      const blueBox = add([
        rect(500 + 200 + 200, 100),
        area(),
        anchor("center"),
        pos(525, 100),
        z(19),
        color(46,139,87),
        "alert",
      ]);
    }
function messageCreateMenu(message) {
      const alertMessage = add([
        "alert",
        text(message, {
          // optional object
          size: 24,
          outline: 4,
          color: (25, 25, 112),
          // can specify font here,
        }),
        area(),
        anchor("center"),
        pos(475, 775),
        z(500),
        // scale(.5)
      ]);
      const blueBox = add([
        rect(450, 100),
        area(),
        anchor("center"),
        pos(475, 775),
        z(19),
        color(46,139,87),     
        "alert",
      ]);
    }

    if (localStorage.getItem("tutorial") === "true") {
      messageCreate("Welcome to the main game!");
      messageCreateMenu("Press M to open the menu");
      localStorage.setItem("tutorial", "false");
    }
    onKeyPress(() => {
      destroyAll("alert");
    });

    onCollide("player", "tool", (s, w) => {
      onToolCollide(craftState, toolState, inventoryState, s, w);
    });

    onCollideEnd("player", "tool", (


    ) => {
      onToolCollideEnd(toolState, inventoryState);
    });

    onKeyPress("h", () => {
      if (craftState.current === "crafting") {
        inventoryState.vendingSelect = 0;
        // toggle true and false
        craftState.hint = !craftState.hint;
        
        // console.log(toolState.currentTool.id);
        let hintId = toolState.currentTool.id;
        craftState.hintId = hintId;
        closeBackpack();
        openBackpack(inventoryState, craftState, toolState);
        if (!craftState.hint) {
          destroyAll("hint");
        }
      }
    });
    // !NEW CRAFT
    onKeyPress("enter", () => {
      if (
        craftState.current === "moving" &&
        !craftState.popUp &&
        toolState.toolAccess &&
        inventoryState.vendingContents.length > 0
      ) {
        toolState.lastStored = new Set(inventoryState.vendingKeys);
        openCraftWindow(craftState, inventoryState, toolState, music);
        craftState.current = "crafting"; // Change state to craft
      } else if (
        craftState.current === "crafting" &&
        !craftState.isAddingItem
      ) {
        selectItem(craftState, inventoryState, music, toolState);
      }
    });

    // ON key press q, remove item from craft window
    onKeyPress("q", () => {
      // console.log(`Current ingredient: ${inventoryState.ingredients}`);
      if (craftState.current === "crafting") {
        removeItemFromCraft(inventoryState, music);
      }
      destroyAll("toolAlert")
    });

    // ON key press space, craft
    onKeyPress("space", () => {
      // console.log("Current state:", craftState.current);
      if (craftState.current === "crafting" && craftState.readyToCraft) {
        executeCraft(toolState, craftState, inventoryState, tableState, music);
      } else if (craftState.current === "executed") {
        restartCraft(craftState, inventoryState, toolState);
      }
    });

    onKeyPress("backspace", () => {
      // console.log("Pressed");
      closeCraftWindow(craftState, inventoryState, toolState);
      if (craftState.achievements.mystery && !craftState.achievements.corgi.populated) {
        this.music.paused = true;
        const alertMessage = add([
          "achievement",
          text("You have unlocked the mystery achievement!", {
            // optional object
            size: 24,
            outline: 4,
            color: (25, 25, 112),
            // can specify font here,
          }),
          area(),
          anchor("center"),
          pos(525, 100 - 35),
          z(500),
          // scale(.5)
          "toolAlert",
        ]);
        const alertMessageDetail = add([
          "achievement",
          text(
            "Congratulations on using every tool! A corgi has joined you in your adventure.",
            {
              // optional object
              size: 16,
              outline: 4,
              color: (25, 25, 112),
              // can specify font here,
            }
          ),
          area(),
          anchor("center"),
          pos(525, 100 - 35 + 15 + 5 + 5),
          z(500),
          // scale(.5)
          "toolAlert",
        ]);

        const toolAlertBox = add([
          rect(500 + 200 + 200, 50 * 2),
          area(),
          anchor("center"),
          pos(500, 500 + 100 - 500 - 25),
          z(5),
          color(242, 140, 30),
          "toolAlert",
        ]);

        const exitAlert = add([
          "toolAlert",
          // rgb for black is (0, 0, 0)
          text("Press [ Q ] To Dismiss", {
            size: 16,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(500, 500 + 100 + 50 - 500),
          z(11),
        ]);

        const exitButton = add([
          rect(300, 40),
          pos(500 - 25 - 100 - 25, 500 + 100 + 50 - 500 - 25 + 5),
          z(5),
          color(228, 228, 228),
          "toolAlert",
        ]);

        // key press flash
        // Craft Button Flash
        let isBright = true;
        setInterval(() => {
          if (isBright) {
            exitButton.color = rgb(228, 228, 228); // less bright color
          } else {
            exitButton.color = rgb(80, 80, 80); // original color
          }
          isBright = !isBright;
        }, 250); // the button color will toggle every 500ms
        // after pressing enter, destroy the alert
        onKeyPress("enter", () => {
          destroyAll("toolAlert");
        });
        onKeyPress("q", () => {
          destroyAll("toolAlert");
        });
        // Add Corgi on Achievement
        craftState.achievements.corgi.discovered = true;
        addCorgi(craftState);
        console.log(inventoryState.vendingContents.length);
        if (craftState.current === "documentation") {
          closeDocumentationStation(craftState, inventoryState);
        }
      }
    });

    //! Player Movement
    // Player search
    // WASD

    onKeyDown("a", () => {
      // .move() is provided by pos() component, move by pixels per second
      player.move(-getSpeed(), 0);
      addCorgi(craftState);
    });
    onKeyDown("d", () => {
      player.move(getSpeed(), 0);
      addCorgi(craftState);
    });

    onKeyDown("w", () => {
      player.move(0, -getSpeed());
      addCorgi(craftState);
    });

    onKeyDown("s", () => {
      player.move(0, getSpeed());
      addCorgi(craftState);
    });
    // Arrow Keys
    onKeyDown("left", () => {
      // .move() is provided by pos() component, move by pixels per second
      player.move(-getSpeed(), 0);
      addCorgi(craftState);
    });
    onKeyDown("right", () => {
      player.move(getSpeed(), 0);
      addCorgi(craftState);
    });

    onKeyDown("up", () => {
      player.move(0, -getSpeed());
      addCorgi(craftState);
    });

    onKeyDown("down", () => {
      player.move(0, getSpeed());
      addCorgi(craftState);
    });

    onCollideEnd("player", "craftingTable", () => {
      tableState.atCraftingTable = false;
    });

    // !VENDING
    let itemText = "";

    // Backpack Movement
    onKeyPress("left", () => {
      if (craftState.current == "documentation") {
        docuLeft(inventoryState, craftState);
      } else if (craftState.current !== "executed") {
        vendingLeft(inventoryState, craftState, toolState);
      }
      // console.log(inventoryState.vendingSelect);
    });

    onKeyPress("right", () => {
      if (craftState.current == "documentation") {
        docuRight(inventoryState, craftState);
      } else if (craftState.current !== "executed") {
        vendingRight(inventoryState, craftState, toolState);
      }
    });

    onKeyPress("down", () => {
      // // console.log("down");
      if (craftState.current == "documentation") {
        docuDown(inventoryState, craftState);
      } else if (craftState.current !== "executed") {
        vendingDown(inventoryState, craftState, toolState);
      }
    });

    onKeyPress("up", () => {
      if (craftState.current == "documentation") {
        docuUp(inventoryState, craftState);
      } else if (craftState.current !== "executed") {
        vendingUp(inventoryState, craftState, toolState);
      }
    });

    // Open Menu
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

    // !TODO: export to doc statino file

    player.onCollide("documentationStation", () => {
      handleCollideDocumentationStation(
        collisionState,
        showFinalItems,
        inventoryState,
        craftState
      );
    });

    player.onCollideEnd("documentationStation", () => {
      handleCollideDocumentationStationEnd(
        collisionState,
        inventoryState,
        craftState
      );
    });

    // Collide with Material
    player.onCollide("material", (materialEntity) => {
      if (inventoryState.tableItems.length == 0) {
        // console.log("Collided with material", materialEntity.itemKey);
        if (
          !inventoryState.vendingContents.includes(materialEntity) &&
          !inventoryState.vendingKeys.includes(materialEntity.itemKey)
        ) {
          // console.log(`Pushing ${materialEntity.itemKey} to vending machine`);
          inventoryState.vendingContents.push(materialEntity);
          inventoryState.vendingKeys.push(materialEntity.itemKey);
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
        if (volumeSetting) {
          play("bubble");
        }
        destroy(materialEntity);
        materialEntity.use(body({ isStatic: true }));
      }
    });

    // Crafting Collisions
    onCollide("player", "craftingTable", (s, w) => {
      tableState.atCraftingTable = true;
      checkCraftable(toolState, inventoryState, volumeSetting);
    });
    onCollideEnd("player", "craftingTable", (s, w) => {
      tableState.atCraftingTable = false;
      checkCraftable(toolState, inventoryState, volumeSetting);
    });
    function addCorgi(craftState) {
      if (
        craftState.achievements.corgi.discovered &&
        !craftState.achievements.corgi.populated
      ) {
        const corgi = add([
          sprite("corgi"),
          // scale(0.25),
          pos(player.pos.x, player.pos.y + 10),
          "corgi",
          area(),
          body(),
          z(10),
        ]);
        craftState.achievements.corgi.populated = true;
        onKeyDown("a", () => {
          // .move() is provided by pos() component, move by pixels per second
          corgi.move(-getSpeed(), 0);
        });
        onKeyDown("d", () => {
          corgi.move(getSpeed(), 0);
        });

        onKeyDown("w", () => {
          corgi.move(0, -getSpeed());
        });

        onKeyDown("s", () => {
          corgi.move(0, getSpeed());
        });
        // Arrow Keys
        onKeyDown("left", () => {
          // .move() is provided by pos() component, move by pixels per second
          corgi.move(-getSpeed(), 0);
        });
        onKeyDown("right", () => {
          corgi.move(getSpeed(), 0);
        });

        onKeyDown("up", () => {
          corgi.move(0, -getSpeed());
        });

        onKeyDown("down", () => {
          corgi.move(0, getSpeed());
        });
      }
    }
  }
}
export const characterMovement = new CharacterMovement();
