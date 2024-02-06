// Opens backpack window
export function openBackpack(inventoryState, craftState) {
  // contents is an array, index into the array to get the current page, where the page is 9 items long
  inventoryState.vendingContents.sort((a, b) => a.itemKey.localeCompare(b.itemKey));
  let totalcontents = chunkArray(inventoryState.vendingContents, 9);
  let currentPage = inventoryState.page;
  let contents = totalcontents[currentPage];

  console.log(inventoryState.vendingContents);
  console.log(totalcontents);
  console.log(currentPage);
  console.log(contents);
  

  // let contents = inventoryState.vendingContents;
  // let currentPage = inventoryState.page;
  // console.log(inventoryState.page)

  // paging system:
  // pages is initially 0
  // if contents.length > 9, pages = Math.ceil(contents.length / 9)
  // if pages > 1, contents = contents.slice((currentPage - 1) * 9, currentPage * 9)
  // if pages > 1, add buttons for next and previous page

  // if pages > 1, add text for current page

  // if(contents.length > 9){
  //   inventoryState.page = Math.ceil(contents.length / 9);

  // }
  // console.log(inventoryState.page)

  // if(inventoryState.page > 1){
  //   contents = contents.slice((currentPage - 1) * 9, currentPage * 9);
  // }
  // console.log(contents)

  // console.log(contents)
  // craftState.popUp = true;
  const popup = add([
    sprite("backpack"),
    pos(475 - 190 - 100 - 100, 125 + 25),
    z(19),
    outline(4),
    // scale(0.75),
    "vending",
  ]);
  const startX = popup.pos.x + 108;
  const startY = popup.pos.y + 155;
  let currentX = startX;
  let currentY = startY;
  let currRow = 0;
  // console.log(inventoryState.vendingContents.length);
  contents.sort((a, b) => a.itemKey.localeCompare(b.itemKey));
  if (contents.length > 0) {
    // itemText = (vendingContents[vendingSelect].itemKey);
    console.log(contents[0].itemKey);
    let itemText = contents[0].itemKey;

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

    const selected = add([
      rect(70, 70),
      pos(startX, startY),
      z(19),
      color(255, 255, 255),
      "selected",
    ]);
  }
  contents.sort((a, b) => a.itemKey.localeCompare(b.itemKey));

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
      // rect(item.width, item.height) ,
      pos(currentX, currentY),
      z(11),
      // color(item.color.r, item.color.g, item.color.b),
      "vending",
      sprite(`${item.itemKey}`),
      // rect(10,10),
      // sprite(`${image}`),
      scale(1.5),
      z(20),
      "material",
      {
        itemKey: itemKey,
      },
    ]);
    // console.log(`added ${vendingItem.itemKey} to vending machine`);

    // console.log(currRow);
    currRow++;
    currentX += item.width + 35;
  }

  // isPopupVisible = true;
}
// Get current page of backpack
export function getCurrentPage(contents, currentPage) {
  return contents[currentPage - 1];
  // return inventoryState.page;
}

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
      let itemText =
        inventoryState.vendingContents[inventoryState.vendingSelect].itemKey;
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
      let itemText =
        inventoryState.vendingContents[inventoryState.vendingSelect].itemKey;
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
      let itemText =
        inventoryState.vendingContents[inventoryState.vendingSelect].itemKey;
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
      let itemText =
        inventoryState.vendingContents[inventoryState.vendingSelect].itemKey;
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
        pos(500 - 200 + 25, 500 + 100 + 25),
        z(20),

        // scale(.5)
      ]);
    }
  }
}

export function getCurrentItemInBackpack(inventoryState, craftState) {
  let currentItem =
    inventoryState.vendingContents[inventoryState.vendingSelect].itemKey;
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
