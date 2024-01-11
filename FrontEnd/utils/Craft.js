import { getSpeed, setSpeed } from './Player.js';
export function checkCraftable(toolState, inventoryState) {
    console.log("CHECK", toolState.toolAccess &&
    // tableItems.includes("paper") &&
    inventoryState.tableItems.length >= 1 &&
    !inventoryState.isPopupVisible)
    if (
      toolState.toolAccess &&
      // tableItems.includes("paper") &&
      inventoryState.tableItems.length >= 1 &&
      !inventoryState.isPopupVisible
    ) {
      inventoryState.isCraftable = true;
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
        inventoryState.finalCraftCheck = true;
    }
    if (!toolState.toolAccess || inventoryState.isPopupVisible) {
      destroyAll("craft");
    }
  }