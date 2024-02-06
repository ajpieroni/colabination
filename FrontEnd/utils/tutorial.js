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
import { handleCollideDocumentationStationEnd } from "./Collide.js";
// Z-Level Tracker:
// 0: "Walk" background: 0
// 10: Player
// 11: "Craft" text, Tool Labels
// 11: Selected Item
// 19: Backpack
// 20: Items in backpack
// 20: "Crafting..." text

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
import { checkCraftable, clearTable, dropItem } from "./Craft.js";

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
      resultReady: false,
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
        openCraftWindow(craftState, inventoryState, toolState);
        craftState.current = "crafting"; // Change state to craft
      } else if (
        craftState.current === "crafting" &&
        !craftState.isAddingItem
      ) {
        selectItem(craftState, inventoryState);
      }
    });

    // ON key press q, remove item from craft window
    onKeyPress("q", () => {
      if (craftState.current === "crafting") {
        removeItemFromCraft(inventoryState);
      }
    });

    // ON key press space, craft
    onKeyPress("space", () => {
      console.log("Current state:", craftState.current);
      if (craftState.current === "crafting" && craftState.readyToCraft) {
        executeCraft(toolState, craftState, inventoryState, tableState);
      } else if (craftState.current === "executed") {
        restartCraft(craftState, inventoryState, toolState);
      }
    });

    onKeyDown("escape", () => {
      // console.log("Pressed")
      closeCraftWindow(craftState, inventoryState);
    });

    // !OLD CRAFT

    async function showContainer(tableTemp) {
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
      craftingBackend(toolState, ingredients, craftState);

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
      if (craftState.result.itemKey === "trash") {
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
    
  }

     async function tutorialStart() {
        // Check if the character has a hammer and two papers in their inventory
        setSpeed(300);
        let message = "Welcone to the tutorial! Let's get started."
            add([
              text(message),
              pos(415-100+50-25-25, 175+50),
              z(51),
              color(0, 0, 0),
              scale(0.35),
              "alert",
            ]);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            destroyAll("alert");
        setSpeed(300);

        message = "Try picking up the items you see on the floor!";
        add([
          text(message),
          pos(415-100+50-25-25, 175+50),
          z(51),
          color(0, 0, 0),
          scale(0.35),
          "alert",
        ]);

        await new Promise((resolve) => setTimeout(resolve, 5000));
        destroyAll("alert");
        setSpeed(300);

        message = "Now try finding the hammer station!";
        add([
          text(message),
          pos(415-100+50-25-25, 175+50),
          z(51),
          color(0, 0, 0),
          scale(0.35),
          "alert",
        ]);
        setSpeed(300);

        await new Promise((resolve) => setTimeout(resolve, 5000));
        destroyAll("alert");
        if (inventoryState.currTools.includes("hammer")) {
          message = "Let us try crafting paper with the hammer and two wood!";
          add([
            text(message),
            pos(415-100+50-25-25, 175+50),
            z(51),
            color(0, 0, 0),
            scale(0.35),
            "alert",
          ]);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          destroyAll("alert");
        }
        setSpeed(300);

        // if (
        //   inventoryState.currTools.includes("hammer") &&
        //   inventoryState.currItems.includes("paper") &&
        //   inventoryState.currItems.filter((item) => item === "paper").length >= 2
        // ) {
        //   // Craft the paper using the hammer and two papers
        //   const craftResult = await craft("hammer", ["paper", "paper"]);

        //   // Check if the crafting was successful
        //   if (craftResult.success) {
        //     // Add the crafted paper to the inventory
        //     inventoryState.currItems.push(craftResult.item);

        //     // Update the inventory UI
        //     updateInventoryUI();

            

        //     // Continue the tutorial
        //     continueTutorial();
        //   } else {
        //     // Show an error message to the player
        //     let stepFailure = "Crafting failed. Please make sure you have a hammer and two papers.";
        //     add([
        //       text(stepFailure),
        //       pos(415-100+50-25-25, 175+50),
        //       z(51),
        //       color(0, 0, 0),
        //       scale(0.35),
        //       "alert",
        //     ]);
        //     await new Promise((resolve) => setTimeout(resolve, 1000));
        //     destroyAll("alert");
        //   }
        // } else {
        //   let stepTip = "To make paper, you need a hammer and two papers.";
        //     add([
        //       text(stepTip),
        //       pos(415-100+50-25-25, 175+50),
        //       z(51),
        //       color(0, 0, 0),
        //       scale(0.35),
        //       "alert",
        //     ]);
        //     await new Promise((resolve) => setTimeout(resolve, 1000));
        //     destroyAll("alert");

      //     // Show a message to the player indicating the required items

      //     // Stop the tutorial
      //     stopTutorial();
      //   }

       }

    
      function continueTutorial() {
        // Continue the tutorial logic here...
      }

      function stopTutorial() {
      }

      // Call the tutorial function
      tutorialStart();

  }}
  export const tutorial = new Tutorial();
