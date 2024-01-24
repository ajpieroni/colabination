
import InitialItems from "./InitialItems.js";
export function fetchUserItems(username, hasSavedItems, vendingKeys, vendingContents, areFinal) {
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
        const items = data.items; 
        console.log("items", items);
        let containsPaper = items.some((subArray) =>
          subArray.includes("paper")
        );
        if (items.length == 0) {
          InitialItems(["glass", "thread", "paper", "metal"]);
        }
        if (items.length !== 0) {
          const materials = ["glass", "thread", "paper", "metal"];

          materials.forEach((material) => {
            if (!items.some((subArray) => subArray.includes(material))) {
              console.log(`doesn't have ${material}`);
              InitialItems([material]);
            }
          });
        }

        items.forEach((item) => {
          const itemName = item[0];
          const isFinal = item[1];
          // console.log(itemName, isFinal);
          const savedItem = add([
            // rect(item.width, item.height) ,
            pos(0, 0),
            pos(0, 0),
            z(0),
            // color(item.color.r, item.color.g, item.color.b),
            sprite(`${itemName}`),
            // rect(10,10),
            // sprite(`${image}`),
            scale(1.5),
            area(),
            // z(11),
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
        });
        // resolve(itemNames);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function intiailizeUser(inventoryState){
  fetchUserItems(
    inventoryState.curr_user,
    inventoryState.hasSavedItems,
    inventoryState.vendingKeys,
    inventoryState.vendingContents,
    inventoryState.areFinal
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
