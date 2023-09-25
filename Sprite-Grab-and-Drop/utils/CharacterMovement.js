class CharacterMovement{

    display(){

// isColliding(o: GameObj) => boolean
// If is currently colliding with another game obj.

// !TO FIX:
// -if collide into drawer then into printer, both alerts show
//* Constructor
    // Drawer functionality
    this.canInteractWithDrawer = false;
    // Machine functionlaity
    this.canInteractWithCricut = false;
    let cricutAlertBox = null; 
    let hasUnlockedCricut = false;
    let neededAlert = null;
    let buildAlert = null;
    let neededBlueprintAlert = null;
    // Blueprint
    this.foundBlueprint = false;

    // PLA Logic
    this.isAlertedPLA = false;
    this.hasFoundPLA = false;
    let PLAalertBox = false;
    let noItemsAlert = null;

//! TEMP!
let benchyFound = false;
let benchyAdded = false;

let paperCraft = true;
let scissorsCraft = true;

    // C Drawer Logic
    this.canInteractWithCDrawer = false;
    // Scissors Logic
    this.isAlertedScissors = false;
    this.hasFoundScissors = false;
    let scissorsAlertBox = null;
    // Paper Logic
    this.isAlertedPaper = false;
    this.hasFoundPaper = false;
    let paperAlertBox = null;

    let canPopItem = true;
    // cricut drawer
    let myCDrawer = ["","wood","paper","scissors"];
    const myCDrawerData = {
        scissors: {alertBox: null, hasFound: false},
        paper: {alertBox: null, hasFound: false},
        wood: {alertBox: null, hasFound: false},
        // benchy: {alertBox: null, hasFound: false}
    };
    const woodObject = myCDrawerData.wood; 
    const finalItems = ["", "benchy"];
    const finalItemsData = {
        benchy: {alertBox: null, hasFound: false}
    };
    // drawer by printers
    let myDrawer = ["PLA"];
    const myDrawerData = {
        PLA: {alertBox: null, hasFound: false},
    }
    const PLA = myDrawerData["PLA"];

    // let cdrawerItems = ["", "banana", "cherry"];
//*Player Collides and interacts
function playerCraftsScissorsPaper(){

    if(paperCraft&&scissorsCraft){
        console.log("trueeeee");
    }else{
        console.log("fallsslssee")
    }
}
//! Listen for spacebar key press, when near drawer activate alert
// For the player's interaction with drawer: Scissors, Paper, Wood, noItems
function interactWithCDrawer(){
    if(this.canInteractWithCDrawer){
        if(myCDrawer.length >= 0 && canPopItem){
            let itemName = myCDrawer.pop();
            let foundCItem = myCDrawerData[itemName];
            canPopItem = false;
            if(foundCItem){
                if(foundCItem.alertBox === null && !foundCItem.hasFound){
                    let currSpriteAlert = `${itemName}Alert`; 
                    foundCItem.alertBox = add([
                        area(),
                        "alert",
                        pos(center().x - 100, center().y - 200),
                        color(230, 230, 250),
                        sprite(`${currSpriteAlert}`),
                        color(230, 230, 250),
                        z(10),
                        scale(0.25)
                    ]);
                    this.canInteractWithCDrawer = false;
                    foundCItem.alertBox = true;
                    foundCItem.hasFound = true;
                }
            }
            
        }
        if(myCDrawer.length <= 0){
                noItemsAlert = add([
                    area(),
                    "alert",
                    pos(center().x - 100, center().y - 200),
                    color(230, 230, 250),
                    z(10),
                    sprite("noItems"),
                    scale(0.45)
                ])
            
    }

    }
    
        
}
// For the player's interaction with drawer: PLA, noItems
function interactWithDrawer(){
    if(this.canInteractWithDrawer){
            
        if(myDrawer.length > 0 && canPopItem){
            const itemName = myDrawer.pop();
            const foundItem = myDrawerData[itemName];
            console.log("here is found item", foundItem);
            canPopItem = false;
            if(foundItem.alertBox === null && !foundItem.hasFound){
                    PLAalertBox = add([
                        area(),
                        "alert",
                        pos(center().x - 100, center().y - 200),
                        color(230, 230, 250),
                        sprite("PLAalert"),
                        color(230, 230, 250),
                        z(10),
                        scale(0.45)
                    ]);
                this.canInteractWithDrawer = false;
                foundItem.alertBox = true;
                foundItem.hasFound = true;

            }
        } else{
            noItemsAlert = add([
                        area(),
                        "alert",
                        pos(center().x - 100, center().y - 200),
                        color(230, 230, 250),
                        z(10),
                        sprite("noItems"),
                        scale(0.45)
                    ])
        }
    
    }
}   
function discoverCricut(){
    if(cricut.access && !hasUnlockedCricut){
        cricutAlertBox = add([
            area(),
            "alert",
            pos(center().x - 100, center().y - 200),
            color(230, 230, 250),
            z(10),
            sprite("cricutAlertBox"),
            scale(0.75)
        ]);
        cricut.access = false;
        this.isAlertedPLA = true;
        // this.canInteractWithCricut = false;
        // cricut.access = false;
        hasUnlockedCricut = true;

    }
    if(cricut.access && hasUnlockedCricut && !PLA.hasFound){
        neededAlert = add([
            area(),
            "alert",
            pos(center().x - 100, center().y - 200),
            color(230, 230, 250),
            z(10),
            sprite("neededAlert"),
            scale(0.75)
        ])
        // cricut.access = false;
        cricut.access = false;
        // cricut.buildNoBlueprint = true;

    }
} 
function cricutCraft(){
    if(cricut.access && hasUnlockedCricut && PLA.hasFound){
        buildAlert = add([
            area(),
            "alert",
            pos(center().x - 100, center().y - 200),
            color(230, 230, 250),
            z(10),
            sprite("3DBenchyAlert"),
            scale(0.75)
        ])
        benchyFound = true;
        // cricut.access = false;
        cricut.access = false;
        // cricut.buildNoBlueprint = true;

    }

    
}
//! IF PLAYER COLLIDING AGAINST PAPER SCISSORS THEN MAKE PAPER AIRPLANE
onKeyPress("b", () =>{
    playerCraftsScissorsPaper();
})
onKeyPress("space", () => {
    //! DRAWERS 
    //* Cricut Drawer: Scissors, Paper, Wood, noItems
    interactWithCDrawer.call(this);
    //* Printing Drawer: PLA Plastic, (Pliers)
    interactWithDrawer.call(this);

    // !Machines
    //* Cricut: discovery, needs   
    discoverCricut.call(this);
    //* Cricut: craft
    cricutCraft.call(this);
});


function addItemToFloor(itemObject, image){
    let xDisplace = 0;
    if (itemObject.alertBox !== null) {
        if(itemObject.hasFound){
            add(
                [sprite(`${image}`),
                    pos(center().x+xDisplace, center().y),
                scale(1.5),
                body({isStatic: true}),
                area(),
                z(5)])
                
        }
        xDisplace = xDisplace + 100;
    }
}
// !TODO: make the enter function dynamic for sprite
// dismiss alerts
onKeyPress("enter", () => {
    // Destroys all alerts
    destroyAll("alert");
    canPopItem = true;
    // *Add items after alert onto floor, then when we combine it will work perfectly wiht no problems
    //* Scissors
    const scissorsObject = myCDrawerData.scissors;
    addItemToFloor(scissorsObject, "scissors");
    //* Paper
    const paperObject = myCDrawerData.paper;
    addItemToFloor(paperObject, "paper")

    //* Wood
    const woodObject = myCDrawerData.wood; 
    addItemToFloor(woodObject, "wood");   
    
    // !TODO: Remove benchy, since final item
    let xDisplace = 10;
    if(benchyFound && !benchyAdded){
        add(
            [sprite("3DBenchy"),
            pos(center().x+xDisplace, center().y),
            body({isStatic: true}),
            area(),
            scale(1.5),
            z(5)])
        benchyAdded = true;
    }
   
    }
);

// ! Game Objects
    const cricut = add([
        "machine",
        "cricut",
        sprite("cricut"),
        area(),
        // color(50, 168, 82),
        pos(560, 730),
        z(10),
        scale(2.5),
        rotate(180),
        body({isStatic: true}),
        {access: false},
        {buildNoBlueprint: false}

    ])
        // add creates game object to be displayed on the screen
        // add function returns game objects, can store in const or var
        add([
            sprite("colabBackground"),
            area(),
            scale(.75),
            
        ])
        
        add([
            text("Hiiiiiii", { width: width() / 4 }),
            pos(12, 12),
            color(1,1,1)
        ])
        const player = add([
            sprite("characterSprite"),
            scale(.25),
            pos(center()),
            "player",
            area(),
            body(),
            z(5)
        ])
       
//! Player Movement
// Player search
// WASD
    onKeyDown("a", () => {
        // .move() is provided by pos() component, move by pixels per second
        player.move(-SPEED, 0)
    })
    onKeyDown("d", () => {
        player.move(SPEED, 0)
    })

    onKeyDown("w", () => {
        player.move(0, -SPEED)
    })

    onKeyDown("s", () => {
        player.move(0, SPEED)
    })
// Arrow Keys
    onKeyDown("left", () => {
        // .move() is provided by pos() component, move by pixels per second
        player.move(-SPEED, 0)
    })
    onKeyDown("right", () => {
        player.move(SPEED, 0)
    })

    onKeyDown("up", () => {
        player.move(0, -SPEED)
    })

    onKeyDown("down", () => {
        player.move(0, SPEED)
    })

// Collide Logic: Player and Machine
onCollide("player", "machine", (s,w) =>{
    // this.canInteractWithCricut = true;
    cricut.access = true;
})

onCollide("player", "cricut", (s,w) =>{
    // this.canInteractWithCricut = true;
    cricut.access = true;
})

// Collide Logic: Player and Drawer
onCollide("player", "drawer", (s, w) => {
    this.canInteractWithDrawer = true;

  });

  onCollide("player", "cdrawer", (s, w) => {
    this.canInteractWithCDrawer = true;
  });


//*isColliding
  player.onUpdate(() =>{
//   if(player.isColliding("drawer")){
//     this.canInteractWithDrawer = true;
//     console.log("Hit Drawer")
//   }
//   if(player.isColliding("cdrawer")){
//     this.canInteractWithCDrawer = true;
//     console.log("Hit CDrawer")
//   }

    if(player.isColliding("cricut")){
        // this.canInteractWithCricut = true;
        cricut.access = true;
    }
    if(player.isColliding("paper")){
        paperCraft = true;
    }
    if(player.isColliding("scissors")){
        scissorsCraft = true;
    }
})


//! Level Schema
        const block_size = 64;
        
        const SPEED = 300;
        const map = [
            // "=====================",
            "=$$$$$$$$$$$$$$$$$$$$$=",
            "=*********************=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=$(                 *=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=$          ^^^     *=",
            "=********************=",
            "---------------------",
        ];
        
        const level_config = {
            tileWidth:64,
            tileHeight:64,
            pos: vec2(-65, -70),
        
            // "=": () => [rect(block_size, block_size), color(255, 0, 0), area(), "wall"],
            tiles: {
                "=": () => [
                    rect(block_size, block_size),
                    color(255, 0, 0),
                    "wall",
                    area(),
                    body({isStatic: true}),
                ],
                "-":()=>[
                    rect(block_size/2, block_size/2),
                    color(255, 0, 0),
                    "wall",
                    area(),
                    body({isStatic: true}),
                    pos(0, 25),
                    z(1),
                ],
                "$":()=>[
                    rect(block_size*2, block_size),
                    color(128,128,128),
                    area(),
                    body({isStatic: true}),
                    pos(0, 25),
                    z(1),

                ],
                "*":()=>[
                    rect(block_size, block_size*1.5),
                    color(128,128,128),
                    area(),
                    body({isStatic: true}),
                    pos(0, 25),
                    z(1),
                ],
                "(":()=>[
                    rect(block_size, block_size*1.5),
                    color(46, 51, 48),
                    area(),
                    body({isStatic: true}),
                    pos(10, 55),
                    z(0),
                    "drawer",],
                "^":()=>[
                    rect(block_size, block_size*1.5),
                    color(46, 51, 48),
                    area(),
                    body({isStatic: true}),
                    pos(10, 55),
                    z(0),
                    "cdrawer",]
                
                // "(":drawer,
                
            }
        };

        var level = addLevel(map, level_config);
        
        }
    

    }
   


export const characterMovement = new CharacterMovement()