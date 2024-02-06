import { getSpeed, setSpeed } from "./Player.js";
import { closeBackpack, onKeyPressDown, openBackpack } from "./Vending.js";
import { getCurrentItemInBackpack } from "./Vending.js";

let firstItemPosition = {
  x: 605,
  y: 295,
  used: false,
};

let secondItemPosition = {
  x: 605 + 200,
  y: 295,
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
// !Inventory Management
export function dropItem(toolState, inventoryState, volumeSetting, tableState) {
  // !TODO: set max items on table
  if (inventoryState.tableItems.length == 0 && toolState.currentTool) {
    tableState.table_x = toolState.currentTool.pos.x;
    tableState.table_y = toolState.currToolY;
  }

  if (
    toolState.toolAccess &&
    tableState.onItemsOnTable >= 2 &&
    !inventoryState.isPopupVisible
  ) {
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
    if (
      toolState.toolAccess &&
      inventoryState.itemsInPocket !== 0 &&
      tableState.onItemsOnTable < 6 &&
      !inventoryState.isPopupVisible
    ) {
      inventoryState.itemsInPocket--;

      let item = inventoryState.inPocket.shift();

      item.use("onTable");

      item.moveTo(tableState.table_x, tableState.table_y);
      if (inventoryState.inPocket.length === 1) {
        inventoryState.inPocket[0].moveTo(880, 725);
      }
      inventoryState.tableItems[tableState.onItemsOnTable] = item.itemKey;

      tableState.table_y += 50;
      tableState.onItemsOnTable++;
      checkCraftable(toolState, inventoryState);
    } else {
      checkCraftable(toolState, inventoryState);
      rearrangePocket(inventoryState, volumeSetting);
    }
  }
}
export function rearrangePocket(inventoryState, volumeSetting) {
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
export function clearTable(inventoryState, tableState) {
  inventoryState.tableItems.length = 0;
  destroyAll("onTable");
  destroyAll("craft");
  tableState.table_x = 700;
  tableState.table_y = 550;
  tableState.onItemsOnTable = 0;
  inventoryState.tableItems = [];
}

// !CRAFTING
export function craftingBackend(toolState, ingredients, craftState, inventoryState, music) {
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
              handleCreation,
              craftState,
              inventoryState
            );
          })
          .catch((error) => console.error("Error fetching item 2:", error));
      } else {
        fetchCombination(toolId, item1data.id, 6, handleCreation, craftState, inventoryState);
      }
    })
    .catch((error) => console.error("Error fetching item 1:", error));

  // fetchCombination(toolId, item1data, item2data)
  // http://localhost:8081/items/find_by_name/paper
  // http://localhost:8081/tools/find_by_name/scissors
  // http://localhost:8081/combinations?tool=1&item1=1&item2=1
}

function fetchCombination(toolId, item1Id, item2Id, callback, craftState, inventoryState) {
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

function handleCreation(creation, final, item, craftState, inventoryState) {
  craftState.result.itemKey = creation;
  craftState.result.isFinal = final;
  updateCraftUI(craftState, inventoryState);

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
      color(144, 238, 144),
    ]);
    //  Add white boxes for selection

    const trailCircle1 = add([
      circle(64),
      pos(500 + 200 - 100 + 40, 500 - 200 + 35),
      z(20),
      color(228, 228, 228),
      "craft",
      "newCraft",
    ]);
    const trailCircle2 = add([
      circle(64),
      pos(500 + 200 - 100 + 200 + 40, 500 - 200 + 35),
      z(20),
      color(228, 228, 228),
      "craft",
      "newCraft",
    ]);
  }
  setSpeed(0);
  // Open backpack with current contents
  openBackpack(inventoryState, craftState);
  // Add label for the crafting tool
  let toolDisplay = toolState.currentTool.toolKey
    // space
    .replace(/([A-Z])/g, " $1")
    //trim
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  // Add tool text object
  add([
    text(toolDisplay, { size: 24 }),
    pos(100 + 500 + 50, 100 + 50),
    color(255, 255, 255),
    z(500),
    "craftingitem",
    "craft",
    "newCraft",
  ]);
  add([
    text("Press [ Escape ] To Close", { size: 24 }),
    pos(100 + 500 - 50, 100 + 50 + 500),
    color(255, 255, 255),
    z(500),
    "craft",
  ]);

  add([
    text("Press [ Q ] To Remove Items", { size: 16 }),
    pos(100 + 500 - 50 + 50, 100 + 50 + 500 - 100 + 50),
    color(255, 255, 255),
    z(500),
    "craft",
    "newCraft",
  ]);
  add([
    text("Press [ Enter ] To Add Items", { size: 16 }),
    pos(100 + 500 - 50 + 50, 100 + 50 + 500 - 100 + 50 - 50),
    color(255, 255, 255),
    z(500),
    "craft",
    "newCraft",
  ]);

  // Popup is Visible
  craftState.popUp = true;
  // Initialize both crafting spots as unfilled
  //  Both positions are not used when craft window is open
  firstItemPosition.used = false;
  secondItemPosition.used = false;
  // Currently not adding item
  craftState.isAddingItem = false;
}
export function selectItem(craftState, inventoryState, music) {
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
    let selectedItem = getCurrentItemInBackpack(inventoryState, craftState);
    //  If position 1 is unfilled, use that
    if (!firstItemPosition.used) {
      addItemToCraftWindow(selectedItem, inventoryState, craftState);
      if (music.volume) {
        play("bubble");
      }
    } else if (!secondItemPosition.used) {
      addItemToCraftWindow(selectedItem, inventoryState, craftState);
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

export function addItemToCraftWindow(currentItem, inventoryState, craftState) {
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
    pos(100 + 500 + 50 - 50, 100 + 50 + 100 - 25),
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
  craftState.current = "executed";

  craftingBackend(toolState, inventoryState.ingredients, craftState, inventoryState, music);
  destroyAll("newCraft");
}
export function updateCraftUI(craftState, inventoryState) {
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

  const resultText = add([
    text(`You made ${resultDisplay}!`, { size: 24 }),
    pos(100 + 500 + 50 - 50, 100 + 50 + 100 - 25),
    color(255, 255, 255),
    z(500),
    "craft",
    "executedCraft",
  ]);

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
  craftState.readyToCraft = true;
  craftState.resultReady = false;
  addReCraftButton(craftState);
}

export function addReCraftButton(craftState) {
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
    pos(100 - 50 + 500 - 50 + 50, 100 + 50 + 500 - 100 + 50),

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
  destroyAll("executedCraft");
  craftState.readyToCraft = false;
  craftState.resultReady = false;
  craftState.current = "crafting";
  closeBackpack();
  openCraftWindow(craftState, inventoryState, toolState);
  craftState.result = {};
  inventoryState.ingredients = [];
}
// !End craft sequence, current = "moving"
export function closeCraftWindow(craftState, inventoryState) {
  // Close the craft window after pressing escape
  console.log("Destroying all craft items.");
  destroyAll("craft");
  inventoryState.ingredients = [];

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
    inventoryState.ingredients.splice(2, 1);
  } else if (firstItemPosition.used) {
    destroyAll("item1");
    firstItemPosition.used = false;
    if (music.volume) {
      play("bubble");
    }

    inventoryState.ingredients.splice(1, 1);
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
    // console.log("passed", !craftState.result.isFinal);
    inventoryState.vendingContents.push(resultItem);

    inventoryState.vendingKeys.push(resultItem.itemKey);
  }
  if (craftState.result.isFinal && !inventoryState.areFinal.includes(craftState.result.itemKey)) {
    // console.log(`${craftState.result.itemKey} pushed to documentation station.`);
    inventoryState.areFinal.push(resultItem.itemKey);
  }
}
