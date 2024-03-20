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
    rect(block_size * 1.65, block_size * 1.95),
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
    rect(block_size * 1.5, block_size * 4),
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
}

// Checks if a new tool should be added to the game, and if so, adds it
export function addNewTool(toolState, showAlert, inventoryState) {
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
      info: "You can find wrenches, pliers, screwdrivers, hammers, and measuring   tapes at the TEC!",
    },
    {
      name: "solderingStation",
      sprite: "solderingStation",
      color: "red",
      area: true,
      body: { isStatic: true },
      pos: { x: 140, y: 35 },
      z: 1,
      tool: true,
      toolKey: "solderingStation",
      access: false,
      toolId: 7,
      x: block_size * 2.25,
      y: block_size,
      info: "The soldering iron is also useful for embedding threaded inserts in 3D prints."
    },
    {
      name: "sewingMachine",
      sprite: "sewingMachine",
      // make the color transparent
      color: rgb(0, 0, 0, 0),
      area: true,
      body: { isStatic: true },
      pos: { x: 500 + 15, y: 710 + 3 },
      z: 1,
      tool: true,
      toolKey: "sewingMachine",
      access: false,
      toolId: 11,
      x: block_size * 1.5,
      y: block_size,
      info: "The Singer Heavy Duty 4423 excels with tough materials like leather,  while the Brother CS7000X offers versatility for various fabrics."
    },
    {
      name: "cricut",
      sprite: "cricut",
      color: "red",
      area: true,
      body: { isStatic: true },
      pos: { x: 230 + 50 + 100, y: 710 + 3 },
      z: 1,
      tool: true,
      toolKey: "cricut",
      access: false,
      toolId: 8,
      x: block_size,
      y: block_size,
    },
    {
      name: "printer1",
      sprite: "printer1",
      color: "blue",
      area: true,
      body: { isStatic: true },
      pos: { x: 65 - 2, y: 200 },
      z: 1,
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
      pos: { x: 65 - 2, y: 365 },
      z: 1,
      tool: true,
      toolKey: "printer2",
      access: false,
      toolId: 5,
      x: block_size,
      y: block_size * 2,
    },
  ];

  let noMoreTools = false;
  let currentToolToBeAdded = null;

  // add the first tool that hasn't been added yet to the game
  for (let i = 0; i < tools.length; i++) {
    // if there are no more tools to add, break
    if (i === tools.length - 1) {
      console.log("No more tools to add");
      noMoreTools = true;
      const toolAlert = add([
        "toolAlert",
        text(`Kudos to you! You've discovered all tools, for now...`, {
          size: 24,
          outline: 4,
          color: (0, 0, 0),
        }),
        area(),
        anchor("center"),
        pos(500, 500 + 100 - 500 - 25),
        z(11),
      ]);
      const toolAlertBox = add([
        rect(500 + 200 + 200, 50 * 2),
        area(),
        anchor("center"),
        pos(500, 500 + 100 - 500 - 25),
        z(5),
        color(242, 140, 30),
        "toolAlert",
      ]);
      
      const exitAlert = add([
        "toolAlert",
        // rgb for black is (0, 0, 0)
        text("Press [ Enter ] To Dismiss", {
          size: 16,
          outline: 4,
          color: (0, 0, 0),
        }),
        area(),
        anchor("center"),
        pos(500, 500 + 100 + 50 - 500),
        z(11),
      ]);

      const exitButton = add([
        rect(300, 40),
        pos(500 - 25 - 100 - 25, 500 + 100 + 50 - 500 - 25 + 5),
        z(5),
        color(228, 228, 228),
        "toolAlert",
      ]);

      // key press flash
      // Craft Button Flash
      let isBright = true;
      setInterval(() => {
        if (isBright) {
          exitButton.color = rgb(228, 228, 228); // less bright color
        } else {
          exitButton.color = rgb(80, 80, 80); // original color
        }
        isBright = !isBright;
      }, 250); // the button color will toggle every 500ms
      // after pressing enter, destroy the alert
      onKeyPress("enter", () => {
        destroyAll("toolAlert");
      });
      break;
    }
    // if the tool hasn't been discovered yet, add it to the game

    if (!toolState.hasDiscovered.has(tools[i].toolKey)) {
      toolState.hasDiscovered.add(tools[i].toolKey);
      addToolToGame(tools[i]);
      destroyAll("temp");
      let currentToolNameToBeAdded = tools[i].toolKey;
      currentToolToBeAdded = tools[i];

      // if added printer 1, also add printer 2
      if (tools[i].toolKey === "printer1") {
        addToolToGame(tools[i + 1]);
        currentToolNameToBeAdded = "3d Printers";
      }
      break;
    }
  }

  // show an alert if the user has discovered a new tool
  if (showAlert && !noMoreTools) {
    addToolAlert(true, currentToolToBeAdded, inventoryState);
  }
}

// Adds a new tool to the game
export function addToolToGame(newTool) {
  const tool = add([
    rect(newTool.x, newTool.y),
    color(40, 124, 196),
    area(),
    body({ isStatic: true }),
    pos(newTool.pos.x, newTool.pos.y),
    z(1),
    "tool",
    { toolKey: `${newTool.toolKey}` },
    { access: false },
    { toolId: newTool.toolId },
    { info: newTool.info },
  ]);
  console.log(`${newTool.toolKey}table`);
  const toolSprite = add([
    sprite(`${newTool.toolKey}table`),
    pos(0, 0),
    z(2),
    scale(0.5),
  ]);
}

// Checks if a new tool should be added to the game, and if so, adds it

export function checkForToolAddition(inventoryState, toolState) {
  // whenever a user discovers items, in increments of 10, add a new tool

  if (toolState.lastStored.size < inventoryState.vendingContents.length) {
    console.log(
      `Adding new tool since lastStored: ${toolState.lastStored.size} < vendingContents: ${inventoryState.vendingContents.length}`
    );
    if (inventoryState.vendingContents.length % 10 === 0) {
      console.log("adding new tool");
      addNewTool(toolState, true, inventoryState);
    }
  }
}

export function addToolAlert(showAlert, addedTool, inventoryState) {
  destroyAll("toolAlert");
  let toolName = parseRegexString(addedTool.toolKey);
  console.log(addedTool.info.length)
  let toolInfo = addedTool.info;
  let toolInfoExtend = null;
  // if the tool info is too long, add it to another text vairable adn add another block
  
  if(toolInfo.length > 50){
    toolInfo = toolInfo.substring(0, 70)
    toolInfoExtend = addedTool.info.substring(70, addedTool.info.length)
  }
  
  // if (tools[i].toolKey === "printer1") {
  //   addToolToGame(tools[i + 1]);
  //   currentToolToBeAdded = "3d Printers";
  // }
  const itemAlert = add([
    "toolAlert",
    text(
      `Since you've discovered ${inventoryState.vendingContents.length} items...`,
      {
        size: 18,
        outline: 4,
        color: (0, 0, 0),
      }
    ),
    area(),
    anchor("center"),
    pos(500, 500 + 100 - 500 - 50),
    z(11),
  ]);
  const toolAlert = add([
    "toolAlert",
    text(`You've discovered a new tool, the ${toolName}!`, {
      size: 24,
      outline: 4,
      color: (0, 0, 0),
    }),
    area(),
    anchor("center"),
    pos(500, 500 + 100 - 500),
    z(11),
  ]);
  const toolInfoText = add([
    "toolAlert",
    text(`${toolInfo}`, {
      size: 16,
      outline: 4,
      color: (0, 0, 0),
    }),
    area(),
    anchor("center"),
    pos(500, 500 + 100),
    z(11),
  ]);
  if(toolInfoExtend){
    const toolInfoText = add([
      "toolAlert",
      text(`${toolInfoExtend}`, {
        size: 16,
        outline: 4,
        color: (0, 0, 0),
      }),
      area(),
      anchor("center"),
      pos(500, 500 + 100+50),
      z(11),
    ]);
  }
  const toolInfoBlock = add([
    rect(500 + 200 + 200, 60 * 2),
    area(),
    anchor("center"),
    pos(500, 500 + 100+25),
    z(10),
    color(242, 140, 40),
    "toolAlert",
  ]);
  const toolAlertBox = add([
    rect(500 + 200 + 200, 50 * 2),
    area(),
    anchor("center"),
    pos(500, 500 + 100 - 500 - 25),
    z(5),
    color(242, 140, 40),
    "toolAlert",
  ]);
  const exitAlert = add([
    "toolAlert",
    // rgb for black is (0, 0, 0)
    text("Press [ Enter ] To Dismiss", {
      size: 16,
      outline: 4,
      color: (0, 0, 0),
    }),
    area(),
    anchor("center"),
    pos(500, 500 + 100 + 50 - 500),
    z(11),
  ]);

  const exitButton = add([
    rect(300, 40),
    pos(500 - 25 - 100 - 25, 500 + 100 + 50 - 500 - 25 + 5),
    z(5),
    color(228, 228, 228),
    "toolAlert",
  ]);

  // key press flash
  // Craft Button Flash
  let isBright = true;
  setInterval(() => {
    if (isBright) {
      exitButton.color = rgb(228, 228, 228); // less bright color
    } else {
      exitButton.color = rgb(80, 80, 80); // original color
    }
    isBright = !isBright;
  }, 250); // the button color will toggle every 500ms
  // after pressing enter, destroy the alert
  onKeyPress("enter", () => {
    destroyAll("toolAlert");
  });
}

export function parseRegexString(str) {
  let resultDisplay = str
    .replace(/([A-Z])/g, " $1")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return resultDisplay;
}
