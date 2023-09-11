class CharacterMovement{

    
    display(){
        // add creates game object to be displayed on the screen
        // add function returns game objects, can store in const or var
        add([
            sprite("characterSprite"),
            scale(.85),
        ])
        add([
            sprite("colablogo"),
            // area component will create a hitbox over the game object
            // will also enable anchor component
            area(),
            anchor("center"),
            // moves logo up
            pos(center().x, center().y-200),
            scale(.75),
        ])
        
    }

    
    
}

export const characterMovement = new CharacterMovement()