

export default function Tools(){

  // !Tables
  const block_size = 64;

  const handTools = add([
    rect(block_size * 1.65, block_size * 4),
    color(256, 0, 0),
    area(),
    body({ isStatic: true }),
    pos(260, 260),
    z(1),
    "handTools",
    "tool",
    { toolKey: "hammer" },
    { access: false },
    { toolId: 1 },
    
  ]);
  
  const scissors = add([
    rect(block_size * 1.65, block_size * 1.15),
    // make the color green
    color(0, 256, 0),
    area(),
    body({ isStatic: true }),
    pos(140+300, 40-20+10),
    z(1),
    "handTools",
    "tool",
    { toolKey: "scissors" },
    { access: false },
    { toolId: 2 },
  ]);
  // const leatherTools = add([
  //   rect(block_size * 1.65, block_size * 4),
  //   color(256, 0, 0),
  //   area(),
  //   body({ isStatic: true }),
  //   pos(470, 260),
  //   z(1),
  //   "leatherTable",
  //   "tool",
  //   { toolKey: "screwdriver" },
  //   { access: false },
  //   { toolId: 10 },
    
  // ]);

  const craftingTable = add([
    rect(block_size * 1.65, block_size * 4),
    color(256, 0, 0),
    area(),
    body({ isStatic: true }),
    pos(670, 260),
    z(1),
    "craftingTable",
    "tool",
    { toolKey: "craftingTable" },
    { access: false },
    { toolId: 3 },
  ]);
  


  // !Machines
  const printer1 = add([
    rect(block_size, block_size * 2),
    color(0, 0, 255),
    area(),
    body({ isStatic: true }),
    pos(65, 200),
    // z(10),
    "printer",
    { toolKey: "printer1" },
    { access: false },
  ]);
  const printer2 = add([
    rect(block_size, block_size * 2),
    color(0, 0, 255),
    area(),
    body({ isStatic: true }),
    pos(65, 365),
    // z(10),
    "printer",
    { toolKey: "printer2" },
    { access: false },
  ]);
  const documentationStation = add([
    rect(block_size, block_size * 2),
    color(0, 100, 0),
    area(),
    body({ isStatic: true }),
    pos(900 - 15 - 10 - 50 - 50, 250 - 10 - 10 + 20 - 100 - 50),
    rotate(270),
    // z(10),
    "documentationStation",
    { access: false },
  ]);
  // !TODO: tools to add
  const cricut = add([
    rect(block_size * 2.25, block_size),
    "tool",
    "cricut vinyl cutter",
    // sprite("cricut"),
    area(),
    color(0, 0, 255),
    pos(330-100, 710),
    z(1),
    body({ isStatic: true }),
    { buildNoBlueprint: false },
    { toolKey: "cricut vinyl cutter" },
    { access: false },
    { toolId: 8 },
  ]);
  const sewingMachine = add([
    rect(block_size * 2.5, block_size),
    color(255, 0, 0),
    area(),
    body({ isStatic: true }),
    pos(500, 710),
    z(1),
    "printer",
    "tool",
    { toolKey: "sewing machine" },
    { access: false },
    { toolId: 11 },
  ]);
  const solderingStation = add([
    rect(block_size * 2.25, block_size),
    color(255, 0, 0),
    area(),
    body({ isStatic: true }),
    pos(140, 40),
    z(1),
    "printer",
    "tool",
    { toolKey: "solderingStation" },
    { access: false },
    { toolId: 7 },
    
  ]);
}