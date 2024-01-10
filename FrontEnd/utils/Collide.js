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
          state.SPEED = 300; 
        } else {
          showFinalItems(); 
          state.isDocVisible = true; 
          state.SPEED = 0; 
        }
      });
    }
  }
  