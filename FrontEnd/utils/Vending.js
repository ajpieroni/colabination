// Opens backpack window
/**
 * Opens the backpack and displays the contents on the vending machine.
 * 
 * @param {object} inventoryState - The state of the inventory.
 * @param {object} craftState - The state of the crafting system.
 */
export function openBackpack(inventoryState, craftState) {
  // contents is an array, index into the array to get the current page, where the page is 9 items long
  inventoryState.vendingContents.sort((a, b) =>
    a.itemKey.localeCompare(b.itemKey)
  );
  // Pagination logic
  let totalcontents = chunkArray(inventoryState.vendingContents, 9);
  let currentPage = inventoryState.page;
  let contents = totalcontents[currentPage];
  // inventoryState.vendingSelect = 0;
  let gridX = inventoryState.vendingSelect % 3;
  let gridY = Math.floor(inventoryState.vendingSelect / 3);

  // Arrows
  if (totalcontents.length > 1) {
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
  if (
    inventoryState.vendingContents.length > 9 &&
    currentPage < totalcontents.length - 1
  ) {
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
      rect(70, 70),
      pos(393 - 200 + gridX * 86, 305 + gridY * 100),
      z(19),
      color(255, 255, 255),
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

// Get current page of backpack
export function chunkArray(array, chunkSize) {
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
export function onKeyPressLeft(inventoryState, craftState) {
  let totalcontents = chunkArray(inventoryState.vendingContents, 9);
  let currentPage = inventoryState.page;
  let contents = totalcontents[currentPage];

  if (craftState.popUp) {
    // If the current selection is the first item in the backpack, go to the previous page
    if (inventoryState.vendingSelect === 0 && inventoryState.page > 0) {
      inventoryState.page--;
      inventoryState.vendingSelect = 8;
      destroyAll("itemText");
      destroyAll("selected");
      closeBackpack();
      openBackpack(inventoryState, craftState);
    }
    // If the current selection is not the first item in the backpack, decrement the selection
    else if (inventoryState.vendingSelect > 0) {
      inventoryState.vendingSelect--;
      // Pagination logic
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;
      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;
      // Remove the selected box and add a new one
      destroyAll("selected");
      let gridX = inventoryState.vendingSelect % 3;
      let gridY = Math.floor(inventoryState.vendingSelect / 3);
      const selected = add([
        rect(70, 70),
        pos(393 - 200 + gridX * 86, 305 + gridY * 100),
        z(19),
        color(255, 255, 255),
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
export function onKeyPressRight(inventoryState, craftState) {
  // Pagination logic
  let totalcontents = chunkArray(inventoryState.vendingContents, 9);
  let currentPage = inventoryState.page;
  let contents = totalcontents[currentPage];

  if (craftState.popUp) {
    // If the current selection is the last item in the backpack, go to the next page
    if (
      inventoryState.vendingSelect === 8 &&
      inventoryState.page < totalcontents.length - 1
    ) {
      inventoryState.page++;
      inventoryState.vendingSelect = 0;
      destroyAll("itemText");
      destroyAll("selected");
      closeBackpack();
      openBackpack(inventoryState, craftState);
      // If the current selection is not the last item in the backpack, increment the selection
    } else if (inventoryState.vendingSelect < contents.length - 1) {
      inventoryState.vendingSelect++;

      // Pagination logic, get the actual index in the vendingContents array of the current selection
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;
      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;

      // Destroy the selected box and add a new one
      destroyAll("selected");
      let gridX = inventoryState.vendingSelect % 3;
      let gridY = Math.floor(inventoryState.vendingSelect / 3);
      const selected = add([
        rect(70, 70),
        pos(393 - 200 + gridX * 86, 305 + gridY * 100),
        z(19),
        color(255, 255, 255),
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
export function onKeyPressDown(inventoryState, craftState) {
  let totalcontents = chunkArray(inventoryState.vendingContents, 9);
  let currentPage = inventoryState.page;
  let contents = totalcontents[currentPage];
  // If the popUp is open
  if (craftState.popUp) {
    // If the current selection is the last row in the backpack
    let bottomIndex =
      inventoryState.vendingSelect === 6 ||
      inventoryState.vendingSelect === 7 ||
      inventoryState.vendingSelect === 8;

    // If the current selection is the last row in the backpack, go to the next page
    // only if there is an item at the index below on the next page
    
    if (bottomIndex && inventoryState.page < totalcontents.length - 1 ) {
      inventoryState.page++;

      // If there is an item at the index below on the next page, go to the next page
      if(inventoryState.vendingContents[inventoryState.vendingSelect + 3] !== undefined){
        inventoryState.vendingSelect = (inventoryState.vendingSelect + 3) % 9;

      }else{
        // If there is no item at the index below on the next page, go to the first item on the next page
        inventoryState.vendingSelect = 0;
      }
      

      destroyAll("itemText");
      destroyAll("selected");
      closeBackpack();
      openBackpack(inventoryState, craftState);
    }
    // If the current selection is not the last row in the backpack, increment the selection by 3
    else if (inventoryState.vendingSelect + 3 < contents.length) {
      inventoryState.vendingSelect += 3;
      // Destroy the selected box and add a new one
      destroyAll("itemText");
      destroyAll("selected");

      // Pagination logic to get the actual index in the vendingContents array of the current selection
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;

      // Add item text
      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;
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
        rect(70, 70),
        pos(393 - 200 + gridX * 86, 305 + gridY * 100),
        z(19),
        color(255, 255, 255),
        "selected",
      ]);
    }
  }
}

// Up selection in backpack
export function onKeyPressUp(inventoryState, craftState) {
  let totalcontents = chunkArray(inventoryState.vendingContents, 9);
  let currentPage = inventoryState.page;
  let contents = totalcontents[currentPage];
  if (craftState.popUp) {
    if (
      inventoryState.vendingSelect === 0 ||
      inventoryState.vendingSelect === 1 ||
      inventoryState.vendingSelect === 2
    ) {
      if (inventoryState.page > 0) {
        inventoryState.page--;
        inventoryState.vendingSelect = (inventoryState.vendingSelect + 6) % 9;

        destroyAll("itemText");
        destroyAll("selected");
        closeBackpack();
        openBackpack(inventoryState, craftState);
      }
    } else if (inventoryState.vendingSelect - 3 >= 0) {
      inventoryState.vendingSelect -= 3;

      destroyAll("selected");
      let gridX = inventoryState.vendingSelect % 3;
      let gridY = Math.floor(inventoryState.vendingSelect / 3);
      const selected = add([
        rect(70, 70),
        pos(393 - 200 + gridX * 86, 305 + gridY * 100),
        z(19),
        color(255, 255, 255),
        "selected",
      ]);
      destroyAll("itemText");
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;

      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;
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

export function getCurrentItemInBackpack(inventoryState, craftState) {
  const itemsPerPage = 9;
  let startIndex;
  if (inventoryState.page === 0) {
    startIndex = 0;
  } else {
    startIndex = inventoryState.page * itemsPerPage;
  }
  // if page = 1, start index = 9
  // Get the actual index in the vendingContents array
  const actualIndex = startIndex + inventoryState.vendingSelect;

  let currentItem;
  if (inventoryState.page == 0) {
    currentItem =
      inventoryState.vendingContents[inventoryState.vendingSelect].itemKey;
  } else {
    currentItem = inventoryState.vendingContents[actualIndex].itemKey;
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
