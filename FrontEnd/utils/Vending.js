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
  if (contents.length > 0) {
    let itemText = contents[0].itemKey;
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

    const selected = add([
      rect(70, 70),
      pos(startX, startY),
      z(19),
      color(255, 255, 255),
      "selected",
    ]);
  }

  for (let i = 0; i < contents.length; i++) {
    const item = contents[i];
    const itemKey = item.itemKey;
    // starts a new line

    if (currRow === 3) {
      currentY += item.height + 50;
      currentX = startX;
      currRow = 0;
    }

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

// Get current page of backpack
export function chunkArray(array, chunkSize) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

// when at bottom index of contents, if they keep pressing down then it should go to the next page
// when at top index of contents, if they keep pressing up then it should go to the previous page
// if they press left or right, it should change the selected item
// if they press enter, it should select the item

// Closes backpack window, and text
export function closeBackpack() {
  destroyAll("vending");
  destroyAll("itemText");
  destroyAll("selected");
}
// Left selection in backpack
export function onKeyPressLeft(inventoryState, craftState) {
  if (craftState.popUp) {
    if (inventoryState.vendingSelect > 0) {
      inventoryState.vendingSelect--;
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
      console.log(itemText);
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            // optional object
            size: 24,
            outline: 4,
            color: (0, 0, 0),
            // can specify font here,
          }),
          area(),
          anchor("center"),
          pos(325, 625),
          z(20),
          // scale(.5)
        ]);
      }
      console.log(itemText);
      return inventoryState.vendingSelect;
    }
  }
}
// Right selection in backpack
export function onKeyPressRight(inventoryState, craftState) {
  if (craftState.popUp) {
    if (
      inventoryState.vendingSelect <
      inventoryState.vendingContents.length - 1
    ) {
      inventoryState.vendingSelect++;
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
      console.log(itemText);
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            // optional object
            size: 24,
            outline: 4,
            color: (0, 0, 0),
            // can specify font here,
          }),
          area(),
          anchor("center"),
          pos(325, 625),
          z(20),
          // scale(.5)
        ]);
      }
      console.log(itemText);
    }
  }
}
// Down selection in backpack
export function onKeyPressDown(inventoryState, craftState) {
  if (craftState.popUp) {
    if (
      inventoryState.vendingSelect + 3 <
      inventoryState.vendingContents.length
    ) {
      inventoryState.vendingSelect += 3;
      // console.log(vendingSelect);
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
    }
  }
}
// Up selection in backpack
export function onKeyPressUp(inventoryState, craftState) {
  if (craftState.popUp) {
    if (inventoryState.vendingSelect - 3 >= 0) {
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
      console.log(itemText);
      if (itemText) {
        itemText = itemText.charAt(0).toUpperCase() + itemText.slice(1);
        const selectedText = add([
          "itemText",
          text(itemText, {
            // optional object
            size: 24,
            outline: 4,
            color: (0, 0, 0),
            // can specify font here,
          }),
          area(),
          anchor("center"),
          pos(325, 625),
          z(20),
          // scale(.5)
        ]);
      }
      console.log(itemText);
    }
  }
}

export function getCurrentItemInBackpack(inventoryState, craftState) {
  const itemsPerPage = 9;
  // const startIndex = inventoryState.page * itemsPerPage;
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
  console.log(
    `Actual index: ${actualIndex} ${inventoryState.vendingContents[actualIndex]}`
  );

  return currentItem;
}

export function addItemToBackpack(inventoryState, resultItem) {
  console.log("Collided with material", materialEntity.itemKey);
  if (
    !inventoryState.vendingContents.includes(materialEntity) &&
    !inventoryState.vendingKeys.includes(materialEntity.itemKey)
  ) {
    console.log(`Pushing ${materialEntity.itemKey} to vending machine`);
    inventoryState.vendingContents.push(materialEntity);
    inventoryState.vendingKeys.push(materialEntity.itemKey);
  }
}
