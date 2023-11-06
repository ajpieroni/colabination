class UIManager{
    

    displayBlinkingUIMessage(content, position){
        // PARAMS:
    // content is the message we want to display
    // position is position of msg
        const message = add([
            text(content, {
                // optional object
                size: 24,
                color: (0,0,0),
                // can specify font here,
            }),
            area(),
            anchor("center"),
            pos(position),
            opacity(),
            // first param of state is default
            state("flash-up", ["flash-up", "flash-down"])

        ])

        
// kaboom event listeners (key, funciton)
        onKeyPress("enter", () => {
            go("characterMovement");
        });

        message.onStateEnter("flash-up", async () =>{
            // tweening: a component that allows you to gradually change the value from x to y
            // ex. fde, animation, etc.

            // use await since we want to the tween to ahppen before we move on from anythign else
            // aka wait for tween to finish

            // function, final, time

            await tween(message.opacity, 
                0, 
                0.5, 
                (nextOpacityValue) => message.opacity = (nextOpacityValue),
                easings.linear)
                message.enterState("flash-down")


        })
        // same but in reverse
        message.onStateEnter("flash-down", async () =>{
           
            await tween(message.opacity, 
                1, 
                0.5, 
                (nextOpacityValue) => message.opacity = (nextOpacityValue),
                easings.linear)
                message.enterState("flash-up")


        })


    }

    displayMainMenu(){
        // add creates game object to be displayed on the screen
        // add function returns game objects, can store in const or var
        add([
            sprite("colabdoors"),
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
        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Start Game",
            // kaboom, offers ability to make vec2
            vec2(center().x, center().y + 100)
        )
    }

    
    
}

export const uiManager = new UIManager()