class CharacterMovement{

    display(){

// isColliding(o: GameObj) => boolean
// If is currently colliding with another game obj.

    // Drawer functionality
    this.canInteractWithDrawer = false;

    // Machine functionlaity
    this.canInteractWithCricut = false;
    let cricutAlertBox = null; 
    let hasUnlockedCricut = false;

    // PLA Logic
    this.isAlertedPLA = false;
    this.hasFoundPLA = false;
    let PLAalertBox = false;
    let noItemsAlert = null;
    // Paper Drawer Logic
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
    
    let myCDrawer = ["paper","scissors"];
    const myCDrawerData = {
        scissors: {alertBox: null, hasFound: false},
        paper: {alertBox: null, hasFound: false},
    };
    let myDrawer = ["PLA"];
    const myDrawerData = {
        PLA: {alertBox: null, hasFound: false},
    }

    // let cdrawerItems = ["", "banana", "cherry"];



//! Listen for spacebar key press, when near drawer activate alert
    onKeyDown("space", () => {
        //! DRAWERS 
        //* Cricut Drawer: Scissors, Paper

        if(this.canInteractWithCDrawer){
            if(myCDrawer.length > 0 && canPopItem){
                const itemName = myCDrawer.pop();
                const foundCItem = myCDrawerData[itemName];
                console.log(foundCItem);

                // console.log("item", item)
                canPopItem = false;
                if(foundCItem.alertBox === null && !foundCItem.hasFound){
                    console.log("item name: ", itemName);
                    console.log("item alert", foundCItem.alertBox)
                    foundCItem.alertBox = add([
                        area(),
                        "alert",
                        pos(center().x - 100, center().y - 200),
                        color(230, 230, 250),
                        sprite("scissorsAlert"),
                        color(230, 230, 250),
                        z(10),
                        scale(0.25)
                    ]);
                    // myCDrawer.pop();
                    console.log(myCDrawer);
                    this.canInteractWithCDrawer = true;
                    foundCItem.alertBox = true;
                    foundCItem.hasFound = true;
    
                }
            } 
        }else{
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
        //* Printing Drawer: PLA Plastic, (Pliers)

        if(this.canInteractWithDrawer){
            if(myDrawer.length > 0 && canPopItem){
                const itemName = myDrawer.pop();
                const foundItem = myDrawerData[itemName];
                console.log(foundItem);

                // console.log("item", item)
                canPopItem = false;
                if(foundItem.alertBox === null && !foundItem.hasFound){
                    console.log("item would print here")
                    console.log("item name: ", itemName);
                    console.log("item alert", foundItem.alertBox)
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

        // !Machines
        //* Cricut   

        if(this.canInteractWithCricut && !hasUnlockedCricut){
            cricutAlertBox = add([
                area(),
                "alert",
                pos(center().x - 100, center().y - 200),
                color(230, 230, 250),
                z(10),
                sprite("cricutAlertBox"),
                scale(0.75)
            ]);
            this.isAlertedPLA = true;
            this.canInteractWithCricut = false;

        }
       
    });

    // dismiss alerts
    onKeyDown("enter", () => {
            
            destroyAll("alert");
            canPopItem = true;

        const scissorsObject = myCDrawerData.scissors;
        if (scissorsObject.alertBox !== null) {
            if(scissorsObject.hasFound){
                add(
                    [sprite("scissors"),
                     pos(1000,600),
                    scale(1.5),
                z(15)])
            }
            // Accessing the scissors object

            scissorsObject.hasFound = true;
        }
 
        if(this.isAlertedPLA && noItemsAlert !== null){
            destroy(noItemsAlert);
            // noItemsAlert = null;
            // noItems = null;
        }

        if(this.isAlertedPLA && cricutAlertBox !== null){
            console.log("passed, 88; cricutAlertBox", cricutAlertBox)
            destroy(cricutAlertBox);
            console.log("after destory, machine", cricutAlertBox)
            cricutAlertBox = null;
        }

    });
// ! Game Objects
    // this is material one?
    const cricut = add([
        "machine",
        sprite("cricut"),
        area(),
        // color(50, 168, 82),
        pos(560, 730),
        z(10),
        scale(2.5),
        rotate(180),
        body({isStatic: true}),
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
            body()
        ])
       
// Player Movement
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
    this.canInteractWithCricut = true;
})

// Collide Logic: Player and Drawer
onCollide("player", "drawer", (s, w) => {
    this.canInteractWithDrawer = true;

  });

  onCollide("player", "cdrawer", (s, w) => {
    this.canInteractWithCDrawer = true;
  });
  player.onUpdate(() =>{
    
    
  if(player.isColliding("drawer")){
    this.canInteractWithDrawer = true;
    console.log("Hit Drawer")
  }
  if(player.isColliding("cdrawer")){
    this.canInteractWithCDrawer = true;
    console.log("Hit CDrawer")
  }
})

// Level Schema
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

        // const drawer = add([
        //     rect(block_size, block_size*1.5),
        //     color(50, 168, 82),
        //     area(),
        //     body({isStatic: true}),
        //     pos(10, 55),
        //     z(0),
        //     "drawer",
        // ]);
        
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