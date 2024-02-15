export function showFinalItems(inventoryState) {
  const docPop = add([
    rect(500, 600),
    pos(325, 150),
    z(11),
    color(204, 229, 255),
    outline(4),
    scale(0.75),
    "final",
  ]);
  // Grid
  const startX = docPop.pos.x + 42.5;
  const startY = docPop.pos.y + 30;
  let currentX = startX;
  let currentY = startY;
  let currRow = 0;

  console.log(inventoryState.areFinal);
  console.log(inventoryState.vendingContents);

  // Add items to documentation station
  for (let i = 0; i < inventoryState.areFinal.length; i++) {
    const item = inventoryState.areFinal[i];
    if (item) {
      let itemText = item.charAt(0).toUpperCase() + item.slice(1);
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
        pos(325, 625),
        z(20),
      ]);

      // const itemKey = item.itemKey;
      // starts a new line

      if (currRow === 3) {
        currentY += item.height + 50;
        currentX = startX;
        currRow = 0;
      }

      const finalItem = add([
        pos(currentX, currentY),
        z(11),
        sprite(`${item}`),
        "final",
        { itemKey: item },
      ]);

      const finalItemText = add([
        pos(currentX, currentY + 50),
        text(resultDisplay, {
          // optional object
          size: 16,
          color: (255, 255, 255),
          // can specify font here,
        }),
        z(11),
        "final",
        // { itemKey: item },
      ]);
      currRow++;
      currentX += 100;
    }
  }
}
