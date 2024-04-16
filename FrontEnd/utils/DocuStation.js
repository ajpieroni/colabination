export function showFinalItems(inventoryState, craftState) {
  craftState.current = "documentation";
  const docPop = add([
    rect(500, 600),
    pos(325, 150),
    z(11),
    color(127, 127, 191),
    outline(4),
    scale(0.75),
    "final",
  ]);
  let count = inventoryState.areFinal.length;
  const achievement = add([
    text(`Final Items: ${count}/35`, { size: 16 }),
    pos(425, 625),
    color(255, 255, 255),
    z(500),
    "final",
  ]);

  // Add the title
  const closeText = add([
    text("Press [ Backspace ] To Close", { size: 24 }),
    pos(100 + 500 - 50 - 100 - 100 - 25, 100 + 50 + 500),
    color(255, 255, 255),
    z(500),
    "final",
  ]);

  // Sort items
  inventoryState.areFinal.sort((a, b) => a.localeCompare(b));

  // Pagination Logic
  let totalcontents = chunkArray(inventoryState.areFinal, 9);
  let currentPage = inventoryState.docuPage;
  let contents = totalcontents[currentPage];
  // inventoryState.vendingSelect = 0;
  // console.log(inventoryState.vendingSelect);
  let gridX = inventoryState.docuSelect % 3;
  let gridY = Math.floor(inventoryState.docuSelect / 3);
  if (totalcontents.length > 1) {
    const pageText = add([
      text(`Page ${currentPage + 1}`, {
        size: 24,
        outline: 4,
        color: (0, 0, 0),
      }),
      pos(
        450 -
          100 -
          25 +
          10 +
          5 -
          10 -
          10 -
          10 -
          25 -
          10 +
          250 -
          50 -
          25 +
          5 +
          5,
        400 + 400 - 300 + 100 + 50 + 25 + 10 + 15
      ),
      z(100),
      "final",
    ]);
  }

  console.log("Current Page:", currentPage);
  console.log("Contents:", contents);

  // Grid
  const startX = docPop.pos.x + 42.5;
  const startY = docPop.pos.y + 30;
  let currentX = startX;
  let currentY = startY;
  let currRow = 0;

  // Arrows, if there are more than 9 items
  if (inventoryState.areFinal.length > 9) {
    const rightArrow = add([
      sprite("rightArrow"),
      pos(650, 300),
      z(100),
      outline(4),
      "final",
    ]);
  }

  // Add items to documentation station
  if (contents) {
    let itemText = inventoryState.areFinal[inventoryState.docuSelect];
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
      pos(500, 575),
      z(20),
    ]);

    // Fetch the item description

    fetchItemDescription(itemText).then((itemDescription) => {
      // Add the item description
      const selectedDescription = add([
        "finalText",
        "final",
        text(itemDescription.data, {
          size: 16,
          outline: 4,
          color: (0, 0, 0),
        }),
        area(),
        anchor("center"),
        pos(500, 575 - 50),
        z(20),
      ]);
    });

    // Add the white box
    // const selected = add([
    //   rect(70, 70),
    //   pos(startX + gridX * 100, startY + gridY * 100),
    //   z(19),
    //   color(255, 255, 255),
    //   "selected",
    //   "final",
    // ]);
    const selected = add([
      rect(70, 70),
      pos(startX + gridX * 100, startY + gridY * 100),
      z(19),
      opacity(0.75),
      color(WHITE),
      outline(4, BLACK),
      "selected",
      "final",
    ]);

    // Add the items into documentation station
    for (let i = 0; i < contents.length; i++) {
      // console.log(item)
      // if on item index greater than 8
      
      let item = contents[i];

      // New Row
      if (currRow === 3) {
        currentY += 50 + 50;
        currentX = startX;
        currRow = 0;
      }

      // Add the item
      const finalItem = add([
        pos(currentX, currentY),
        z(50),
        sprite(`${item}`),
        "final",
        { itemKey: item },
        scale(1.5),
      ]);

      // Increment the row
      currRow++;
      currentX += 100;
    }
  }
}

export function closeDocumentationStation(craftState, inventoryState) {
  destroyAll("final");
  craftState.current = "moving";
}

export function chunkArray(array, chunkSize) {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

// Documentation Station Movement
// left
export function docuLeft(inventoryState, craftState) {
  let currentPage = inventoryState.docuPage;

  if (inventoryState.docuSelect === 0 && currentPage > 0) {
    // Move to previous page
    inventoryState.docuPage--;
    inventoryState.docuSelect = 8; // Last item of the previous page
  } else if (inventoryState.docuSelect > 0) {
    inventoryState.docuSelect--;
  }
  closeDocumentationStation(craftState, inventoryState);
  showFinalItems(inventoryState, craftState);
}
// right
export function docuRight(inventoryState, craftState) {
  let totalcontents = chunkArray(inventoryState.areFinal, 9);
  let currentPage = inventoryState.docuPage;
  let itemsPerPage = 9;
  let maxIndex = itemsPerPage - 1;
  let actualIndex = currentPage * itemsPerPage + inventoryState.docuSelect;

  if (actualIndex < inventoryState.areFinal.length - 1) {
    if (inventoryState.docuSelect === maxIndex) {
      // Move to next page
      inventoryState.docuPage++;
      inventoryState.docuSelect = 0;
    } else {
      inventoryState.docuSelect++;
    }
    closeDocumentationStation(craftState, inventoryState);
    showFinalItems(inventoryState, craftState);
  }
}
export function docuUp(inventoryState, craftState) {
  let totalcontents = chunkArray(inventoryState.areFinal, 9);
  let currentPage = inventoryState.docuPage;

  if (inventoryState.docuSelect > 2) {
    // Move up in the current page
    inventoryState.docuSelect -= 3;
  } else if (currentPage > 0) {
    // Move to the bottom row of the previous page
    currentPage--;
    inventoryState.docuPage = currentPage;
    inventoryState.docuSelect += totalcontents[currentPage].length - 3;
  }

  closeDocumentationStation(craftState, inventoryState);
  showFinalItems(inventoryState, craftState);
}

export function docuDown(inventoryState, craftState) {
  let totalcontents = chunkArray(inventoryState.areFinal, 9);
  let currentPage = inventoryState.docuPage;
  let itemsOnCurrentPage = totalcontents[currentPage].length;

  if (inventoryState.docuSelect < itemsOnCurrentPage - 3) {
    // Move down in the current page
    inventoryState.docuSelect += 3;
  } else if (currentPage < totalcontents.length - 1) {
    // Move to the top row of the next page
    currentPage++;
    inventoryState.docuPage = currentPage;
    inventoryState.docuSelect = 0;
  }

  closeDocumentationStation(craftState, inventoryState);
  showFinalItems(inventoryState, craftState);
}

export function fetchItemDescription(item) {
  return fetch(`http://localhost:8081/items/find_description_by_name/${item}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
