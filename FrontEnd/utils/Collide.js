import { checkCraftable } from "./Craft.js";
import { setSpeed } from "./Player.js";
export function handleCollideDocumentationStation(state, showFinalItems) {
    state.canAccessDocumentation = true;
  
    add([
      text("Documentation Station", { size: 16 }),
      pos(700, 100 - 18),
      color(242, 140, 40),
      z(49),
      "interactable",
    ]);
  
    if (!state.eventListenerAttached) {
      state.eventListenerAttached = true;
  
      onKeyPress("enter", () => {
        if (!state.canAccessDocumentation) return;
  
        if (state.isDocVisible) {
          destroyAll("final"); 
          state.isDocVisible = false; 
          setSpeed(300);
        } else {
          showFinalItems(); 
          state.isDocVisible = true; 
          setSpeed(0);
        }
      });
    }
  }
  
export function onToolCollide(craftState, toolState, inventoryState, s, w){
  inventoryState.finalCraftCheck = true;
      console.log(w.toolKey);
      toolState.currToolY = w.pos.y;
      toolState.currentTool = w;
      toolState.toolAccess = true;
      console.log("here is toolState", toolState)

      let toolDisplay = toolState.currentTool.toolKey
        // space
        .replace(/([A-Z])/g, " $1")
        //trim
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      // checkCraftable(toolState, inventoryState);

      add([
        text(toolDisplay, { size: 16 }),
        pos(w.pos.x, toolState.currToolY - 18),
        color(242, 140, 40),
        z(49),
        "interactable",
      ]);
      add([
        "craft",
        text("Craft?", {
          // optional object
          size: 36,
          outline: 4,
          color: (0, 0, 0),
          // can specify font here,
        }),
        area(),
        anchor("center"),
        pos(500, 500),
        z(20),
        // scale(.5)
      ]);
      craftState.craftSelected = true;
}

export function onToolCollideEnd(toolState, inventoryState){
  toolState.toolAccess = false;
  toolState.currentTool = "";
  destroyAll("interactable");
  checkCraftable(toolState, inventoryState);
}