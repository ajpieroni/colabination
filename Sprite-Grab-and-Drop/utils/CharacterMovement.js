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
    this.isAlerted = false;
    this.hasFoundPLA = false;
    let PLAalertBox = null;
    let noItemsAlert = null;
    

//! Listen for spacebar key press, when near drawer activate alert
    onKeyDown("space", () => {
        if (this.canInteractWithDrawer && PLAalertBox === null && !this.hasFoundPLA) {
            // console.log("15: Passed");
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
            this.isAlerted = true;
            this.hasFoundPLA = true;

        }
        

        if(this.hasFoundPLA && this.canInteractWithDrawer){
            noItemsAlert = add([
                area(),
                "alert",
                pos(center().x - 100, center().y - 200),
                color(230, 230, 250),
                z(10),
                sprite("noItems"),
                scale(0.45)
            ]);
            this.canInteractWithDrawer = false;
            this.isAlerted = true;
            this.hasFoundPLA = true;
        }  

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
            this.isAlerted = true;
            this.canInteractWithCricut = false;

        }
        if(this.canInteractWithCricut)
    });

    // dismiss alerts
    onKeyDown("enter", () => {
        // console.log("pressed, 74", cricutAlertBox)
        if (this.isAlerted && PLAalertBox !== null) {
            destroy(PLAalertBox);
            this.hasFoundPLA = true;
        }
 
        if(this.isAlerted && noItemsAlert !== null){
            destroy(noItemsAlert);
            // noItemsAlert = null;
            // noItems = null;
        }

        if(this.isAlerted && cricutAlertBox !== null){
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

            // area component will create a hitbox over the game object
            // will also enable anchor component
            area(),
            // color(1, 1, 1, 0.2),
            // anchor("center"),
            // moves logo up
            // pos(center().x, center().y-200),
            scale(.75),
            
        ])
        
        add([
            // text() component is similar to sprite() but renders text
            text("Hiiiiiii", { width: width() / 4 }),
            pos(12, 12),
            color(1,1,1)
        ])
        const player = add([
            sprite("characterSprite"),
            scale(.25),
            pos(center(
                
            )),    // center() returns the center point vec2(width() / 2, height() / 2)
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
        // onClick(() => {
        //     // .moveTo() is provided by pos() component, changes the position
        //     player.moveTo(mousePos())
        // })
// Collide Logic: Player and Machine
onCollide("player", "machine", (s,w) =>{
    this.canInteractWithCricut = true;
})
// Collide Logic: Player and Drawer
onCollide("player", "drawer", (s, w) => {
    this.canInteractWithDrawer = true;
    // console.log("157: Passed");
    // shake(30)
    // const newItemTemplate = add([
    //     rect(50, 50),
    //     area(),
    //     pos(50,0),
    //     color(230,230,250),
    //     z(10)
    // ])

  });
  player.onUpdate(() =>{
    
  if(player.isColliding("drawer")){
    this.canInteractWithDrawer = true;
  }
})
// Level Schema
        const block_size = 64;
        
        const SPEED = 300;
        const map = [
            // "=====================",
            "=$$$$$$$$$$$$$$$$$$$$$=",
            "=*********************=",
            "=$                   =",
            "=$                   =",
            "=$                   =",
            "=$                   =",
            "=$(                  =",
            "=$(                  =",
            "=$                   =",
            "=$                   =",
            "=$                   =",
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
                    color(128,128,128),
                    area(),
                    body({isStatic: true}),
                    pos(0, 25),
                    z(1),
                ]
                // "(":drawer,
                
            }
        };
    
        
        var level = addLevel(map, level_config);
        
        }
    
        
    }
   
    


export const characterMovement = new CharacterMovement()