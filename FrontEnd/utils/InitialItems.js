

export default function InitialItems(){
    add([
        sprite("scissors"),
        area(),
        body(),
        pos(center().x - 300, center().y),
        z(10),
        scale(1.5),
        "material",
        { image: "scissors" },
        { itemKey: "scissors" },
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
        sprite("yarn"),
        area(),
        body(),
        pos(center().x + 100, center().y),
        z(10),
        scale(1.5),
        "material",
        { image: "yarn" },
        { itemKey: "yarn" },
      ])
      add([
        sprite("hammer"),
        area(),
        body(),
        pos(center().x + 200, center().y),
        z(10),
        scale(1.5),
        "material",
        { image: "hammer" },
        { itemKey: "hammer" },
      ])
}