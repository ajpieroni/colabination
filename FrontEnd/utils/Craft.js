import { getSpeed, setSpeed } from "./Player.js";
import { closeBackpack, vendingDown, openBackpack } from "./Vending.js";
import { getCurrentItemInBackpack } from "./Vending.js";
import { handleSavingData } from "./Save.js";
import { checkForToolAddition } from "./Tools.js";
let firstItemPosition = {
  x: 605,
  y: 295 + 25,
  used: false,
};

let secondItemPosition = {
  x: 605 + 200,
  y: 295 + 25,
  used: false,
};
export function checkCraftable(toolState, inventoryState, volumeSetting) {
  inventoryState.finalCraftCheck = false;

  if (
    toolState.toolAccess &&
    // tableItems.includes("paper") &&
    inventoryState.tableItems.length >= 1 &&
    !inventoryState.isPopupVisible
  ) {
    inventoryState.isCraftable = true;
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
    inventoryState.finalCraftCheck = true;
  }
  if (!toolState.toolAccess || inventoryState.isPopupVisible) {
    destroyAll("craft");
  }
}

// !CRAFTING
export function craftingBackend(
  toolState,
  ingredients,
  craftState,
  inventoryState,
  music
) {
  let toolId;
  if (toolState.toolAccess) {
    toolId = toolState.currentTool.toolId;
  } else {
    toolId = 3;
  }

  // console.log("Crafting backend...");

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
              handleCreation,
              craftState,
              inventoryState,
              toolState
            );
          })
          .catch((error) => console.error("Error fetching item 2:", error));
      } else {
        fetchCombination(
          toolId,
          item1data.id,
          6,
          handleCreation,
          craftState,
          inventoryState,
          toolState
        );
      }
    })
    .catch((error) => console.error("Error fetching item 1:", error));

  // fetchCombination(toolId, item1data, item2data)
  // http://localhost:8081/items/find_by_name/paper
  // http://localhost:8081/tools/find_by_name/scissors
  // http://localhost:8081/combinations?tool=1&item1=1&item2=1
}

function fetchCombination(
  toolId,
  item1Id,
  item2Id,
  callback,
  craftState,
  inventoryState
) {
  // console.log(
  //   `Fetching combination for tool ${toolId}, item1 ${item1Id}, item2 ${item2Id}.`
  // );
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
      fetch(`http://localhost:8081/items/find_by_name_craft/${data.creation}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((additionalData) => {
          craftState.resultReady = true;
          // console.log(additionalData.data.description);

          callback(
            data.creation,
            additionalData.data.isFinal,
            data,
            craftState,
            inventoryState
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching combination:", error);
    });
}

function handleCreation(
  creation,
  final,
  item,
  craftState,
  inventoryState,
  toolState
) {
  craftState.result.itemKey = creation;
  craftState.result.isFinal = final;
  updateCraftUI(craftState, inventoryState, toolState);

  // addItemToBackpack(inventoryState, craftState);
}

// !NEW CRAFT, current = "crafting"
export function openCraftWindow(craftState, inventoryState, toolState) {
  inventoryState.vendingSelect = 0;
  // If they pressed enter on the craft prompt, open the craft window
  if (craftState.craftSelected) {
    add([
      rect(800 + 100, 750 - 150 + 50),
      pos(150 - 70, 125 - 15 - 15),
      z(18),
      "craft-container",
      "craft",
      color(119,143,210),
      outline(5, 255,255,255)
    ]);
    //  Add white boxes for selection

    const trailCircle1 = add([
      circle(64),
      pos(500 + 200 - 100 + 40, 500 - 200 + 35 + 25),
      z(20),
      color(228, 228, 228),
      "craft",
      "newCraft",
    ]);
    const trailCircle2 = add([
      circle(64),
      pos(500 + 200 - 100 + 200 + 40, 500 - 200 + 35 + 25),
      z(20),
      color(228, 228, 228),
      "craft",
      "newCraft",
    ]);
  }
  setSpeed(0);
  // Open backpack with current contents
  openBackpack(inventoryState, craftState, toolState);
  // Add label for the crafting tool
  let toolDisplay = toolState.currentTool.toolKey
    // space
    .replace(/([A-Z])/g, " $1")
    //trim
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  // Add tool text object
  // console.log("current tool id is ", toolState.currentTool.toolId);
  if (toolDisplay === "Printer1" || toolDisplay === "Printer2") {
    toolDisplay = "3D Printer";
  }
  if (toolDisplay === "Crafting Table"){
    add([
    text(toolDisplay, { size: 24 }),
    pos(100 + 500 + 35, 100 + 50),
    color(255, 255, 255),
    z(500),
    "craftingitem",
    "craft",
    "newCraft",
  ]);
}
  if (toolDisplay === "Hammer"){
    add([
    text(toolDisplay, { size: 24 }),
    pos(100 + 500 + 95, 100 + 50),
    color(255, 255, 255),
    z(500),
    "craftingitem",
    "craft",
    "newCraft",
  ]);
  }
  if (toolDisplay === "Scissors"){
    add([
    text(toolDisplay, { size: 24 }),
    pos(100 + 500 + 77.5, 100 + 50),
    color(255, 255, 255),
    z(500),
    "craftingitem",
    "craft",
    "newCraft",
  ]);
  }
  if (toolDisplay === "Soldering Station"){
    add([
    text(toolDisplay, { size: 24 }),
    pos(100 + 500 + 15, 100 + 50),
    color(255, 255, 255),
    z(500),
    "craftingitem",
    "craft",
    "newCraft",
  ]);
}
  if (toolDisplay === "Sewing Machine"){
    add([
    text(toolDisplay, { size: 24 }),
    pos(635, 100 + 50),
    color(255, 255, 255),
    z(500),
    "craftingitem",
    "craft",
    "newCraft",
  ]);
  }
  if (toolDisplay === "Cricut"){
    add([
    text(toolDisplay, { size: 24 }),
    pos(100 + 500 + 95, 100 + 50),
    color(255, 255, 255),
    z(500),
    "craftingitem",
    "craft",
    "newCraft",
  ]);
  }
  if (toolDisplay === "3D Printer"){
    add([
    text(toolDisplay, { size: 24 }),
    pos(665, 100 + 50),
    color(255, 255, 255),
    z(500),
    "craftingitem",
    "craft",
    "newCraft",
  ]);
  }

  // crafting control instructions
  const baseX = 100,
    baseY = 100,
    offsetX = 25,
    offsetY = 30,
    zLevel = 500;
  const colorWhite = color(255, 255, 255);

  // Base positions
  const posX = baseX + 500 - 25;
  const posY = baseY + 500;

  add([
    text("Press [ Backspace ] To Close", { size: 20 }),
    pos(posX, posY),
    colorWhite,
    z(zLevel),
    "craft",
  ]);
  add([
    text("Press [ Q ] To Remove Items", { size: 16 }),
    pos(posX + offsetX, posY + offsetY),
    colorWhite,
    z(zLevel),
    "craft",
    "newCraft",
  ]);
  add([
    text("Press [ Enter ] To Add Items", { size: 16 }),
    pos(posX + offsetX - 5, posY + 2 * offsetY),
    colorWhite,
    z(zLevel),
    "craft",
    "newCraft",
  ]);
  add([
    text("Press [ H ] To Toggle Hint Mode", { size: 16 }),
    pos(posX + offsetX - 15, posY + 3 * offsetY),
    colorWhite,
    z(zLevel),
    "craft",
    "newCraft",
  ]);

  // add([
  //   text("Press [ Backspace ] To Close", { size: 20 }),
  //   pos(100 + 500 - 50, 100 + 50 + 500+15),
  //   color(255, 255, 255),
  //   z(500),
  //   "craft",
  // ]);

  // add([
  //   text("Press [ Q ] To Remove Items", { size: 16 }),
  //   pos(100 + 500 - 50 + 50, 100 + 50 + 500 - 100 + 50+15+15),
  //   color(255, 255, 255),
  //   z(500),
  //   "craft",
  //   "newCraft",
  // ]);
  // add([
  //   text("Press [ Enter ] To Add Items", { size: 16 }),
  //   pos(100 + 500 - 50 + 50, 100 + 50 + 500 - 100 + 50 - 50+15+15+5),
  //   color(255, 255, 255),
  //   z(500),
  //   "craft",
  //   "newCraft",
  // ]);
  // add([
  //   text("Press [ H ] To Toggle Hint Mode ", { size: 16 }),
  //   pos(100 + 500 - 50 + 50-50+25+10, 100 + 50 + 500 - 100 + 50 - 50-50+15+15+5+5),
  //   color(255, 255, 255),
  //   z(500),
  //   "craft",
  //   "newCraft",
  // ]);

  // Popup is Visible
  craftState.popUp = true;
  // Initialize both crafting spots as unfilled
  //  Both positions are not used when craft window is open
  firstItemPosition.used = false;
  secondItemPosition.used = false;
  // Currently not adding item
  craftState.isAddingItem = false;
}
export function selectItem(craftState, inventoryState, music, toolState) {
  if (
    !firstItemPosition.used ||
    (!firstItemPosition.used && !secondItemPosition.used)
  ) {
    removeCraftButton();
  }
  // Craft item selection
  // Once craft is open, use enter to select the current item from the backpack and add it to the crafting window
  craftState.isAddingItem = true;
  // If the popup is open and it's not the first time it's opened

  if (craftState.popUp) {
    // console.log("current tool id is ", toolState.currentTool.toolId);
    let selectedItem = getCurrentItemInBackpack(
      inventoryState,
      craftState,
      toolState
    );
    //  If position 1 is unfilled, use that
    if (!firstItemPosition.used) {
      addItemToCraftWindow(selectedItem, inventoryState, craftState, toolState);
      if (music.volume) {
        play("bubble");
      }
    } else if (!secondItemPosition.used) {
      addItemToCraftWindow(selectedItem, inventoryState, craftState, toolState);
      if (music.volume) {
        play("bubble");
      }
    } else if (firstItemPosition.used && secondItemPosition.used) {
      // If both are filled, display an alert
      addCraftButton(craftState);
      // add([
      //   text("Both spaces are filled; TBD press space to craft!", { size: 16 }),
      //   pos(100 + 500 - 50, 100 + 50 + 500 - 150),
      //   color(255, 255, 255),
      //   z(500),
      //   "craft",
      // ]);
    }
  }
  // After the first open, set this to true to make a valid item next time they press enter
  // No longer currently adding an item
  craftState.isAddingItem = false;
}

export function addItemToCraftWindow(
  currentItem,
  inventoryState,
  craftState,
  toolState
) {
  // console.log(`Adding ${currentItem} to the crafting window.`);
  if (
    !firstItemPosition.used ||
    (!firstItemPosition.used && !secondItemPosition.used)
  ) {
    removeCraftButton();
  }
  // Add the item to the crafting window
  if (!firstItemPosition.used) {
    const craftItem1 = add([
      // rect(item.width, item.height) ,
      pos(firstItemPosition.x, firstItemPosition.y),
      z(12),
      // color(item.color.r, item.color.g, item.color.b),
      "craft",
      "item1",
      sprite(`${currentItem}`),
      // rect(10,10),
      // sprite(`${image}`),
      scale(1.5),
      z(22),
      "material",
      "newCraft",
      {
        itemKey: currentItem,
      },
    ]);
    firstItemPosition.used = true;
    inventoryState.ingredients.push(currentItem);
    addCraftButton(craftState);
  } else if (!secondItemPosition.used) {
    const craftItem2 = add([
      // rect(item.width, item.height) ,
      pos(secondItemPosition.x, secondItemPosition.y),
      z(12),
      // color(item.color.r, item.color.g, item.color.b),
      "craft",
      "item2",
      sprite(`${currentItem}`),
      // rect(10,10),
      // sprite(`${image}`),
      scale(1.5),
      z(22),
      "material",
      "newCraft",
      {
        itemKey: currentItem,
      },
    ]);
    inventoryState.ingredients.push(currentItem);

    secondItemPosition.used = true;
  }
}
export function addCraftButton(craftState) {
  craftState.readyToCraft = true;
  const craftButton = add([
    rect(150, 50),
    pos(
      50 + 100 + 500 - 50 + 50 + 50 - 25,
      100 + 50 + 500 - 100 + 50 - 100 - 50
    ),
    z(52),
    color(228, 228, 228),
    "crafting",
    "craft",
    "craftButton",
    "newCraft",
  ]);
  const craftButtonText = add([
    text("Make!"),
    pos(
      50 + 100 + 10 + 10 + 500 - 50 + 50 + 50 - 25 + 25,
      100 - 5 + 50 + 500 - 100 + 50 - 100 - 50 + 25 - 5
    ), // adjust as necessary to position the text on the button
    z(53),
    color(0, 0, 0), // color of the text,
    scale(0.5),
    "crafting",
    "craft",
    "craftButton",
    "newCraft",
  ]);

  add([
    text("Press [ Space ] To Craft!", { size: 20 }),
    pos(100 + 500 + 50 - 50, 100 + 50 + 100 - 25 + 25),
    color(255, 255, 255),
    z(500),
    "craft",
    "newCraft",
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

// !Execute craft, current = "executed"
export function executeCraft(
  toolState,
  craftState,
  inventoryState,
  tableState
) {
  destroyAll("hint");

  craftState.current = "executed";

  craftingBackend(
    toolState,
    inventoryState.ingredients,
    craftState,
    inventoryState,
    music
  );
  destroyAll("newCraft");
}
export function updateCraftUI(craftState, inventoryState, toolState) {
  destroyAll("hint");

  if (music.volume) {
    play("craftFX");
  }

  let resultDisplay = craftState.result.itemKey
    // space
    .replace(/([A-Z])/g, " $1")
    //trim
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  if (resultDisplay === "Mystery Object") {
    craftState.achievements.mystery = true;
  }

  if (craftState.result.itemKey.length < 6) {
    const resultText = add([
      text(`You made ${resultDisplay}!`, { size: 24 }),
      pos(100 + 500 + 50 - 50 + 25, 100 + 50 + 100 - 25),
      color(255, 255, 255),
      z(500),
      "craft",
      "executedCraft",
    ]);
  } else {
    const resultText = add([
      text(`You made ${resultDisplay}!`, { size: 24 }),
      pos(100 + 500 + 50 - 50, 100 + 50 + 100 - 25),
      color(255, 255, 255),
      z(500),
      "craft",
      "executedCraft",
    ]);
  }

  // If the result is final, add an additional display:
  if (craftState.result.isFinal) {
    finalItemDisplay(craftState, resultDisplay);
  }

  const resultItem = add([
    // rect(item.width, item.height) ,
    pos(
      (firstItemPosition.x + secondItemPosition.x) / 2,
      (firstItemPosition.y + secondItemPosition.y) / 2
    ),
    z(12),
    // color(item.color.r, item.color.g, item.color.b),
    "craft",
    "result",
    sprite(`${craftState.result.itemKey}`),
    // rect(10,10),
    // sprite(`${image}`),
    scale(1.5),
    z(22),
    "material",
    "executedCraft",
    {
      itemKey: craftState.result.itemKey,
    },
  ]);

  addItemToBackpack(inventoryState, craftState, resultItem);
  handleSavingData(
    inventoryState.vendingKeys,
    inventoryState.hasSavedItems,
    inventoryState.areFinal,
    inventoryState.currItems,
    inventoryState.currTools,
    inventoryState.currFinals,
    inventoryState.hasSavedFinal
  );
  craftState.readyToCraft = true;
  craftState.resultReady = false;
  // console.log("Crafting complete!");
  addReCraftButton(craftState);
}

export function addReCraftButton(craftState) {
  // console.log("Adding recraft button...");
  const reCraftButton = add([
    rect(150, 50),
    pos(
      50 + 100 + 500 - 50 + 50 + 50 - 25,
      100 + 50 + 500 - 100 + 50 - 100 - 50
    ),
    z(52),
    color(228, 228, 228),
    "crafting",
    "craft",
    "craftButton",
    "executedCraft",
  ]);
  const reCraftText = add([
    text("Craft Again?"),
    pos(
      50 - 5 - 30 + 100 + 10 + 10 + 500 - 50 + 50 + 50 - 25 + 25,
      100 - 5 + 50 + 500 - 100 + 50 - 100 - 50 + 25 - 5
    ), // adjust as necessary to position the text on the button
    z(53),
    color(0, 0, 0), // color of the text,
    scale(0.5),
    "crafting",
    "craft",
    "craftButton",
    "executedCraft",
  ]);

  add([
    text("Press [ Space ] To Craft Again!", { size: 20 }),
    pos(100 - 50 + 500 - 50 + 50 + 5, 100 + 50 + 500 - 100),

    color(255, 255, 255),
    z(500),
    "craft",
    "executedCraft",
  ]);

  // Craft Button Flash
  let isBright = true;
  setInterval(() => {
    if (isBright) {
      reCraftButton.color = rgb(228, 228, 228); // less bright color
    } else {
      reCraftButton.color = rgb(80, 80, 80); // original color
    }
    isBright = !isBright;
  }, 250); // the button color will toggle every 500ms
}
// !Restart sequence, current = "crafting"
export function restartCraft(craftState, inventoryState, toolState) {
  checkForToolAddition(inventoryState, toolState);

  destroyAll("executedCraft");
  craftState.readyToCraft = false;
  craftState.resultReady = false;
  craftState.current = "crafting";
  if (toolState.adding) {
    closeCraftWindow(craftState, inventoryState, toolState);
    closeBackpack();
    destroyAll("vending");
    destroyAll("craft");
    destroyAll("itemText");
    destroyAll("selected");
    toolState.adding = false;
  } else {
    closeBackpack();
    openCraftWindow(craftState, inventoryState, toolState);
    craftState.result = {};
    inventoryState.ingredients = [];
  }
}
// !End craft sequence, current = "moving"
export function closeCraftWindow(craftState, inventoryState, toolState) {
  // Close the craft window after pressing backspace
  // console.log("Destroying all craft items.");
  destroyAll("craft");

  destroyAll("hint");
  // Reset hint
  craftState.hint = false;
  craftState.hintId = "";
  // craftState.combinable = {};

  setSpeed(300);
  closeBackpack();
  craftState.popUp = false;
  firstItemPosition.used = false;
  secondItemPosition.used = false;
  inventoryState.vendingSelect = 0;
  craftState.isAddingItem = false;
  craftState.current = "moving"; // Change state back to characterMovement
}
export function removeItemFromCraft(inventoryState, music) {
  if (
    !firstItemPosition.used ||
    (firstItemPosition.used && !secondItemPosition.used) ||
    (!firstItemPosition.used && !secondItemPosition.used)
  ) {
    removeCraftButton();
  }
  // Remove the item from the crafting window
  if (secondItemPosition.used) {
    destroyAll("item2");
    if (music.volume) {
      play("bubble");
    }
    secondItemPosition.used = false;
    // console.log(inventoryState.ingredients);
    inventoryState.ingredients.splice(1, 1);
    // console.log(inventoryState.ingredients);
  } else if (firstItemPosition.used) {
    destroyAll("item1");
    firstItemPosition.used = false;
    if (music.volume) {
      play("bubble");
    }
    // console.log(inventoryState.ingredients);

    inventoryState.ingredients = [];
    // console.log(inventoryState.ingredients);
  }
}

export function removeCraftButton() {
  destroyAll("craftButton");
}

export function addItemToBackpack(inventoryState, craftState, resultItem) {
  if (
    !inventoryState.vendingContents.includes(craftState.result.itemKey) &&
    !inventoryState.vendingKeys.includes(craftState.result.itemKey) &&
    !craftState.result.isFinal
  ) {
    // // console.log("passed", !craftState.result.isFinal);
    inventoryState.vendingContents.push(resultItem);

    inventoryState.vendingKeys.push(resultItem.itemKey);
  }
  if (
    craftState.result.isFinal &&
    !inventoryState.areFinal.includes(craftState.result.itemKey)
  ) {
    // // console.log(`${craftState.result.itemKey} pushed to documentation station.`);
    inventoryState.areFinal.push(resultItem.itemKey);
  }
}

export function finalItemDisplay(craftState, resultDisplay) {
  add([
    text(`${resultDisplay} is a final item!`, { size: 16 }),
    pos(100 + 500 + 50 - 50 + 25, 100 + 50 + 100 - 25 + 50),
    color(255, 255, 255),
    z(500),
    "craft",
    "executedCraft",
  ]);

  add([
    text("You can find it in the documentation station.", { size: 14 }),
    pos(100 + 500 - 50 + 50 - 50 + 25, 100 + 50 + 100 - 25 + 50 + 25 + 100),
    color(255, 255, 255),
    z(500),
    "craft",
    "executedCraft",
  ]);

  add([
    text("It cannot be combined with another item.", { size: 14 }),
    pos(100 + 500 + 50 - 50 - 50 + 25, 100 + 50 + 100 - 25 + 50 + 25 + 115),
    color(255, 255, 255),
    z(500),
    "craft",
    "executedCraft",
  ]);

  // return craftState.result.isFinal;
}
