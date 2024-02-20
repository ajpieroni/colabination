import InitialItems from "./InitialItems.js";
import Tools from "./Tools.js";
import map from "./map.js";
import { resetInactivityTimer, logout, handleSavingData } from "./Save.js";
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
import { checkCraftable } from "./Craft.js";

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
      vendingSelect: 0,
      // Documentation Station
      areFinal: [],
      curr_user: localStorage.getItem("username"),
      hasSavedItems: [],
      hasSavedFinal: [],
      finalCraftCheck: false,
      tableItems: [],
      isCraftable: false,
      ingredients: [],
      // pagination
      page: 0,
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

// !TODO: remove, instead introduce pagination with arrows
    onKeyPress("2", () => {
      inventoryState.page = inventoryState.page + 1;
      closeBackpack();
      openBackpack(inventoryState,craftState);
    });
    onKeyPress("1", () => {
      if(inventoryState.page > 0){
      inventoryState.page = inventoryState.page - 1;
      }
      closeBackpack();
      openBackpack(inventoryState,craftState);
    });

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
      craftingBackend(
        toolState,
        ingredients,
        craftState,
        inventoryState,
        music
      );

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
      console.log(inventoryState.vendingSelect);
      console.log(craftState.current);
      if (craftState.current !== "executed") {
        onKeyPressLeft(inventoryState, craftState);
      }
      console.log(inventoryState.vendingSelect);
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

    // !TODO: export to doc statino file

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
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
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
    let collidedWood  = false;
    player.onCollide("material", (materialEntity) => {
      if (inventoryState.tableItems.length == 0) {
        console.log("Collided with material", materialEntity.itemKey);
        if (materialEntity.itemKey === "wood") {
          collidedWood = true;
        }
        if (
          !inventoryState.vendingContents.includes(materialEntity) &&
          !inventoryState.vendingKeys.includes(materialEntity.itemKey)
        ) {
          console.log(`Pushing ${materialEntity.itemKey} to vending machine`);
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

        console.log("material", materialEntity);
        destroy(materialEntity);
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

    let readyToCraft = false;
    function waitForCondition(conditionFunc) {
      return new Promise((resolve) => {
        const checkCondition = () => {
          if (conditionFunc()) {
            resolve();
          } else {
            setTimeout(checkCondition, 100); 
          }
        };
        checkCondition();
      });
    }
    function waitForCollision() {
      return waitForCondition(() => collidedWood);
    }
    function waitForHammer() {
      return waitForCondition(() => toolState.currentTool.toolKey === "hammer");
    }
    function waitForPaper() {
      return waitForCondition(() => craftState.result.itemKey === "paper");
    }
    function waitForCraftingTable() {
      return waitForCondition(() => tableState.atCraftingTable === true);
    }
    function waitForCard() { 
      return waitForCondition(() => craftState.result.itemKey === "card");
    }
    function waitForOrigami() {
      return waitForCondition(() => craftState.result.itemKey === "origami");
    }
    function waitForBook() {
      return waitForCondition(() => craftState.result.itemKey === "book");
    }
    onKeyPress("enter", () => {
      console.log(craftState.result.itemKey);
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
      message = "Great job! You've made paper! Close out of Hammer!";
      messageCreate(message);
      onKeyPress("escape", () => {
        destroyAll("alert");
        message = "Awesome! Now, let's head to the Crafting Table!";
        messageCreate(message);
      });
      let step2 = false;
      await waitForCraftingTable();
      destroyAll("alert");
      message = "Press 'Enter' again and lets craft something else!";
      messageCreate(message);
      step2 = true;
      if (step2) {
        onKeyPress("enter", () => {
          destroyAll("alert");
          message = "Nice! Try making a card!";
          messageCreate(message);
          readyToCraft = true;
        });
      }
      await waitForCard();
      destroyAll("alert");
      message = "Great job! You've made a card! Now do origami!";
      messageCreate(message);
      await waitForOrigami();
      destroyAll("alert");
      message = "You've made origami! Now let's make a book!";
      messageCreate(message);
      await waitForBook();
      destroyAll("alert");
      message = "Great job! You've made a book! You've completed the tutorial!";
      messageCreate(message);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // go("characterMovement");
    }
    


      function stopTutorial() {
      }
      tutorialStart();

  }}
  export const tutorial = new Tutorial();
