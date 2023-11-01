class Settings{
    constructor(){
        let testValue = 0;
    }
    displaySettingsMenu = (testValue) =>  {
        // !todo: remove
        testValue = "colabSOCKS"
        console.log(testValue)



        let arrowX= 412;
        let arrowY = 215;
        let index = 0;
    
        // Arrow settings
        const arrowSelect = 
        add([
          rect(200,50),
          pos(arrowX, arrowY),
          color(255),
          z(1),
          {posX: arrowX,
          posY: arrowY}
        ]);
    
        onKeyPress("down", () => {
          let indexTemp = index;
          index = index-1;
          if(index>=-4){
    
          arrowY=50+arrowY;
          arrowSelect.moveTo(arrowX, arrowY);
          }else{
            index=indexTemp;
          }
        });
    
        onKeyPress("up", () => {
          let indexTemp = index;
          index = index+1;
          if(index<=0){
            arrowY=arrowY-50;
            arrowSelect.moveTo(arrowX, arrowY)
          }else{
            index=indexTemp;
          }
          
    
    
        });
    
        // !TODO: remove music lmao
    
        let music = play("soundtrack", {
          volume: 0.01,
          loop: true,
        });
    
        // *on key press enter, select that option
    
        let exitCheckPopup = false;
        add([sprite("trees"), scale(0.85)]);
        
    
        // width: 2048/2,
        // height: 1668/2,
        // centering: (width - boxSize)/2
        // let showMenuPopup = false;
        const menuBox = add([
          rect(600, 400),
          // z(1),
          pos((1024 - 600)/2, 200),
          color(255, 255, 255),
          opacity(0.5), 
          outline(6, rgb(255, 255, 255)),
          "menuButton",
          area(),
        ]);
    
        // Save funtion
        const saveBtn = add([
          text("Save"), 
          pos((1024 - 85)/2, 225),
          color(70, 70, 70),  
          "savebutton", 
          area(),
          z(2)
        ]);
    
        // Exit function
        const exitBtn = add([
          text("Exit"),
          pos((1024 - 85)/2, 275),
          color(70, 70, 70),  
          "exitbutton",
          area(),
          z(2)
          // rect(50,50)
        ]);
    
        const controlsBtn = add([
          text("Controls"), 
          pos((1024 - 170)/2, 325),
          color(70, 70, 70),  
          "savebutton", 
          area(),
          z(2)
        ]);
    
        const soundsBtn = add([
          text("Sounds"), 
          pos((1024 - 130)/2, 375),
          color(70, 70, 70),  
          "savebutton", 
          area(),
          z(2)
        ]);
    
        const aboutBtn = add([
          text("About Us"), 
          pos((1024 - 170)/2, 425),
          color(70, 70, 70),  
          "savebutton", 
          area(),
          z(2)
        ]);
    
        onKeyPress("enter", (exit) => {
          console.log("here index:", index);
    
          // save
          if(index ==0){
            console.log("save clicked");
    
            const saveText = add([
              text("Saving in progress..."),
              area(),
              scale(.5),
              color(70, 70, 70),  
              pos((1024 - 230)/2, 500),
    
            ])       
    
            
            setTimeout(function() {
              saveText.text = "Saving complete!",
              saveText.pos = vec2((1024 - 170)/2, 500)
    
              setTimeout(function() { destroy(saveText)}, 750);
            }, 2000);
          }
    
          
          // exit
          if(index == -1){
            console.log("exit clicked");
            const exitCheck = add([
              text("Are you sure you want to exit the game?"),
              "exitPopUp",
              area(),
              scale(.5),
              color(70, 70, 70),  
              z(2),
              pos((1024 - 420)/2, 500)
            ])
    
            const exitCheckN = add([text("Cancel"),
            "cancelExit",
            area(),
            scale(.5),
            color(70, 70, 70), 
            z(2), 
            pos(425, 550)])
            
            const exitCheckY = add([text("Exit"),
            "exitfr",
            area(),
            scale(.5),
            color(70, 70, 70),  
            z(2),
            pos(550, 550)]);
            
    
            let exitNx = 420;
            let exitNy = 545;
            let exitN = -1;
            const exitArrowSelect = 
              add([
                rect(75,25),
                pos(420,545),
                color(255),
                z(1),
                {posX: exitNx,
                posY: exitNy}
              ])
    
              onKeyPress("left", () => {
                let exitNTemp = exitN;
                if(exitN == -1){
                  exitN = 0;
                } else if(exitN == 1){
                  exitNx = exitNx - 115;
                  exitArrowSelect.moveTo(exitNx, exitNy);
                  exitN = 0;
                }else{
                  exitN = exitNTemp;
    
                }
              });
    
              onKeyPress("right", () => {
                let exitNTemp = exitN;
    
                if(exitN == -1){
                  exitN = 1;
                } else if(exitN == 0){
                  exitNx = exitNx + 115;
                  exitArrowSelect.moveTo(exitNx, exitNy)
                  exitN = 1;
                }else{
                  exitN = exitNTemp;
    
                }
              });
    
            onKeyPress("enter", () => {
    
                
              if(exitN == 0){
                console.log("cancel:", exitN);
                destroy(exitCheck),
                destroy(exitCheckN),
                destroy(exitCheckY)
              } else if (exitN == 1 ){
                console.log("exitfr:", exitN);
                  go("characterMovement");
              }
            })
    
          }
    
          
          // controls
          if(index == -2){
            console.log("here are controls!")
          }
          // sounds
          if(index==-3){
            console.log("here are sounds")
          }});
        
        // // onClick("cancelExit", (cancelExit) => 
        // onKeyPress("enter", () => {
        //   destroyAll("exitPopUp"),
        //   destroyAll("cancelExit"),
        //   destroyAll("exitfr")
        // })
      
        // // onClick("exitfr", (exitfr) => 
        // onKeyPress("enter", () => {
        //   destroyAll("exitPopUp"),
        //   destroyAll("cancelExit"),
        //   destroyAll("exitfr"),
        //   music.paused = true;
        //   go("characterMovement");
        // })
        //  add[(text("POPUP"),
        // pos(800, 150),
        // "popup",
        // )}
        // rect(50,50))])};
        // onClick("savebutton", (save) => );
    
        // function exit() {}
        // // Save function
        // function save() {}
    
        // Exit menu
        onKeyPress("m", () => {
          music.paused = true;
          this.testValue += 5;

          go("characterMovement", { testValue: this.testValue});
        });
      };



    changeSettings = () =>{

        // audio settings
        let music = {
            volume: .05,
            loop: true,
        }
        // onKeyPress("x", () =>{
        //     music.detune = -1000;
        // })
        console.log("here's music in settings:", music)
        // return "colabJOCKS"
        return music;
    }
    
}


export const settings = new Settings();