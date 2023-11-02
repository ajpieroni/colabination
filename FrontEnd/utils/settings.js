class Settings{
  constructor() {
    this.testValue = 0;
    this.soundTog = 1;
    this.audio = { volume: this.soundTog };
}

    // !SETTINGS DISPLAY
    displaySettingsMenu() {
    this.soundTog = .5;

      let arrowX= (1024 - 240)/2;
      let arrowY = 215;
      let index = 0;
  
      // let soundTog = 0;
  
      // Arrow settings
      const arrowSelect = 
      add([
        rect(240,50),
        pos(arrowX, arrowY),
        color(255),
        z(1),
        {posX: arrowX,
        posY: arrowY}
      ])
  
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
        // volume: 0.5,
        volume: 0,
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
      ])
  
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
        text("Sounds:on"), 
        pos((1024 - 195)/2, 375),
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
              "exitBox",
              {posX: exitNx,
              posY: exitNy}
            ])
  
            onKeyPress("left", () => {
              let exitNTemp = exitN;
  
              if(exitN == 1){
                exitNx = exitNx - 115;
                exitArrowSelect.moveTo(exitNx, exitNy);
                exitN = 0;
              }else if (exitN == -1 || exitN == 0) {
                exitN = exitNTemp;
              }
            });
  
            onKeyPress("right", () => {
              let exitNTemp = exitN;
  
              if(exitN == 0 || exitN == -1){
                exitNx = exitNx + 115;
                exitArrowSelect.moveTo(exitNx, exitNy)
                exitN = 1;
              }else{
                exitN = exitNTemp;
  
              }
            });
  
          onKeyPress("enter", () => {
              
            if(exitN == 0 ){
              console.log("cancel:", exitN);
              destroyAll("exitPopUp"),
              destroyAll("cancelExit"),
              destroyAll("exitfr"),
              destroyAll("exitBox")
              exitN = -1;
            } else if (exitN == 1 ){
              console.log("exitfr:", exitN);
                go("characterMovement");
            }
          })
  
        }
  
        
        // controls
        if(index == -2){
          console.log("here are controls!"),
          go("controls")
        }
  
  
  
  
  
  
        // sounds
        if(index==-3){
          console.log("here are sounds");
          // overlay.classList.toggle("show"),
  
          if(this.soundTog == 1){
            soundsBtn.text = "Sounds:off",
            soundsBtn.pos = vec2((1024 - 215)/2, 375),
            this.soundTog = 0,
            this.audio.volume = this.soundTog;
            console.log("sounds: ", this.soundTog)  
            this.changeSettings(this.soundTog)
            
          } else  {
            soundsBtn.text = "Sounds:on",
            soundsBtn.pos = vec2((1024 - 195)/2, 375),
            this.soundTog = 1,
            this.audio.volume = this.soundTog;
            console.log("sounds: ", this.soundTog)
            this.changeSettings(this.soundTog)
          }
        }
      //about us 
      if(index == -4){
        console.log("here are developers!"),
        go("aboutUs")
      }
  
      
      }
        
      );
  
        
      
        
        
  
     
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
  
      function exit() {}
      // Save function
      function save() {}
  
      // Exit menu
      onKeyPress("m", () => {
        music.paused = true;
        this.testValue += 5;

        go("characterMovement", { testValue: this.testValue});
      });

    };
    // !CONTROLS DISPLAY
     //for controls page
  displayControls() {
    add([
      sprite("coolBG"), 
      scale(1.4)
    ]);

    add([
      rect(600, 400),
      // z(1),
      pos((1024 - 600)/2, 200),
      color(255, 255, 255),
      opacity(0.5), 
      outline(6, rgb(255, 255, 255)),
      "box",
      area(),
    ])

    add([
      text("Controls"), 
      pos((1024 - 140)/2, 225),
      color(70, 70, 70),  
      area(),
      z(2)
    ]); 
    
    add([
      text("Move -------- WASD/Arrow Keys", {
        size: 24,
        width: 450
      }), 
      pos((1024 - 450)/2, 300),
      color(70, 70, 70),  
      area(),
      z(2)
    ]);
    add([
      text("Menu ---------------------- M", {
        size: 24,
        width: 450
      }), 
      pos((1024 - 450)/2, 350),
      color(70, 70, 70),  
      area(),
      z(2)
    ]);
    
    // text("Move            WASD/Arrow Keys", {
    //   size: 18, // 48 pixels tall
    //   // width: 320, // it'll wrap to next line when width exceeds this value
    //   // font: "sans-serif", // specify any font you loaded or browser built-in
    // })
    onKeyPress("m", () => {
      
      go("settings");
    });
  };
  // !DISPLAY DEV
  displayAboutUs() {
    add([
      sprite("mountains"), 
      scale(0.85)
    ]);
    
    add([
      sprite("Alex"), 
      pos(-60,350),
      scale(6.5),
      z(2)
    ]);
    add([
      sprite("Olly"), 
      pos(120,350),
      scale(6.5),
      z(2)
    ]);
    add([
      sprite("Kelvin"), 
      pos(300,350),
      scale(6.5),
      z(2)
    ]);
    add([
      sprite("Dasol"), 
      pos(480,350),
      scale(6.5),
      z(2)
    ]);
    add([
      sprite("Sophia"), 
      pos(660,350),
      scale(6.5),
      z(2)
    ]);

    let devIndex = 0;
    let devIndexX = -60;
    if (devIndex == 0){
      add([
        sprite("AlexGlow"), 
        pos(-60,350),
        scale(6.5),
        z(1),
        "AlexGlow"
      ]);
    } 

    onKeyPress("right", () => {
      let devIndexTemp = devIndex;
      
      if(devIndex<=3){
        devIndex =  devIndex+1;
        
        if (devIndex == 1){
          add([
            sprite("OllyGlow"), 
            pos(120,350),
            scale(6.5),
            z(1),
            "OllyGlow"
          ]),
          destroyAll("AlexGlow")
          
        } else if (devIndex == 2){
          add([
            sprite("KelvinGlow"), 
            pos(300,350),
            scale(6.5),
            z(1),
            "KelvinGlow"
          ]),
          destroyAll("OllyGlow")
        } else if (devIndex == 3){
          add([
            sprite("DasolGlow"), 
            pos(480,350),
            scale(6.5),
            z(1),
            "DasolGlow"
          ]),
          destroyAll("KelvinGlow")
        }  else if (devIndex == 4)
          add([
            sprite("SophiaGlow"), 
            pos(660,350),
            scale(6.5),
            z(1),
            "SophiaGlow"
          ]),
          destroyAll("DasolGlow")

      }else{
        devIndex= devIndexTemp;
      }
    });
    onKeyPress("left", () => {
      let devIndexTemp = devIndex;
      
      if(devIndex>=1){
        devIndex =  devIndex-1;
        
        if (devIndex == 0){
          add([
            sprite("AlexGlow"), 
            pos(-60,350),
            scale(6.5),
            z(1),
            "AlexGlow"
          ]),
          destroyAll("OllyGlow")
          
        } else if (devIndex == 1){
          add([
            sprite("OllyGlow"), 
            pos(120,350),
            scale(6.5),
            z(1),
            "OllyGlow"
          ]),
          destroyAll("KelvinGlow")

        } else if (devIndex == 2){
          add([
            sprite("KelvinGlow"), 
            pos(300,350),
            scale(6.5),
            z(1),
            "KelvinGlow"
          ]),
          destroyAll("DasolGlow")
        } else {
          add([
            sprite("DasolGlow"), 
            pos(480,350),
            scale(6.5),
            z(1),
            "DasolGlow"
          ]),
          destroyAll("SophiaGlow")
        } 
        
      }else{
        devIndex= devIndexTemp;
      }
    });
    onKeyPress("m", () => {
      
      go("settings");
    });
  }
  
  



  changeSettings = (volume) => {
      this.audio.volume = volume;

    // if(volume){
    //   this.audio.volume = volume;

    // }else{
    //   this.audio.volume = 1;

    // }
    let music;
    console.log("here da volume",this.audio.volume);
    if (this.audio.volume !== 0) {
    console.log("not eq 0");

        return music = {
            volume: 0,
            loop: true,
        };
    } else {
    console.log("else");

        return music = {
            volume: 5,
            loop: true,
        };
    }
}

  //for dev page

    
}


export const settings = new Settings();