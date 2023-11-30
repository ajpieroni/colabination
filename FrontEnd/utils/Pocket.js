export function updatePocket(material, inPocket, itemsInPocket) {

    if (itemsInPocket < 2) {
      material.scaleTo(1);
      material.moveTo(880, itemsInPocket === 0 ? 725 : 775),
        inPocket.push(material);
      itemsInPocket++;
    } else {
      destroy(material);
    }
    return { inPocket, itemsInPocket}
  }