class CharacterMovement{

    
    display(){
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
            text("Press arrow keys or click to move!", { width: width() / 4 }),
            pos(12, 12),
            color(1,1,1)
        ])
        const player = add([
            sprite("characterSprite"),
            scale(.25),
            pos(center(
                
            )),    // center() returns the center point vec2(width() / 2, height() / 2)
            area(),
            body()
        ])
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
        const block_size = 64;
        
        const SPEED = 300;
        const map = [
            "=====================",
            "=                    =",
            "=                    =",
            "=                    =",
            "=                    =",
            "=                    =",
            "=                    =",
            "=                    =",
            "=                    =",
            "=                    =",
            "=                    =",
            "=                    =",
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
                    pos(0, 25)
                ],
            }
        };
        
        var level = addLevel(map, level_config);

        }
    
        
    }
   
    


export const characterMovement = new CharacterMovement()