export function showVendingContents(contents, isPopupVisible) {
    console.log("vending contents shown");
    const popup = add([
      sprite("backpack"),
      pos(475 - 190, 125 + 25),
      z(11),
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
        pos(500 + 25, 500 + 100 + 25),
        z(20),

        // scale(.5)
      ]);

      const selected = add([
        rect(70, 70),
        pos(startX, startY),
        z(11),
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
        z(12),
        "material",
        {
          itemKey: itemKey,
        },
      ]);

      // console.log(currRow);
      currRow++;
      currentX += item.width + 35;
    }

    isPopupVisible = true;
  }