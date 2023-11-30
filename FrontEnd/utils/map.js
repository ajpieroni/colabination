export default function map(){
    let volumeSetting = localStorage.getItem("soundTogg")
    ? parseFloat(localStorage.getItem("soundTogg"))
    : 1;
  console.log("here's volume setting", volumeSetting);
  //! Level Schema
  // stop("soundtrack");
  this.music = play("soundtrack", {
    volume: volumeSetting,
    loop: true,
  });

  const block_size = 32;

  const map = [
    // "=====================",
    "=$$$$$$$$$$$$$$$$$$$$$=",
    "=*********************=",
    "==$            *=",
    "==$            *=",
    "==$            *=",
    "==$            *=",
    "==$            *=",
    "==$            *=",
    "==$            *=",
    "==$            *=",
    "==$            *=",
    "==$                    ",
    "=9999999999    !99999=",
    "=9999999999    !99999=",
    "---------------------",
  ];


  const level_config = {
    tileWidth: 64,
    tileHeight: 64,
    pos: vec2(-65, -70),

    // "=": () => [rect(block_size, block_size), color(255, 0, 0), area(), "wall"],
    tiles: {
      "=": () => [
        rect(block_size * 2, block_size),
        color(255, 0, 0),
        "wall",
        area(),
        body({ isStatic: true }),
        // z(15)
      ],
      "-": () => [
        rect(block_size / 2, block_size / 2),
        color(255, 0, 0),
        "wall",
        area(),
        body({ isStatic: true }),
        pos(0, 25),
        // z(15)
      ],
      $: () => [
        rect(block_size * 2, block_size * 2),
        color(128, 128, 128),
        area(),
        body({ isStatic: true }),
        pos(0, 25),
        // z(15)
      ],

      "*": () => [
        rect(block_size * 2, block_size * 2.5),
        color(255, 0, 0),
        area(),
        body({ isStatic: true }),
        pos(5, 25),
        // z(15)
      ],
      9: () => [
        rect(block_size * 3.5, block_size * 3.25),
        color(128, 128, 128),
        area(),
        body({ isStatic: true }),
        pos(0, 15),
        // z(15)
      ],
      "!": () => [
        rect(block_size * 5, block_size * 5),
        color(255, 0, 0),
        area(),
        body({ isStatic: true }),
        pos(-35, 0),
        // z(15)
      ],

      // "(":drawer,
    },
  };

  var level = addLevel(map, level_config);
}