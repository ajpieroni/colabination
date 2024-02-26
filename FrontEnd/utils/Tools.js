export default function Tools() {
  // !Tables
  const block_size = 64;

  // const scissors = add([
  //   rect(block_size * 1.65, block_size * 1),
  //   color(256, 0, 0),
  //   area(),
  //   body({ isStatic: true }),
  //   pos(260, 260),
  //   z(1),

  //   "handTools",
  //   "tool",
  //   { toolKey: "scissors" },
  //   { access: false },
  //   { toolId: 2 },

  // ]);

  // scissors = {
  //   name: "scissors",
  //   sprite: "scissors",
  //   color: "red",
  //   area: true,
  //   body: { isStatic: true },
  //   pos: { x: 260, y: 260 },
  //   z: 1,
  //   tool: true,
  //   toolKey: "scissors",
  //   access: false,
  //   toolId: 2,
  //   x: block_size * 1.65,
  //   y: block_size * 1,
  // }

  const hammer = add([
    rect(block_size * 1.65, block_size * 2),
    // make the color green
    color(0, 256, 0),
    area(),
    body({ isStatic: true }),
    pos(260, 260 + 200 - 75 + 15),
    z(1),
    "handTools",
    "tool",
    { toolKey: "hammer" },
    { access: false },
    { toolId: 1 },
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

  // // !Machines
  // const printer1 = add([
  //   rect(block_size, block_size * 2),
  //   color(0, 0, 255),
  //   area(),
  //   body({ isStatic: true }),
  //   pos(65, 200),
  //   // z(10),
  //   "printer",
  //   { toolKey: "printer1" },
  //   { access: false },
  // ]);
  // const printer2 = add([
  //   rect(block_size, block_size * 2),
  //   color(0, 0, 255),
  //   area(),
  //   body({ isStatic: true }),
  //   pos(65, 365),
  //   // z(10),
  //   "printer",
  //   { toolKey: "printer2" },
  //   { access: false },
  // ]);
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
  // // !TODO: tools to add
  // const cricut = add([
  //   rect(block_size * 2.25, block_size),
  //   "tool",
  //   "cricut vinyl cutter",
  //   // sprite("cricut"),
  //   area(),
  //   color(0, 0, 255),
  //   pos(330-100, 710),
  //   z(1),
  //   body({ isStatic: true }),
  //   { buildNoBlueprint: false },
  //   { toolKey: "cricut vinyl cutter" },
  //   { access: false },
  //   { toolId: 8 },
  // ]);
  // const sewingMachine = add([
  //   rect(block_size * 2.5, block_size),
  //   color(255, 0, 0),
  //   area(),
  //   body({ isStatic: true }),
  //   pos(500, 710),
  //   z(1),
  //   "printer",
  //   "tool",
  //   { toolKey: "sewing machine" },
  //   { access: false },
  //   { toolId: 11 },
  // ]);
  // const solderingStation = add([
  //   rect(block_size * 2.25, block_size),
  //   color(255, 0, 0),
  //   area(),
  //   body({ isStatic: true }),
  //   pos(140, 40),
  //   z(1),
  //   "printer",
  //   "tool",
  //   { toolKey: "solderingStation" },
  //   { access: false },
  //   { toolId: 7 },

  // ]);
}

export function addNewTool(toolState) {
  const block_size = 64;
  // list of tools
  let tools = [
    {
      name: "scissors",
      sprite: "scissors",
      color: "red",
      area: true,
      body: { isStatic: true },
      pos: { x: 260, y: 260 },
      z: 1,
      tool: true,
      toolKey: "scissors",
      access: false,
      toolId: 2,
      x: block_size * 1.65,
      y: block_size * 1,
    },
    {
      name: "solderingStation",
      sprite: "solderingStation",
      color: "red",
      area: true,
      body: { isStatic: true },
      pos: { x: 140, y: 40 },
      z: 1,
      tool: true,
      toolKey: "solderingStation",
      access: false,
      toolId: 7,
      x: block_size * 2.25,
      y: block_size,
    },
    {
      name: "sewingMachine",
      sprite: "sewingMachine",
      color: "red",
      area: true,
      body: { isStatic: true },
      pos: { x: 500, y: 710 },
      z: 1,
      tool: true,
      toolKey: "sewingMachine",
      access: false,
      toolId: 11,
      x: block_size * 2.5,
      y: block_size,
    },
    {
      name: "cricut",
      sprite: "cricut",
      color: "red",
      area: true,
      body: { isStatic: true },
      pos: { x: 230, y: 710 },
      z: 1,
      tool: true,
      toolKey: "cricut",
      access: false,
      toolId: 8,
      x: block_size * 2.25,
      y: block_size,
    },
    {
      name: "printer1",
      sprite: "printer1",
      color: "blue",
      area: true,
      body: { isStatic: true },
      pos: { x: 65, y: 200 },
      z: 10,
      tool: true,
      toolKey: "printer1",
      access: false,
      toolId: 4,
      x: block_size,
      y: block_size * 2,
    },
    {
      name: "printer2",
      sprite: "printer2",
      color: "blue",
      area: true,
      body: { isStatic: true },
      pos: { x: 65, y: 365 },
      z: 10,
      tool: true,
      toolKey: "printer2",
      access: false,
      toolId: 5,
      x: block_size,
      y: block_size * 2,
    },
  ];

  // add the first tool that hasn't been added yet to the game
  for (let i = 0; i < tools.length; i++) {
    if (!toolState.hasDiscovered.has(tools[i].toolKey)) {
      toolState.hasDiscovered.add(tools[i].toolKey);
      addToolToGame(tools[i]);
      // if added printer 1, also add printer 2
      if (tools[i].toolKey === "printer1") {
        addToolToGame(tools[i + 1]);
      }
      break;
    }
  }
}

export function addToolToGame(newTool) {
  const tool = add([
    rect(newTool.x, newTool.y),
    color(256, 0, 0),
    area(),
    body({ isStatic: true }),
    pos(newTool.pos.x, newTool.pos.y),
    z(newTool.z),
    "handTools",
    "tool",
    { toolKey: `${newTool.toolKey}` },
    { access: false },
    { toolId: 2 },
  ]);
}

export function checkForToolAddition(inventoryState){
  // whenever a user discovers items, in increments of 10, add a new tool
  if (inventoryState.vendingContents.length % 10 === 0) {
    console.log("adding new tool");
    addNewTool(inventoryState);
  }
}