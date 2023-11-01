import kaboom from "./libs/unpkg.com_kaboom@3000.1.1_dist_kaboom.mjs"
import { uiManager } from "./utils/UIManager.js"
import { load } from "./utils/loader.js"
import { characterMovement } from "./utils/CharacterMovement.js"
import { settings } from "./utils/settings.js"

kaboom({
    width: 2048/2,
    height: 1668/2,
    letterbox: true,
    
})

// let testValue = settings.changeSettings();
let soundSettings = settings.changeSettings();
console.log(soundSettings);



load.assets()

const scenes = {
    
    menu: () =>{
        // add takes in an array of components
        add([text("test"), pos(500, 500), color(0,0,0)])
        uiManager.displayMainMenu()
        
    },
    // characterMovement: () =>{

    //     characterMovement.display(soundSettings)
    //     characterMovement.play()
        

    // },
    settings: () =>{
        settings.displaySettingsMenu()
    }, 
    1: () => {

    },
    2: () =>{

    },
    3: ()=>{

    },
    gameover: () => {

    },
    end: () =>{

    }
}

// anni's game
scene('characterMovement', ({ testValue }) => {
    add([text(`Till Next Time! The score is ${testValue.testValue}!`, {
        size: 36,
        align: "center"
    }), pos(50, 50)])
    add([text("Press Space Bar to Play Again", {
        size: 36,
        align: "center"
    }), pos(50, 150)])
    // onKeyDown('space', () => {
    //     go('game', defaultGame)
    // })
})

// initalize scenes

for (const key in scenes){
    scene(key, scenes[key])
}

go("menu")