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

  const closeText = add([
    text("Press [ Escape ] To Close", { size: 24 }),
    pos(100 + 500 - 50, 100 + 50 + 500),
    color(255, 255, 255),
    z(500),
    "final",
  ]);

  // Sort items
  inventoryState.areFinal.sort((a, b) => a.localeCompare(b));

  // Pagination Logic
  let totalcontents = chunkArray(inventoryState.areFinal, 9);
  let currentPage = inventoryState.finalPage;
  let contents = totalcontents[currentPage];
  // inventoryState.vendingSelect = 0;
  // console.log(inventoryState.vendingSelect);
  let gridX = inventoryState.docuSelect % 3;
  let gridY = Math.floor(inventoryState.docuSelect / 3);

  // Grid
  const startX = docPop.pos.x + 42.5;
  const startY = docPop.pos.y + 30;
  let currentX = startX;
  let currentY = startY;
  let currRow = 0;

  // Arrows
  if (inventoryState.areFinal.length > 9) {
    const rightArrow = add([
      sprite("rightArrow"),
      pos(450, 400),
      z(100),
      outline(4),
      "final",
    ]);
  }

  // Add items to docu
  if (contents && contents.length > 0) {
    let itemText = contents[inventoryState.docuSelect];
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
      "finalText",
      "final",
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

    // Add the white box
    const selected = add([
      rect(70, 70),
      pos(currentX, currentY),
      z(19),
      color(255, 255, 255),
      "selected",
      "final"
    ]);
    // Add the items into the backpack
    for (let i = 0; i < contents.length; i++) {
      console.log(`Adding item ${contents[i]} to the documentation station.`)
      const item = contents[i];
      const itemKey = item;
      // starts a new line

      if (currRow === 3) {
        currentY += item.height + 50;
        currentX = startX;
        currRow = 0;
      }
      // Add the item to the backpack
      const finalItem = add([
        pos(currentX, currentY),
        z(11),
        "finalItem",
        sprite(`${item}`),
        scale(1.5),
        z(100),
        "final",
        {
          itemKey: itemKey,
        },
      ]);
      currRow++;
      currentX += item.width + 35;
    }
  }

  console.log(inventoryState.areFinal);
  console.log(inventoryState.vendingContents);

  // Add items to documentation station
  // for (let i = 0; i < inventoryState.areFinal.length; i++) {
  //   const item = inventoryState.areFinal[i];
  //   if (item) {
  //     let itemText = item.charAt(0).toUpperCase() + item.slice(1);
  //     let resultDisplay = itemText
  //       // space
  //       .replace(/([A-Z])/g, " $1")
  //       //trim
  //       .split(" ")
  //       .map(
  //         (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //       )
  //       .join(" ");
  //     const selectedText = add([
  //       "finalText",
  //       text(resultDisplay + "!!!", {
  //         size: 24,
  //         outline: 4,
  //         color: (0, 0, 0),
  //       }),
  //       area(),
  //       anchor("center"),
  //       pos(325, 625),
  //       z(20),
  //       "final",
  //     ]);

  //     // const itemKey = item.itemKey;
  //     // starts a new line

  //     if (currRow === 3) {
  //       currentY += item.height + 50;
  //       currentX = startX;
  //       currRow = 0;
  //     }

  //     const finalItem = add([
  //       pos(currentX, currentY),
  //       z(11),
  //       sprite(`${item}`),
  //       "final",
  //       { itemKey: item },
  //     ]);

  //     currRow++;
  //     currentX += 100;
  //   }
  // }
}

export function closeDocumentationStation() {
  destroyAll("final");
}


export function chunkArray(array, chunkSize) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}