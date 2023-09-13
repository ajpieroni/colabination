class CharacterMovement{

    display(){
        // Drawer functionality
 // Drawer functionality
this.canInteractWithDrawer = false;
this.isAlerted = false;
let PLAalertBox = null; // Initialize PLAalertBox with null

// Listen for spacebar key press
onKeyDown("space", () => {
    if (this.canInteractWithDrawer && PLAalertBox === null) {
        PLAalertBox = add([
            area(),
            "alert",
            pos(center().x - 100, center().y - 200),
            color(230, 230, 250),
            z(10),
            sprite("PLAalert"),
            scale(0.75)
        ]);
        this.canInteractWithDrawer = false;
        this.isAlerted = true;
    }
});

onKeyDown("enter", () => {
    if (this.isAlerted && PLAalertBox !== null) {
        destroy(PLAalertBox);
        PLAalertBox = null; // Reset PLAalertBox to null after destruction
    }
});


            // 
            // first if alert is open, set boolean of alert on to true
            // if

            // if press enter, and alert is true, then make alert dissapear
          
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
        // this is material one?
        const material1 = add([

            // text() component is similar to sprite() but renders text
            rect(50, 50),
            // text("Hiiiiiii", { width: width() / 4 }),

            area(),
            body(),
            color(50, 168, 82),
            pos(140, 50),
            z(10)
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
        onClick(() => {
            // .moveTo() is provided by pos() component, changes the position
            player.moveTo(mousePos())
        })

// Collide Logic: Player and Drawer
onCollide("player", "drawer", (s, w) => {
    this.canInteractWithDrawer = true;
    // shake(30)
    // const newItemTemplate = add([
    //     rect(50, 50),
    //     area(),
    //     pos(50,0),
    //     color(230,230,250),
    //     z(10)
    // ])

  });
// Level Schema
        const block_size = 64;
        
        const SPEED = 300;
        const map = [
            // "=====================",
            "=$$$$$$$$$$$$$$$$$$$$$=",
            "=*********************=",
            "=$(                   =",
            "=$(                   =",
            "=$(                   =",
            "=$                   =",
            "=$                   =",
            "=$                   =",
            "=$                   =",
            "=$                   =",
            "=$                   =",
            "=$                   =",
            "---------------------",
        ];
        
        const level_config = {
            tileWidth:64,
            tileHeight:64,
            pos: vec2(-65, -65),
        
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
                    color(50, 168, 82),
                    area(),
                    body({isStatic: true}),
                    pos(10, 55),
                    z(0),
                    "drawer",
                ],

                
            }
        };
    
        
        var level = addLevel(map, level_config);
        
        }
    
        
    }
   
    


export const characterMovement = new CharacterMovement()