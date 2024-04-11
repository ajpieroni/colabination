
import InitialItems from "./InitialItems.js";
import { addNewTool } from "./Tools.js";

export function fetchUserItems(username, hasSavedItems, vendingKeys, vendingContents, areFinal, toolState) {
    let curr_user = localStorage.getItem("username");

  console.log(`Fetching for ${username}`);
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8081/user_items?username=${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(localStorage.getItem("tutorial"));
        const items = data.items; 
        console.log("items", items);
        if(localStorage.getItem("tutorial") == "true" && localStorage.getItem("inProgress") == "false"){
        console.log("tutorial is true");
        InitialItems(["wood"]);
        }else{
          InitialItems([]);
        }
        // let containsPaper = items.some((subArray) =>
        //   subArray.includes("paper")
        // );
        console.log(items.length == 0 && !localStorage.getItem("tutorial") == "true")
        if (items.length == 0 && localStorage.getItem("tutorial") == "false"){
          InitialItems(["glass", "thread", "wood", "metal", "plastic"]);
        }

        if (items.length !== 0) {
          const materials = ["glass", "thread", "wood", "metal", "plastic"];

          materials.forEach((material) => {
            if (!items.some((subArray) => subArray.includes(material))) {
              console.log(`doesn't have ${material}`);
              InitialItems([material]);
            }
          });
        }

        // Add the items to the game
        items.forEach((item) => {
          const itemName = item[0];
          const isFinal = item[1];
          const savedItem = add([
            pos(0, 0),
            pos(0, 0),
            z(0),
            sprite(`${itemName}`),
            scale(1.5),
            area(),
            "material",
            {
              itemKey: itemName,
              isFinal: isFinal,
            },
          ]);
          if (!savedItem.isFinal) {
            hasSavedItems.push(itemName);
            vendingKeys.push(savedItem.itemKey);
            
            vendingContents.push(savedItem);
          } else {
            if (!areFinal.includes(itemName)) {
              areFinal.push(itemName);
            }
          }
          // Add a new tool if the user has discovered 10 new items
          if(vendingContents.length % 10 == 0){
            // addNewTool(toolState, showAlert);
            addNewTool(toolState, false);
          }
        });
        // resolve(itemNames);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function intiailizeUser(inventoryState, toolState){
  fetchUserItems(
    inventoryState.curr_user,
    inventoryState.hasSavedItems,
    inventoryState.vendingKeys,
    inventoryState.vendingContents,
    inventoryState.areFinal, toolState
  )
    .then((itemNames) => {
      console.log(itemNames);
    })
    .catch((error) => {
      console.error("Error fetching user items:", error);
      InitialItems();
    });
  fetchUserTools(inventoryState.curr_user)
    .then((itemTools) => {
      console.log(itemTools);
    })
    .catch((error) => {
      console.error("Error fetching user items:", error);
    });
}


// load in tools

// InitialItems();

export function fetchUserTools(username) {
    let curr_user = localStorage.getItem("username");

  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8081/user_tools?username=${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const toolNames = data.items; // Access the items property

        if (toolNames) {
          toolNames.forEach((toolName) => {
            hasSavedTools.push(toolName);
          });
          resolve(toolNames);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
