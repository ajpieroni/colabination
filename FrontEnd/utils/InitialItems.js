

export default function InitialItems(itemsToAdd){
  const itemDetails = {
    glass: {
        sprite: "glass",
        position: center().x - 300,
        image: "glass",
        itemKey: "glass"
    },
    paper: {
        sprite: "wood",
        position: center().x - 100,
        image: "wood",
        itemKey: "wood"
    },
    thread: {
        sprite: "thread",
        position: center().x + 100,
        image: "thread",
        itemKey: "thread"
    },
    metal: {
        sprite: "metal",
        position: center().x + 300,
        image: "metal",
        itemKey: "metal"
    }
};

itemsToAdd.forEach(itemKey => {
  if (itemDetails[itemKey]) {
      const item = itemDetails[itemKey];
      add([
          sprite(item.sprite),
          area(),
          body(),
          pos(item.position, center().y),
          z(10),
          scale(1.5),
          "material",
          { image: item.image },
          { itemKey: item.itemKey },
      ]);
  }
});
}