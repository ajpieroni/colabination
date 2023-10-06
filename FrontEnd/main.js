import kaboom from "./libs/unpkg.com_kaboom@3000.1.1_dist_kaboom.mjs"
import { uiManager } from "./utils/UIManager.js"
import { load } from "./utils/loader.js"
import { characterMovement } from "./utils/CharacterMovement.js"

kaboom({
    width: 1280,
    height: 720,
    letterbox: true,
    
})
onLoad(() => {
    fetch("http://localhost:8081/items")
      .then((response) => response.json())
      .then((foundItems) => {
        console.log(foundItems);
        go("menu", foundItems);
        
      })
      .catch((error) => console.error("Error fetching found items:", error));
  });

load.assets()

const scenes = {
    menu: () =>{
        onLoad(() => {
            fetch("http://localhost:8081/items")
              .then((response) => response.json())
              .then((foundItems) => {
                console.log(foundItems);
                go("menu", foundItems);
                
              })
              .catch((error) => console.error("Error fetching found items:", error));
          });
        
        // add takes in an array of components
        // add([text("test"), pos(500, 500), color(0,0,0)])
        uiManager.displayMainMenu()
    },
    characterMovement: () =>{

        characterMovement.display()
        characterMovement.play()

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

// initalize scenes

for (const key in scenes){
    scene(key, scenes[key])
}

go("menu")