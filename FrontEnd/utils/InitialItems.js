

export default function InitialItems(){
    add([
        sprite("glass"),
        area(),
        body(),
        pos(center().x - 300, center().y),
        z(10),
        scale(1.5),
        "material",
        { image: "glass" },
        { itemKey: "glass" },
      ])
      add([
        sprite("paper"),
        area(),
        body(),
        pos(center().x - 100, center().y),
        z(10),
        scale(1.5),
        "material",
        { image: "paper" },
        { itemKey: "paper" },
      ])
      add([
        sprite("thread"),
        area(),
        body(),
        pos(center().x + 100, center().y),
        z(10),
        scale(1.5),
        "material",
        { image: "thread" },
        { itemKey: "thread" },
      ])
     
}