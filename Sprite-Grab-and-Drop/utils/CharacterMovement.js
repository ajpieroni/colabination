class CharacterMovement{
    constructor(){
        this.level =null;
    }
    display(){
        //! Level Schema
        const block_size = 32;
        
        const map = [
            // "=====================",
            "=$$$$$$$$$$$$$$$$$$$$$=",
            "=*********************=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=$                  *=",
            "=********************=",
            "---------------------",
        ];
        
        add([
            sprite("colabBackground"),
            area(),
            scale(.75),
            z(0)
            
        ])

        const level_config = {
            tileWidth:64,
            tileHeight:64,
            pos: vec2(-65, -70),
        
            // "=": () => [rect(block_size, block_size), color(255, 0, 0), area(), "wall"],
            tiles: {
                "=": () => [
                    rect(block_size*2, block_size),
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
                    rect(block_size*2, block_size*2),
                    color(128,128,128),
                    area(),
                    body({isStatic: true}),
                    pos(0, 25),
                    z(1),

                ],
                "*":()=>[
                    rect(block_size*2, block_size*2),
                    color(128,128,128),
                    area(),
                    body({isStatic: true}),
                    pos(0, 25),
                    z(10),
                ],
                
                
                // "(":drawer,
                
            }
        };

        var level = addLevel(map, level_config);
        
    }

    play(){

// ! Game Objects
    const cricut = add([
        "machine",
        "cricut",
        sprite("cricut"),
        area(),
        // color(50, 168, 82),
        pos(460, 730),
        z(10),
        scale(2.5),
        rotate(180),
        body({isStatic: true}),
        {access: false},
        {buildNoBlueprint: false}

    ])
    const block_size = 64;

    const cdrawer = add([
        rect(block_size*1.5, 12),
        color(46, 51, 48),
        area(),
        body({isStatic: true}),
        pos(600, 650),
        z(0),
        "cdrawer",
        {access: false}
    ])
    const drawer = add([
        rect(12, block_size*1.5),
        color(46, 51, 48),
        area(),
        body({isStatic: true}),
        pos(60, 400),
        z(0),
        "drawer",
        {access: false}
    ])

    const handTools = add([
        rect(block_size*2, block_size*5),
        color(46, 51, 48),
        area(),
        body({isStatic: true}),
        pos(300,225),
        z(0),
        "handTools",
        {access: false}
    ])
    // const leatherTools = add([
    //     rect(block_size*2, block_size*5),
    //     color(46, 51, 48),
    //     area(),
    //     body({isStatic: true}),
    //     pos(600,225),
    //     z(0),
    //     "leatherTools",
    //     {access: false}
    // ])
    const craftingTable = add([
        rect(block_size*2, block_size*5),
        color(46, 51, 48),
        area(),
        body({isStatic: true}),
        pos(900,225),
        z(0),
        "craftingTable",
        {access: false}
    ])
    const printer1 = add([
        rect(block_size*.75, block_size*.75),
        color(46, 51, 48),
        area(),
        body({isStatic: true}),
        pos(20,100),
        z(0),
        "printer",
        {access: false}
    ])
    const printer2 = add([
        rect(block_size*.75, block_size*.75),
        color(46, 51, 48),
        area(),
        body({isStatic: true}),
        pos(20,200),
        z(0),
        "printer",
        {access: false}
    ])
    const sewingMachine = add([
        rect(block_size*.75, block_size*.75),
        color(255,0,0),
        area(),
        body({isStatic: true}),
        pos(500, 650),
        z(0),
        "printer",
        {access: false}
    ])
    const solderingStation = add([
        rect(block_size*.75, block_size*.75),
        color(255,0,0),
        area(),
        body({isStatic: true}),
        pos(100, 35),
        z(0),
        "printer",
        {access: false}
    ])


        // add creates game object to be displayed on the screen
        // add function returns game objects, can store in const or var
    

    const player = add([
        sprite("characterSprite"),
        scale(.25),
        pos(center()),
        "player",
        area(),
        body(),
        z(5)
    ])

        let SPEED = 300;

// isColliding(o: GameObj) => boolean
// If is currently colliding with another game obj.

// !TO FIX:
// -if collide into drawer then into printer, both alerts show
//* Constructor
    // Drawer functionality
    drawer.access = false;
    // Machine functionlaity
    cricut.access = false;
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
    cdrawer.access = false;
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
    if(cdrawer.access){
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
                    cdrawer.access = false;
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
    if(drawer.access){
            
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
                drawer.access = false;
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
            console.log("Added")

            add(
                [sprite(`${image}`),
                    pos(center().x+xDisplace, center().y),
                scale(1.5),
                body(),
                area(),
                z(10),
                "material",
                // "main"
                `${image}`])
                
        }
        // const material1 = add([
        //     pos(300,300),
        //     rect(50, 50),
        //     outline(4),
        //     color(102, 178, 225),
        //     area(),
        //     body(),
        //     z(10),
        //     {'type': 'category1'},
        //     "main",
        //     "material",
        // ]);
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

//! Collide Logic: Player and Machine
onCollide("player", "machine", (s,w) =>{
    cricut.access = true;
})

onCollide("player", "cricut", (s,w) =>{
    cricut.access = true;

})

// Collide Logic: Player and Drawer
onCollide("player", "drawer", (s, w) => {
    drawer.access = true;



  });

  onCollide("player", "cdrawer", (s, w) => {
    cdrawer.access = true;
  });


//*isColliding
  player.onUpdate(() =>{

    if(player.isColliding("cricut")){
        cricut.access = true;
    }
    if(player.isColliding("paper")){
        paperCraft = true;
    }
    if(player.isColliding("scissors")){
        scissorsCraft = true;
    }
})

    // !INVENTORY

    let isPopupVisible = false;
    let vendingContents = [];
    let inPocket = [];
    
    // vending machine
    // !TO DO: Add stationery vending machine back if wanted
    // const vending = add([ 
    //     pos(30, 50),
    //     rect(50, 100),
    //     outline(4),
    //     color(105, 105, 105),
    //     area(),
    //     body({ isStatic: true }),
    //     "vend",
    //     z(0),
    // ]);
    
    // Character pocket
    const pocket = add([
        // pos(1300, 600),
        pos(1080,520),
        rect(200, 200),
        outline(4),
        color(0, 5, 0),
        area(),
        body({ isStatic: true }),
        "pocket",
        z(0),
    ]);
    
    // character 
    // const player = add([
    //     pos(150, 150),
    //     rect(100, 100),
    //     outline(4),
    //     color(220, 20, 60),
    //     area(),
    //     body(),
    //     "player",
    // ]);
    
    // material #1
    const material1 = add([
        pos(300,300),
        rect(50, 50),
        outline(4),
        color(102, 178, 225),
        area(),
        body(),
        z(10),
        {'type': 'category1'},
        "main",
        "material",
    ]);
    
    // material #2
    let material2 = add([
        pos(300,600),
        rect(50, 50),
        outline(4),
        color(153, 153, 225),
        area(),
        body(),
        z(10),
        "main",
        "material",
        {'type': 'category2'},
    ]);
    
    // material #3
    let material3 = add([
        pos(300,50),
        rect(50, 50),
        outline(4),
        color(255, 178, 102),
        area(),
        body(),
        z(10),
        {'type': 'category3'},
        "material",
    ]);
    
    // // onKeyDown() registers an event that runs every frame as long as the user is holding a certain key
    // onKeyDown("left", () => {
    //     player.move(-SPEED, 0);
    // });
    
    // onKeyDown("right", () => {
    //     player.move(SPEED, 0);
    // });
    
    // onKeyDown("up", () => {
    //     player.move(0, -SPEED);
    // });
    
    // onKeyDown("down", () => {
    //     player.move(0, SPEED);
    // });
    
    function showVendingContents(contents) {
        const popup = add([
            rect(500, 600),
            pos(480-5, 125),
            z(10),
            color(105, 105, 105),
            outline(4),
            scale(.75),
            "vending",
        ]);
    
        const startX = popup.pos.x + 75;
        const startY = popup.pos.y + 50;
        const maxLineHeight = 40;
        let currentX = startX;
        let currentY = startY;
    
        for (let i = 0; i < contents.length; i++) {
            const item = contents[i];
    
            if (currentX + item.width > popup.pos.x + popup.width - 50) {
                currentX = startX;
                currentY += maxLineHeight + 50;
            }
    
            const vendingItem = add([
                rect(item.width, item.height) ,
                pos(currentX, currentY),
                z(11),
                color(item.color.r, item.color.g, item.color.b),
                "vending"
            ]);
    
            onClick(() => {
                // Check if the mouse click occurred within the bounds of itemEntity
                if (isClicked(vendingItem)) {
                    // Handle click events on items by calling the updatePocket function
                    console.log("CALLED")
                    updatePocketVending(vendingItem, inPocket);
                }
            });
    
            currentX += item.width + 50;
        }
    
        isPopupVisible = true;
    }
    function getDistance(x1, y1, x2, y2){
        let x = x2 - x1;
        let y = y2 - y1;
        
        return Math.sqrt(x * x + y * y);
    }
    // Function to check if the mouse click occurred within the bounds of an entity
    function isClicked(item) {
        let distance = (getDistance(mousePos().x, mousePos().y, item.pos.x, item.pos.y))
        return (distance <= 55)
    }
    
    let itemsInPocket = 0;
    
    function updatePocketVending(material, inPocket){
        if (itemsInPocket < 2) {
            console.log("Passed 1")
            if (itemsInPocket === 0) {
            console.log("Passed 2")

                const item1 = add([
                    rect(material.width, material.height) ,
                    pos(1100, 540),
                    z(11),
                    color(material.color.r, material.color.g, material.color.b),
               
                ]);
                inPocket.push(item1);
            console.log("Passed 3")

            } else {
            console.log("Passed 4")

                const item2 = add([
                    rect(material.width, material.height) ,
                    pos(1100, 640),
                    z(11),
                    color(material.color.r, material.color.g, material.color.b),
                ]);
                inPocket.push(item2)
            }
            itemsInPocket++;
           
        } else {
            // shake(5);
            alert("Remove items from pocket to select from vending machine")
        }
    
    }
    
    function updatePocket(material, inPocket) {
        if (itemsInPocket < 2) {
            if (itemsInPocket === 0) {
                material.moveTo(1100, 540);
            } else {
                // moves to spot 2
                material.moveTo(1100, 640);
            }
            itemsInPocket++;
            inPocket.push(material);
        } else {
            destroy(material);
        }
    }
    
    // backpack functionality
    onKeyPress("v", () => {
        if (isPopupVisible) {
            destroyAll("vending");
            isPopupVisible = false;
            SPEED = 300;
        } else {
            console.log("here")
            showVendingContents(vendingContents);
            isPopupVisible = true;
            SPEED = 0;
        }
    });
    
    player.onCollide("material", (material) => {
        console.log("COLLIDED MAT")
        if (!vendingContents.includes(material)) {
            vendingContents.push(material);
        }
        updatePocket(material, inPocket);
        material.use(body({ isStatic: true }));
    });
    
    
    onKeyPress("q", () => {
        console.log(inPocket)
        if (itemsInPocket !== 0) {
            itemsInPocket--;
            let item = inPocket.pop();
            destroy(item);
        }
    });
    

    }


    
}
   


export const characterMovement = new CharacterMovement()