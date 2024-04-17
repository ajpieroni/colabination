// Opens backpack window
/**
 * Opens the backpack and displays the contents on the vending machine.
 *
 * @param {object} inventoryState - The state of the inventory.
 * @param {object} craftState - The state of the crafting system.
 */
export function openBackpack(inventoryState, craftState, toolState) {
  //("hint state:", craftState.hint);
  // contents is an array, index into the array to get the current vendingPage, where the vendingPage is 9 items long
  inventoryState.vendingContents.sort((a, b) =>
    a.itemKey.localeCompare(b.itemKey)
  );

  let backpackItems = getBackpackItems(inventoryState, craftState, toolState);

  // Pagination logic
  let totalcontents = chunkArray(backpackItems, 9);
  let currentPage = inventoryState.vendingPage;
  let contents = totalcontents[currentPage];
  if(craftState.hint){
    // if the current page that I'm on has contents that are undefined, start on the first apge
    if(contents === undefined){
      currentPage = 0;
      inventoryState.vendingPage = 0;
      contents = totalcontents[currentPage];
    }
  }
  console.log(totalcontents)
  console.log(currentPage)
  console.log("contents", contents);
  // inventoryState.vendingSelect = 0;
  let gridX = inventoryState.vendingSelect % 3;
  let gridY = Math.floor(inventoryState.vendingSelect / 3);
  let total_items = backpackItems.length;

  // Arrows
  if (totalcontents.length > 1) {
    // 55 total items

    const pageText = add([
      text(`Page ${currentPage + 1}`, {
        size: 24,
        outline: 4,
        color: (0, 0, 0),
      }),
      pos(
        450 - 100 - 25 + 10 + 5 - 10 - 10 - 10 - 25 - 10,
        400 + 400 - 300 + 100 + 50 + 25 + 10 + 15
      ),
      z(100),
      "vending",
    ]);
  }
  const itemTotal = add([
    text(`Items: ${total_items}/62`, { size: 16 }),
    pos(
      450 - 100 - 25 + 10 + 5 - 10 - 10 - 10 - 25 - 10 - 50 + 20 + 10,
      400 + 400 - 300 + 100 + 50 + 25 + 10 + 15 - 500 - 100 + 20 + 5
    ),
    z(100),
    "vending",
  ]);
  if (craftState.hint) {
    console.log("hint mode is on");
    add([
      text("Hint Mode", { size: 16 }),
      pos(
        100 + 500 - 50 + 50 - 50 + 100 + 25 + 25,
        100 + 50 + 500 - 100 + 50 - 50 - 50 - 300
      ),
      color(255, 255, 255),
      z(500),
      "craft",
      "newCraft",
      "hint",
    ]);
    add([
      rect(250 / 2, 50),
      area(),
      anchor("center"),
      pos(
        100 + 500 - 50 + 50 - 50 + 100 + 25 + 25 + 50 - 15 + 5 + 5,
        100 + 50 + 500 - 100 + 50 - 50 - 50 - 300 + 5
      ),
      z(49),
      color(242, 140, 40),
      "hint",
    ]);
  }
  if (backpackItems.length > 9 && currentPage < totalcontents.length - 1) {
    const downArrow = add([
      sprite("rightArrow"),
      pos(450 - 100 - 25 + 10 + 5, 400 + 400 - 300 + 100 + 50),
      z(100),
      outline(4),
      rotate(90),
      "vending",
    ]);
  }
  if (currentPage > 0) {
    const upArrow = add([
      sprite("rightArrow"),
      pos(
        450 - 100 - 25 + 10 + 5 - 50,
        400 + 400 - 300 + 100 + 50 - 100 - 50 - 50 - 50 - 50 - 100
      ),
      z(100),
      outline(4),
      rotate(-90),
      "vending",
    ]);
  }
  // Add backpack sprite
  const popup = add([
    sprite("backpack"),
    pos(475 - 190 - 100 - 100, 125 + 25),
    z(19),
    outline(4),
    // scale(0.75),
    "vending",
  ]);
  // Initialize x and y for the first item
  const startX = popup.pos.x + 108;
  const startY = popup.pos.y + 155;
  // Initialize current x and y
  let currentX = startX;
  let currentY = startY;
  let currRow = 0;

  // Add the items to the backpack
  if (contents && contents.length > 0) {
    let itemText = contents[inventoryState.vendingSelect].itemKey;
    itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
    let resultDisplay = itemText
      // space
      .replace(/([A-Z])/g, " $1")
      //trim
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // Add the item text
    const selectedText = add([
      "itemText",
      text(resultDisplay, {
        size: 24,
        outline: 4,
        color: (0, 0, 0),
      }),
      area(),
      anchor("center"),
      pos(310, 625),
      z(20),
    ]);

    // Add the white box
    const selected = add([
      rect(75, 75),
      pos(393 - 200 + gridX * 86, 305 + gridY * 100),
      z(19),
      opacity(0.75),
      color(WHITE),
      outline(4, BLACK),
      "selected",
    ]);
    // Add the items into the backpack
    for (let i = 0; i < contents.length; i++) {
      const item = contents[i];
      const itemKey = item.itemKey;
      // starts a new line

      if (currRow === 3) {
        currentY += item.height + 50;
        currentX = startX;
        currRow = 0;
      }
      // Add the item to the backpack
      const vendingItem = add([
        pos(currentX, currentY),
        z(11),
        "vending",
        sprite(`${item.itemKey}`),
        scale(1.5),
        z(20),
        "material",
        {
          itemKey: itemKey,
        },
      ]);
      currRow++;
      currentX += item.width + 35;
    }
  }
}

// Get current vendingPage of backpack
export function chunkArray(array, chunkSize) {
  if (!Array.isArray(array)) {
    console.error("Invalid array:", array);
    return [];
  }
  //(array.length, chunkSize);
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

// Closes backpack window, and text
export function closeBackpack() {
  destroyAll("vending");
  destroyAll("itemText");
  destroyAll("selected");
}
// Left selection in backpack
export function vendingLeft(inventoryState, craftState, toolState) {
  // //(toolState.currentTool)
  //("PRESSED LEFT");
  let backpackItems = getBackpackItems(inventoryState, craftState, toolState);
  let totalcontents = chunkArray(backpackItems, 9);
  let currentPage = inventoryState.vendingPage;
  let contents = totalcontents[currentPage];

  if (craftState.popUp) {
    // If the current selection is the first item in the backpack, go to the previous vendingPage
    if (inventoryState.vendingSelect === 0 && inventoryState.vendingPage > 0) {
      inventoryState.vendingPage--;
      inventoryState.vendingSelect = 8;
      destroyAll("itemText");
      destroyAll("selected");
      closeBackpack();
      openBackpack(inventoryState, craftState, toolState);
    }
    // If the current selection is not the first item in the backpack, decrement the selection
    else if (inventoryState.vendingSelect > 0) {
      inventoryState.vendingSelect--;
      // Pagination logic
      const itemsPerPage = 9;
      const startIndex = inventoryState.vendingPage * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;
      let itemText = backpackItems[actualIndex]?.itemKey;
      // Remove the selected box and add a new one
      destroyAll("selected");
      let gridX = inventoryState.vendingSelect % 3;
      let gridY = Math.floor(inventoryState.vendingSelect / 3);
      const selected = add([
        rect(75, 75),
        pos(393 - 200 + gridX * 86, 305 + gridY * 100),
        z(19),
        opacity(0.75),
        color(WHITE),
        outline(4, BLACK),
        "selected",
      ]);
      destroyAll("itemText");
      // Add the item text
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        // regex for splitting camelCase
        let resultDisplay = itemText
          .replace(/([A-Z])/g, " $1")
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        // Add the item text
        const selectedText = add([
          "itemText",
          text(resultDisplay, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(310, 625),
          z(20),
        ]);
      }
    }
  }
}
// Right selection in backpack
export function vendingRight(inventoryState, craftState, toolState) {
  // Pagination logic
  let backpackItems = getBackpackItems(inventoryState, craftState, toolState);
  let totalcontents = chunkArray(backpackItems, 9);
  let currentPage = inventoryState.vendingPage;
  let contents = totalcontents[currentPage];

  if (craftState.popUp) {
    // If the current selection is the last item in the backpack, go to the next vendingPage
    if (
      inventoryState.vendingSelect === 8 &&
      inventoryState.vendingPage < totalcontents.length - 1
    ) {
      inventoryState.vendingPage++;
      inventoryState.vendingSelect = 0;
      destroyAll("itemText");
      destroyAll("selected");
      closeBackpack();
      openBackpack(inventoryState, craftState, toolState);
      // If the current selection is not the last item in the backpack, increment the selection
    } else if (inventoryState.vendingSelect < contents.length - 1) {
      inventoryState.vendingSelect++;

      // Pagination logic, get the actual index in the vendingContents array of the current selection
      const itemsPerPage = 9;
      const startIndex = inventoryState.vendingPage * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;
      let itemText = backpackItems[actualIndex]?.itemKey;

      // Destroy the selected box and add a new one
      destroyAll("selected");
      let gridX = inventoryState.vendingSelect % 3;
      let gridY = Math.floor(inventoryState.vendingSelect / 3);
      const selected = add([
        rect(75, 75),
        pos(393 - 200 + gridX * 86, 305 + gridY * 100),
        z(19),
        opacity(0.75),
        color(WHITE),
        outline(4, BLACK),
        "selected",
      ]);
      // Destroy the item text and add a new one
      destroyAll("itemText");

      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        let resultDisplay = itemText
          // space
          .replace(/([A-Z])/g, " $1")
          //trim
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        const selectedText = add([
          "itemText",
          text(resultDisplay, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(310, 625),
          z(20),
        ]);
      }
    }
  }
}
// Down selection in backpack
export function vendingDown(inventoryState, craftState, toolState) {
  //("pressed down");
  let backpackItems = getBackpackItems(inventoryState, craftState, toolState);

  let totalcontents = chunkArray(backpackItems, 9);
  let currentPage = inventoryState.vendingPage;
  let contents = totalcontents[currentPage];
  // If the popUp is open
  if (craftState.popUp) {
    // If the current selection is the last row in the backpack
    let bottomIndex =
      inventoryState.vendingSelect === 6 ||
      inventoryState.vendingSelect === 7 ||
      inventoryState.vendingSelect === 8;

    // If the current selection is the last row in the backpack, go to the next vendingPage
    // only if there is an item at the index below on the next vendingPage

    if (bottomIndex && inventoryState.vendingPage < totalcontents.length - 1) {
      inventoryState.vendingPage++;
      // Calculate index for next page
      let nextPageIndex = inventoryState.vendingSelect + 3;
      // Get contents of next page
      let nextPageContents = totalcontents[inventoryState.vendingPage];
      // Check if the item at the corresponding index exists on the next page
      if (nextPageContents[nextPageIndex % 9] !== undefined) {
        // If item exists, set selection to the corresponding index
        inventoryState.vendingSelect = nextPageIndex % 9;
        //("hit if");
      } else {
        // Find first available index on the next page if no item at corresponding index
        let nextAvailableIndex = nextPageContents.findIndex(
          (item) => item !== undefined
        );
        if (nextAvailableIndex !== -1) {
          inventoryState.vendingSelect = nextAvailableIndex;
        } else {
          // If no available index on the next page, set selection to 0
          inventoryState.vendingSelect = 0;
        }
        //("hit else");
      }

      destroyAll("itemText");
      destroyAll("selected");
      closeBackpack();
      openBackpack(inventoryState, craftState, toolState);
    }
    // If the current selection is not the last row in the backpack, increment the selection by 3
    else if (inventoryState.vendingSelect + 3 < contents.length) {
      inventoryState.vendingSelect += 3;
      //("hit else if");
      // Destroy the selected box and add a new one
      destroyAll("itemText");
      destroyAll("selected");

      // Pagination logic to get the actual index in the vendingContents array of the current selection
      const itemsPerPage = 9;
      const startIndex = inventoryState.vendingPage * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;

      // Add item text
      let itemText = backpackItems[actualIndex]?.itemKey;
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        let resultDisplay = itemText
          // space
          .replace(/([A-Z])/g, " $1")
          //trim
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        const selectedText = add([
          "itemText",
          text(resultDisplay, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(310, 625),
          z(20),
        ]);
      }
      // Add the selected box
      let gridX = inventoryState.vendingSelect % 3;
      let gridY = Math.floor(inventoryState.vendingSelect / 3);
      const selected = add([
        rect(75, 75),
        pos(393 - 200 + gridX * 86, 305 + gridY * 100),
        z(19),
        opacity(0.75),
        color(WHITE),
        outline(4, BLACK),
        "selected",
      ]);
    }
  }
}

// Up selection in backpack
export function vendingUp(inventoryState, craftState, toolState) {
  let backpackItems = getBackpackItems(inventoryState, craftState, toolState);

  let totalcontents = chunkArray(backpackItems, 9);
  let currentPage = inventoryState.vendingPage;
  let contents = totalcontents[currentPage];
  if (craftState.popUp) {
    if (
      inventoryState.vendingSelect === 0 ||
      inventoryState.vendingSelect === 1 ||
      inventoryState.vendingSelect === 2
    ) {
      if (inventoryState.vendingPage > 0) {
        inventoryState.vendingPage--;
        inventoryState.vendingSelect = (inventoryState.vendingSelect + 6) % 9;

        destroyAll("itemText");
        destroyAll("selected");
        closeBackpack();
        openBackpack(inventoryState, craftState, toolState);
      }
    } else if (inventoryState.vendingSelect - 3 >= 0) {
      inventoryState.vendingSelect -= 3;

      destroyAll("selected");
      let gridX = inventoryState.vendingSelect % 3;
      let gridY = Math.floor(inventoryState.vendingSelect / 3);
      const selected = add([
        rect(75, 75),
        pos(393 - 200 + gridX * 86, 305 + gridY * 100),
        z(19),
        opacity(0.75),
        color(WHITE),
        outline(4, BLACK),
        "selected",
      ]);
      destroyAll("itemText");
      const itemsPerPage = 9;
      const startIndex = inventoryState.vendingPage * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;

      let itemText = backpackItems[actualIndex]?.itemKey;
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        let resultDisplay = itemText
          // space
          .replace(/([A-Z])/g, " $1")
          //trim
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
        const selectedText = add([
          "itemText",
          text(resultDisplay, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(310, 625),
          z(20),
        ]);
      }
    }
  }
}

export function getCurrentItemInBackpack(
  inventoryState,
  craftState,
  toolState
) {
  //("current tool id is ", toolState.currentTool.toolId);
  let backpackItems = getBackpackItems(inventoryState, craftState, toolState);
  const itemsPerPage = 9;
  let startIndex;
  if (inventoryState.vendingPage === 0) {
    startIndex = 0;
  } else {
    startIndex = inventoryState.vendingPage * itemsPerPage;
  }
  // if vendingPage = 1, start index = 9
  // Get the actual index in the vendingContents array
  const actualIndex = startIndex + inventoryState.vendingSelect;

  let currentItem;
  if (inventoryState.vendingPage == 0) {
    currentItem = backpackItems[inventoryState.vendingSelect].itemKey;
  } else {
    currentItem = backpackItems[actualIndex].itemKey;
  }
  // Access the item using the actual index and get its itemKey
  return currentItem;
}

export function addItemToBackpack(inventoryState, resultItem) {
  if (
    !inventoryState.vendingContents.includes(materialEntity) &&
    !inventoryState.vendingKeys.includes(materialEntity.itemKey)
  ) {
    inventoryState.vendingContents.push(materialEntity);
    inventoryState.vendingKeys.push(materialEntity.itemKey);
  }
}

export function getBackpackItems(inventoryState, craftState, toolState) {
  let backpackItems = inventoryState.vendingContents;
  if (craftState.hint) {
    if (!toolState.currentTool) {
      console.error(
        "Current tool is undefined, not at a station. Hint system unavailable."
      );
      return [];
    }
    const toolId = toolState.currentTool.toolId;
    let combinableItemKeys = craftState.combinable[toolId].map(
      (item) => item.itemKey
    );
    let filteredContents = backpackItems.filter((item) =>
      combinableItemKeys.includes(item.itemKey)
    );

    return filteredContents;
  } else {
    let backpackItems = inventoryState.vendingContents;
    return backpackItems;
  }
}
