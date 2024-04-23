import {handleSavingData} from "./Save.js";
export function updatePocket(material, inPocket, itemsInPocket) {
  if (itemsInPocket < 2) {
    material.scaleTo(1);
    material.moveTo(880, itemsInPocket === 0 ? 725 : 775),
      inPocket.push(material);
    itemsInPocket++;
  } else {
    destroy(material);
  }
  return { inPocket, itemsInPocket };
}

export function updatePocketVending(
  material,
  inPocket,
  itemsInPocket,
  volumeSetting
) {
  if (itemsInPocket < 2) {
    if (volumeSetting) {
      play("bubble");
    }
    const newItem = add([
      pos(880, itemsInPocket === 0 ? 725 : 775),
      z(11),
      sprite(`${material.itemKey}`),
      scale(1),
      "material",
      { image: material.itemKey },
      { itemKey: material.itemKey },
    ]);
    // // console.log(`Pushed item, ${newItem}, ${newItem.itemKey}`);
    inPocket.push(newItem);
    itemsInPocket++;
    let n = true;

    return { inPocket, itemsInPocket, n };
  } else {
    let alertText = "Remove items from pocket to select from vending machine";

    add([
      "alertPop",
      text(alertText, {
        // optional object
        size: 24,
        outline: 4,
        color: (0, 0, 0),
        // can specify font here,
      }),
      area(),
      anchor("center"),
      pos(500 + 25, 500 - 300),
      z(20),
      // scale(.5)
    ]);
    add([
      rect(500 + 200 + 200, 50),
      area(),
      anchor("center"),
      pos(500 + 25, 500 - 300),
      z(19),
      color(242, 140, 40),
      "alertPop",
    ]);

    setTimeout(() => {
      destroyAll("alertPop");
    }, 2000);
let n  = false;
    return {n}
    // shake(5);
  }
}
