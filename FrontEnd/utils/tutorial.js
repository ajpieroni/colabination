import InitialItems from "./InitialItems.js";
import Tools, {
  addNewTool,
} from "./Tools.js";
import map from "./map.js";
import { resetInactivityTimer, handleSavingData } from "./Save.js";
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
  openCraftWindow,
  closeCraftWindow,
  removeItemFromCraft,
  executeCraft,
  restartCraft,
} from "./Craft.js";
import { selectItem } from "./Craft.js";
import { handleCollideDocumentationStationEnd } from "./Collide.js";
import {
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

class Tutorial {

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
    // Initialize Tools
    Tools();
    // Map Sprites
    add([sprite("walk"), pos(0, 0), z(0), scale(0.5)]);
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
      isCorrectlyCrafted: false,
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
      // hasDiscovered: hashset
      hasDiscovered: new Set(),
      lastStored: new Set(),
    };

    initializeUser(inventoryState, toolState,craftState);

    onCollide("player", "tool", (s, w) => {
      onToolCollide(craftState, toolState, inventoryState, s, w);
    });

    onCollideEnd("player", "tool", () => {
      onToolCollideEnd(toolState, inventoryState);
    });

    // !TODO: remove, instead introduce pagination with arrows
    // onKeyPress("2", () => {
    //   inventoryState.page = inventoryState.page + 1;
    //   closeBackpack();
    //   openBackpack(inventoryState,craftState);
    // });
    // onKeyPress("1", () => {
    //   if(inventoryState.page > 0){
    //   inventoryState.page = inventoryState.page - 1;
    //   }
    //   closeBackpack();
    //   openBackpack(inventoryState,craftState);
    // });


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
      console.log(`Current ingredient: ${inventoryState.ingredients}`);
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
    onKeyPress("backspace", () => {
      
      console.log("Pressed")
      closeCraftWindow(craftState, inventoryState, toolState);

      console.log("should be checking for tool ");
      if(craftState.current === "documentation"){
        closeDocumentationStation(craftState, inventoryState);
      }
    });

    //! Player Movement
    // Player search
    // WASD

    onKeyDown("a", () => {
      // .move() is provided by pos() component, move by pixels per second
      player.move(-getSpeed(), 0);
      userActivity();
    });
    onKeyDown("d", () => {
      player.move(getSpeed(), 0);
      userActivity();
    });

    onKeyDown("w", () => {
      player.move(0, -getSpeed());
      userActivity();
    });

    onKeyDown("s", () => {
      player.move(0, getSpeed());
      userActivity();
    });
    // Arrow Keys
    onKeyDown("left", () => {
      // .move() is provided by pos() component, move by pixels per second
      player.move(-getSpeed(), 0);
      userActivity();
    });
    onKeyDown("right", () => {
      player.move(getSpeed(), 0);
      userActivity();
    });

    onKeyDown("up", () => {
      player.move(0, -getSpeed());
      userActivity();
    });

    onKeyDown("down", () => {
      player.move(0, getSpeed());
      userActivity();
  
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
        vendingLeft(inventoryState, craftState);
      }
      console.log(inventoryState.vendingSelect);
    });

    onKeyPress("right", () => {
      if (craftState.current == "documentation") {
        docuRight(inventoryState, craftState);
      } else if (craftState.current !== "executed") {
        vendingRight(inventoryState, craftState);
      }
    });

    onKeyPress("down", () => {
      // console.log("down");
      if (craftState.current == "documentation") {
        docuDown(inventoryState, craftState);
      } else if (craftState.current !== "executed") {
        vendingDown(inventoryState, craftState);
      }
    });

    onKeyPress("up", () => {
      if (craftState.current == "documentation") {
        docuUp(inventoryState, craftState);
      } else if (craftState.current !== "executed") {
        vendingUp(inventoryState, craftState);
      }
    });

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

    player.onCollide("helpStation", () => {
      console.log("Collided with help station");
      displayControlsOnPress();
      
    });
    player.onCollideEnd("helpStation", () => {
      console.log("Collidedend with help station");
      destroyAll("controls");
    });

    // Collide with Material
    let collidedWood = false;
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
    function clearCraftState() {
      craftState.result.itemKey = "";
    }
    let idleTime = 0;
    let movingPrompted = false;

    function resetIdleTime() {
      idleTime = 0;
      movingPrompted = false;
      if (lastSignificantMessage) {
        destroyAll("alert");
        messageCreate(lastSignificantMessage, false); // Re-display the significant message without updating it
      }
  }
    function userActivity() {
      resetIdleTime();
  }
    function checkIdle() {
      idleTime++;
      if (idleTime >= 15 && craftState.current === 'moving' && !movingPrompted) {
          movingPrompted = true;
          destroyAll("alert");
          messageCreate("Use Arrow Keys or WASD to move.", false); // False because it's not a significant message
      }
    }
    
    setInterval(checkIdle, 1000);
      function playerMovement() {
        resetIdleTime();
    }
    
    function userActivity() {
      playerMovement(); 
    }

    let readyToCraft = false;
    let isTutorialDone = false;
    
    function waitForCondition(conditionFunc, attemptFunc, failMessage, stepRequired) {
      return new Promise((resolve) => {
        const checkCondition = () => {
          if (conditionFunc()) {
            resolve();
          } else if (currentStep === stepRequired && attemptFunc && typeof attemptFunc === 'function' && attemptFunc()) {
            destroyAll("alert");
            messageCreate(failMessage, false);
          }
          setTimeout(checkCondition, 100);
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
      return waitForCondition(
        () => craftState.result.itemKey === "paper",
        () => craftState.result.itemKey && craftState.result.itemKey !== "paper",
          "Oops, that's not paper, try again!",
          3
        );
    }
    function waitForCraftingTable() {
      return waitForCondition(() => toolState.currentTool.toolKey === "craftingTable");
    }
    function waitForCard() { 
      return waitForCondition(
        () => craftState.result.itemKey === "card",
        () => craftState.result.itemKey && craftState.result.itemKey !== "card",
        "Oops, that's not a card, try again!",
        7  // stepRequired for card crafting check
      );
    }
    function waitForOrigami() {
      return waitForCondition(
        () => craftState.result.itemKey === "origami",
        () => craftState.result.itemKey && craftState.result.itemKey !== "origami",
        "Oops, that's not origami, try again!",
        8
      );
    }
    function waitForBook() {
      return waitForCondition(
        () => craftState.result.itemKey === "book",
        () => craftState.result.itemKey && craftState.result.itemKey !== "book",
        "Oops, that's not a book, try again!",
        9
      );
    }
    let lastSignificantMessage = "";  // To remember the last significant game-related message

    function messageCreate(message, isSignificant = true) {
        add([
            "alert",
            text(message, {
                size: 24,
                outline: 4,
            }),
            color(255,255,255),
            area(),
            anchor("center"),
            pos(525,100),
            z(500),
        ]);
        add([
            rect(500+200+200, 100),
            area(),
            anchor("center"),
            pos(530, 100),
            z(19),
            color(143,210,119),
            "alert"
        ]);

        if (isSignificant) {
            lastSignificantMessage = message;
        }
    }
      function playBubble() {
        if (volumeSetting) {
          play("bubble");
        }
      }
      let currentStep = 0; // Initialize a step counter
      let readyToComplete = false;
      let message = "";


    async function tutorialStart() {
      
      setSpeed(0);
    
      message = "Welcome to the tutorial! Let's get started.";
      playBubble();
      messageCreate(message);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      destroyAll("alert");
    
      // Step 1: Picking up items
      message = "Try picking up the items you see on the floor!";
      playBubble();
      messageCreate(message);
      setSpeed(300);
      await waitForCollision();
      destroyAll("alert");
      currentStep = 1; 
    
      // Step 2: Hammer station
      message = "Great! Now, let's head to the hammer station.";
      playBubble();
      messageCreate(message);
      await waitForHammer();
      destroyAll("alert");
      currentStep = 2; 
    
      // Step 3: Begin crafting
      message = "Nice job! Press 'Enter' to open the crafting window.";
      playBubble();
      messageCreate(message);
      onKeyPress("enter", () => {
        if (currentStep === 2) {
          destroyAll("alert");
          message = "Now, try selecting an item and try to make paper.";
          messageCreate(message);
          readyToCraft = true;
          currentStep = 3; 
        }
      });
      await waitForPaper();
      clearCraftState();
      destroyAll("alert");
      message = "Great job! You've made paper! Close out of Hammer!";
      playBubble();
      messageCreate(message);
      currentStep = 4;
     
    
      onKeyPress("backspace", () => {
        if (currentStep === 4) {
          destroyAll("alert");
          message = "Awesome! Now, let's head to the Crafting Table!";
          playBubble();
          messageCreate(message);
          currentStep = 5; 
        }
      });
      await waitForCraftingTable();
      destroyAll("alert");
      message = "Press 'Enter' and let's craft something else!";
      playBubble();
      messageCreate(message);
      currentStep = 6;
    
      onKeyPress("enter", () => {
        if (currentStep === 6) {
          destroyAll("alert");
          message = "Nice! Try making a card!";
          playBubble();
          messageCreate(message);
          readyToCraft = true;
          currentStep = 7; 
        }
      });
    
      await waitForCard();
      clearCraftState();
      destroyAll("alert");
      message = "Great job! You've made a card! Now do origami!";
      playBubble();
      messageCreate(message);
      currentStep = 8; 
    
      await waitForOrigami();
      clearCraftState();
      destroyAll("alert");
      message = "You've made origami! Now let's make a book!";
      playBubble();
      messageCreate(message);
      currentStep = 9; 
    
      await waitForBook();
      clearCraftState();    
      destroyAll("alert");
      message = "Great job! You've made a book! Close out of Crafting Table!";
      playBubble();
      messageCreate(message);
      currentStep = 10;
      
      onKeyPress("backspace", () => {
       if (currentStep === 10) {
          destroyAll("alert");
          message = "Congrats! You've completed the tutorial!";
          playBubble();
          messageCreate(message);
          currentStep = 11;
          readyToComplete = true;
        }
      });
      await waitForCondition(() => readyToComplete);
      destroyAll("alert");
      message = "Congrats! You've completed the tutorial!";
      playBubble();
      messageCreate(message);
      currentStep = 12; 

      await new Promise((resolve) => setTimeout(resolve, 3000));
      destroyAll("alert");

      isTutorialDone = true;
      currentStep = 13;

      message = "Press 'Enter' to continue to the main game!";
      playBubble();
      messageCreate(message);
      onKeyPress("enter", () => {
        if (isTutorialDone) {
          // this.music.paused = true;
          destroyAll("alert");
          go("characterMovement");

        }
      });
    }
    tutorialStart();
    
  }}
  export const tutorial = new Tutorial();