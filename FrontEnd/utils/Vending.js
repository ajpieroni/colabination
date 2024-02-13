// Opens backpack window
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
  console.log(inventoryState.vendingSelect);
  let gridX = inventoryState.vendingSelect % 3;
  let gridY = Math.floor(inventoryState.vendingSelect / 3);

  // Arrows
  if (inventoryState.vendingContents.length > 9) {
    const rightArrow = add([
      sprite("rightArrow"),
      pos(450, 400),
      z(100),
      outline(4),
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
      text(itemText, {
        size: 24,
        outline: 4,
        color: (0, 0, 0),
      }),
      area(),
      anchor("center"),
      pos(325, 625),
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
  console.log("PRESSED LEFT");
  let totalcontents = chunkArray(inventoryState.vendingContents, 9);
  let currentPage = inventoryState.page;
  let contents = totalcontents[currentPage];
  const itemsPerPage = 9;
  const startIndex = inventoryState.page * itemsPerPage;
  const actualIndex = startIndex + inventoryState.vendingSelect;
  if (craftState.popUp) {
    console.log(inventoryState.vendingSelect);
    if (actualIndex == 3 || actualIndex == 6) {
      inventoryState.vendingSelect--;

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

      // Pagination logic
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;
      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;

      // Add the item text
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(325, 625),
          z(20),
        ]);
      }
    } else if (
      inventoryState.vendingSelect == 0 ||
      inventoryState.vendingSelect == 3 ||
      inventoryState.vendingSelect == 6
    ) {
      console.log("HIT 230");

      if (inventoryState.page > 0) {
        inventoryState.page--;
        inventoryState.vendingSelect = inventoryState.vendingSelect + 2;
        closeBackpack();
        openBackpack(inventoryState, craftState);
      }
    } else if (inventoryState.vendingSelect > 0) {
      console.log("HIT 137");
      inventoryState.vendingSelect--;

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

      // Pagination logic
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;
      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;

      // Add the item text
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(325, 625),
          z(20),
        ]);
      }
    }
    // If the current selection is not the first item in the backpack, decrement the selection
    else if (
      inventoryState.vendingSelect > 0 &&
      inventoryState.vendingSelect !== 3 &&
      inventoryState.vendingSelect !== 6
    ) {
      console.log("HIT 83");

      inventoryState.vendingSelect--;

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

      // Pagination logic
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;
      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;

      // Add the item text
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(325, 625),
          z(20),
        ]);
      }
      return inventoryState.vendingSelect;
    }
    // If the current selection is the first item in the backpack, decrement the page
  }
}
// Right selection in backpack
export function onKeyPressRight(inventoryState, craftState) {
  console.log("PRESSED RIGHT");
  // Pagination logic
  let totalcontents = chunkArray(inventoryState.vendingContents, 9);
  let currentPage = inventoryState.page;
  let contents = totalcontents[currentPage];
  if (craftState.popUp) {
    // If the current selection is not the last item in the backpack, increment the selection
    if (
      inventoryState.vendingSelect < contents.length - 1 &&
      currentPage == totalcontents.length - 1
    ) {
      inventoryState.vendingSelect++;

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
      destroyAll("itemText");

      // Pagination logic
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;
      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;

      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(325, 625),
          z(20),
        ]);
      }
    } else if (
      inventoryState.vendingSelect < contents.length - 1 &&
      inventoryState.vendingSelect !== 2 &&
      inventoryState.vendingSelect !== 5 &&
      inventoryState.vendingSelect !== 8
    ) {
      inventoryState.vendingSelect++;

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
      destroyAll("itemText");

      // Pagination logic
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;
      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;

      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(325, 625),
          z(20),
        ]);
      }
    } else {
      // If the current selection is the last item in the backpack, increment the page
      if (inventoryState.page < totalcontents.length - 1) {
        inventoryState.page++;
        // Pagination logic
        const itemsPerPage = 9;
        const startIndex = inventoryState.page * itemsPerPage;
        const actualIndex = startIndex + inventoryState.vendingSelect;

        // If there's an item at the index + 2 on the next page, increment the selection by 2
        console.log(
          "More items:",
          inventoryState.vendingContents[actualIndex + 2]
        );
        if (inventoryState.vendingContents[actualIndex - 2]) {
          console.log(
            `Changed selection to: ${inventoryState.vendingSelect - 2}`
          );
          inventoryState.vendingSelect = inventoryState.vendingSelect - 2;
        } else {
          // if inventoryState.vendingSelect + 2 is undefined, then set the index to the last item in the page
          console.log(`Changed selection to: ${0}`);
          inventoryState.vendingSelect = 0;
        }
        closeBackpack();
        openBackpack(inventoryState, craftState);
      }
    }
  }
}
// Down selection in backpack
export function onKeyPressDown(inventoryState, craftState) {
  let totalcontents = chunkArray(inventoryState.vendingContents, 9);
  let currentPage = inventoryState.page;
  let contents = totalcontents[currentPage];
  if (craftState.popUp) {
    // If the current selection is not the last row in the backpack, increment the selection by 3
    if (inventoryState.vendingSelect + 3 < contents.length) {
      inventoryState.vendingSelect += 3;
      // Destroy the selected box and add a new one
      destroyAll("itemText");
      destroyAll("selected");

      // Pagination logic
      const itemsPerPage = 9;
      const startIndex = inventoryState.page * itemsPerPage;
      const actualIndex = startIndex + inventoryState.vendingSelect;

      let itemText = inventoryState.vendingContents[actualIndex]?.itemKey;
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(325, 625),
          z(20),
        ]);
      }

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
  // console.log(inventoryState.vendingSelect);

  if (craftState.popUp) {
    if (inventoryState.vendingSelect - 3 >= 0) {
      inventoryState.vendingSelect -= 3;
      // console.log(inventoryState.vendingSelect);

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
      // console.log(itemText);
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            size: 24,
            outline: 4,
            color: (0, 0, 0),
          }),
          area(),
          anchor("center"),
          pos(325, 625),
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
