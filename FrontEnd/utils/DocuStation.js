export function showFinalItems(inventoryState, craftState) {
  craftState.current = "documentation";
  const docPop = add([
    rect(500, 600),
    pos(325, 150),
    z(11),
    color(204, 229, 255),
    outline(4),
    scale(0.75),
    "final",
  ]);
  let count = inventoryState.areFinal.length;
  const achievement = add([
    text(`Final Items: ${count}/17`, { size: 16 }),
    pos(425, 625),
    color(255, 255, 255),
    z(500),
    "final",
  ]);

  // Add the title
  const closeText = add([
    text("Press [ Escape ] To Close", { size: 24 }),
    pos(100 + 500 - 50 - 100 - 100 - 25, 100 + 50 + 500),
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

  // Arrows, if there are more than 9 items
  if (inventoryState.areFinal.length > 9) {
    const rightArrow = add([
      sprite("rightArrow"),
      pos(450, 400),
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
    const selected = add([
      rect(70, 70),
      pos(startX + gridX * 100, startY + gridY * 100),
      z(19),
      color(255, 255, 255),
      "selected",
      "final",
    ]);

    // Add the items into documentation station
    for (let i = 0; i < contents.length; i++) {
      let item = inventoryState.areFinal[i];

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

// Documentation Station Movement
// left
export function docuLeft(inventoryState, craftState) {
  // Pagination Logic
  let totalcontents = chunkArray(inventoryState.areFinal, 9);
  let currentPage = inventoryState.docuPage;
  let contents = totalcontents[currentPage];
  const itemsPerPage = 9;
  const startIndex = inventoryState.docuPage * itemsPerPage;
  const actualIndex = startIndex + inventoryState.docuSelect;

  if (inventoryState.docuSelect > 0) {
    inventoryState.docuSelect--;

    closeDocumentationStation();
    showFinalItems(inventoryState, craftState);
  }
}
// right
export function docuRight(inventoryState, craftState) {
  // Pagination Logic
  let totalcontents = chunkArray(inventoryState.areFinal, 9);
  let currentPage = inventoryState.docuPage;
  let contents = totalcontents[currentPage];
  const itemsPerPage = 9;
  const startIndex = inventoryState.docuPage * itemsPerPage;
  const actualIndex = startIndex + inventoryState.docuSelect;
  if (inventoryState.docuSelect < inventoryState.areFinal.length - 1) {
    inventoryState.docuSelect++;
    closeDocumentationStation();
    showFinalItems(inventoryState, craftState);
  }
}
export function docuUp(inventoryState, craftState) {
  // Pagination Logic
  let totalcontents = chunkArray(inventoryState.areFinal, 9);
  let currentPage = inventoryState.docuPage;
  let contents = totalcontents[currentPage];
  const itemsPerPage = 9;
  const startIndex = inventoryState.docuPage * itemsPerPage;
  const actualIndex = startIndex + inventoryState.docuSelect;
  if (inventoryState.docuSelect > 2) {
    inventoryState.docuSelect -= 3;
    closeDocumentationStation();
    showFinalItems(inventoryState, craftState);
  }
}
export function docuDown(inventoryState, craftState) {
  // Pagination Logic
  let totalcontents = chunkArray(inventoryState.areFinal, 9);
  let currentPage = inventoryState.docuPage;
  let contents = totalcontents[currentPage];
  const itemsPerPage = 9;
  const startIndex = inventoryState.docuPage * itemsPerPage;
  const actualIndex = startIndex + inventoryState.docuSelect;
  if (inventoryState.docuSelect < inventoryState.areFinal.length - 3) {
    inventoryState.docuSelect += 3;
    closeDocumentationStation();
    showFinalItems(inventoryState, craftState);
  }
}

export function fetchItemDescription(item) {
  return fetch(`http://localhost:8081/items/find_description_by_name/${item}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
