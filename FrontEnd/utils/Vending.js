export function openBackpack(contents, craftState) {
  // craftState.popUp = true;
  console.log("craft state", craftState.popUp);
  console.log("vending contents shown");
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
  contents.sort((a, b) => a.itemKey.localeCompare(b.itemKey));
  if (contents.length > 0) {
    // itemText = (vendingContents[vendingSelect].itemKey);
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

    // console.log(currRow);
    currRow++;
    currentX += item.width + 35;
  }

  // isPopupVisible = true;
}

export function closeBackpack() {
  destroyAll("vending");
  destroyAll("itemText");
  destroyAll("selected");
}

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

export function onKeyPressDown(
  inventoryState,
  craftState
) {
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

export function onKeyPressUp(inventoryState, craftState) {
  if (craftState.popUp) {
    if (inventoryState.vendingSelect - 3 >= 0) {
      inventoryState.vendingSelect -= 3;
      // console.log(vendingSelect);
      destroyAll("selected");
      let gridX = inventoryState.vendingSelect % 3;
      let gridY = Math.floor(inventoryState.vendingSelect / 3);
      const selected = add([
        rect(70, 70),
        pos(393 -200 + gridX * 86, 305 + gridY * 100),
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
