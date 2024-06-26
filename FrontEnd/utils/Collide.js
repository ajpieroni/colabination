import { checkCraftable } from "./Craft.js";
import { setSpeed } from "./Player.js";
import { showFinalItems } from "./DocuStation.js";
export function handleCollideDocumentationStation(
  state,
  showFinalItems,
  inventoryState,
  craftState
) {
  state.canAccessDocumentation = true;

  // Add Documentation Station Text
  add([
    text("Documentation Station", { size: 16 }),
    pos(700, 100 - 18),
    color(242, 140, 40),
    z(49),
    "interactable",
  ]);

  if (!state.eventListenerAttached) {
    state.eventListenerAttached = true;

    // Event Listener for 'enter' key
    onKeyPress("enter", () => {
      if (!state.canAccessDocumentation) return;

      if (!state.isDocVisible) {
        showFinalItems(inventoryState, craftState);
        state.isDocVisible = true;
        setSpeed(0);
      }
    });

    // Event Listener for 'escape' key
    onKeyPress("backspace", () => {
      if (state.isDocVisible) {
        destroyAll("final");
        state.isDocVisible = false;
        setSpeed(300);
      }
    });
  }
}

export function handleCollideDocumentationStationEnd(state, inventoryState) {
  state.canAccessDocumentation = false;
  state.isDocVisible = false;
  destroyAll("interactable");
}

function getCombinableItemKeys(toolId, craftState) {
  return fetch(`http://localhost:8081/tools/${toolId}/combinable_items`)
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching combinable items:", error));
}

export function onToolCollide(craftState, toolState, inventoryState, s, w) {
  inventoryState.finalCraftCheck = true;
  // console.log(w.toolKey);
  toolState.currToolY = w.pos.y;
  toolState.currentTool = w;
  toolState.toolAccess = true;
  // console.log(toolState.currentTool.toolId);
  // console.log(craftState.combinable)
  getCombinableItemKeys(toolState.currentTool.toolId, craftState).then((data) => {
    if (!craftState.combinable) {
      craftState.combinable = {};
    }
    craftState.combinable[toolState.currentTool.toolId] = data;
  });

  let toolDisplay = toolState.currentTool.toolKey
    // space
    .replace(/([A-Z])/g, " $1")
    //trim
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  if (toolDisplay === "Printer1" || toolDisplay === "Printer2") {
    toolDisplay = "3D Printer";
  }
  // checkCraftable(toolState, inventoryState);

  add([
    text(toolDisplay, { size: 16 }),
    pos(w.pos.x, toolState.currToolY - 18),
    color(242, 140, 40),
    z(11),
    "interactable",
  ]);
  if (inventoryState.vendingContents.length > 0) {
    add([
      "craftAlert",
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
      z(11),
      // scale(.5)
    ]);
    add([
      "craftAlert",
      text("Press [ Enter ] To Craft", {
        // optional object
        size: 24,
        outline: 4,
        color: (0, 0, 0),
        // can specify font here,
      }),
      area(),
      anchor("center"),
      pos(500, 500 + 100),
      z(8),
      // scale(.5)
    ]);
    craftState.craftSelected = true;
  } else {
    const noItemsAlert = add([
      "noItems",
      text("Pick up items to craft!", {
        // optional object
        size: 36,
        outline: 4,
        color: (0, 0, 0),
        // can specify font here,
      }),
      area(),
      anchor("center"),
      pos(500, 500),
      z(11),
      // scale(.5)
    ]);
    setTimeout(() => {
      destroyAll("noItems");
    }, 2000);
  }
}

export function onToolCollideEnd(toolState, inventoryState) {
  toolState.toolAccess = false;
  toolState.currentTool = "";
  destroyAll("interactable");
  destroyAll("craftAlert");
  checkCraftable(toolState, inventoryState);
}
