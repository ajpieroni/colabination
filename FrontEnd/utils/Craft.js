import { getSpeed, setSpeed } from "./Player.js";
import { closeBackpack, openBackpack } from "./Vending.js";
import { getCurrentItemInBackpack } from "./Vending.js";

export function checkCraftable(toolState, inventoryState, volumeSetting) {
  inventoryState.finalCraftCheck = false;
  console.log(
    "CHECK",
    toolState.toolAccess &&
      // tableItems.includes("paper") &&
      inventoryState.tableItems.length >= 1 &&
      !inventoryState.isPopupVisible
  );
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
  console.log(tableState);
  console.log("items in pocket on q", inventoryState.itemsInPocket);
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
    console.log(
      "check",
      toolState.toolAccess &&
        inventoryState.itemsInPocket !== 0 &&
        tableState.onItemsOnTable < 6
    );
    if (
      toolState.toolAccess &&
      inventoryState.itemsInPocket !== 0 &&
      tableState.onItemsOnTable < 6 &&
      !inventoryState.isPopupVisible
    ) {
      inventoryState.itemsInPocket--;

      let item = inventoryState.inPocket.shift();

      // console.log("here's item shifted:", item.itemKey);
      // console.log("here item key", item.itemKey);
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
      console.log("hit else");
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
  console.log("hre is inv state inside craft", inventoryState);
  inventoryState.tableItems.length = 0;
  destroyAll("onTable");
  destroyAll("craft");
  tableState.table_x = 700;
  tableState.table_y = 550;
  tableState.onItemsOnTable = 0;
  inventoryState.tableItems = [];
}

// !CRAFTING
export function craftingBackend(toolState, ingredients, craftState) {
  console.log("Ingredients in Craft.js", ingredients);
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
              craftState
            );
          })
          .catch((error) => console.error("Error fetching item 2:", error));
      } else {
        fetchCombination(toolId, item1data.id, 6, handleCreation, craftState);
        console.log("Fetching combination...");
      }
    })
    .catch((error) => console.error("Error fetching item 1:", error));

  // fetchCombination(toolId, item1data, item2data)
  // http://localhost:8081/items/find_by_name/paper
  // http://localhost:8081/tools/find_by_name/scissors
  // http://localhost:8081/combinations?tool=1&item1=1&item2=1
}

function fetchCombination(toolId, item1Id, item2Id, callback, craftState) {
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
          console.log("final state", craftState);
          craftState.resultReady = true;

          callback(
            data.creation,
            additionalData.data.isFinal,
            data,
            craftState
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

function handleCreation(creation, final, item, craftState) {
  craftState.result.itemKey = creation;
  craftState.result.isFinal = final;

  console.log("Set result...");
}

// !NEW CRAFT
export function openCraftWindow(craftState, inventoryState, toolState) {
  console.log("craftstate", craftState);
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
    ]);
    const trailCircle2 = add([
      circle(64),
      pos(500 + 200 - 100 + 200 + 40, 500 - 200 + 35),
      z(20),
      color(228, 228, 228),
      "craft",
    ]);
  }
  setSpeed(0);
  // Open backpack with current contents
  openBackpack(inventoryState.vendingContents, craftState);
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
    pos(100 + 500, 100 + 50),
    color(255, 255, 255),
    z(500),
    "craftingitem",
    "craft",
  ]);
  add([
    text("Press [ Space ] To Close", { size: 24 }),
    pos(100 + 500 - 50, 100 + 50 + 500),
    color(255, 255, 255),
    z(500),
    "craft",
  ]);
  // Popup is Visible

  craftState.popUp = true;
  onKeyPress("enter", () => {
    selectItem(craftState, inventoryState);
  });
}
export function selectItem(craftState, inventoryState) {
  // Craft item selection
  // Once craft is open, use enter to select the current item from the backpack and add it to the crafting window
  if (craftState.popUp && !craftState.firstOpen) {
    let selectedItem = getCurrentItemInBackpack(inventoryState, craftState);
    console.log(`Item selected for craft: ${selectedItem}`);
    addItemToCraftWindow(selectedItem);
  }
  // After the first open, set this to true to make a valid item next time they press enter
  craftState.firstOpen = false;
}

export function addItemToCraftWindow(currentItem) {
  const craftItem = add([
    // rect(item.width, item.height) ,
    pos(500 + 200 - 100+15 -50 + 40, 500 - 200 + 10+35-50),
    z(12),
    // color(item.color.r, item.color.g, item.color.b),
    "craft",
    sprite(`${currentItem}`),
    // rect(10,10),
    // sprite(`${image}`),
    scale(1.5),
    z(22),
    "material",
    {
      itemKey: currentItem,
    },
  ]);
}
export function closeCraftWindow(craftState) {
  // Close the craft window after pressing escape
  // console.log("Pressed closed")
  destroyAll("craft");

  setSpeed(300);
  closeBackpack();
  craftState.popUp = false;
}
