export default function handleSavingData(vendingKeys, hasSavedItems, areFinal, currItems, currTools, currFinals) {
    //hard coded items and tools, should be dynamic at some point
   
    let curr_user = localStorage.getItem("username");


    for (let i = 0; i < vendingKeys.length; i++) {
      currItems.push(vendingKeys[i]);
    }

    // let currItems = vendingKeys;
    // * will be renamed as machines
    console.log(currItems, "currItems");
    console.log(currTools, "currTools");

    for (let i = 0; i < currItems.length; i++) {
      const currItem = currItems[i];
      // console.log(`hasSaved: ${hasSavedItems}`);
      if (!hasSavedItems.includes(currItems[i])) {
        {
        //   console.log(`Attempting to save ${currItem}`);

          fetch("http://localhost:8081/user_items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: currItem, username: curr_user }),
          })
            .then((response) => {
              if (!response.ok) {
                return Promise.reject("Failed to save items");
              }
              console.log(`Item ${currItem} saved!`, response);
            })
            .catch((error) => {
              console.error("Error saving items:", error);
            });
          hasSavedItems.push(currItem);
        }
      } else {
        // console.log(`You've already saved ${currItem}`);
      }
    }
    for (let j = 0; j < currTools.length; j++) {
      const currTool = currTools[j];
      // console.log(`hasSaved: ${hasSavedTools}`);

      // if hasn't saved
      if (!hasSavedTools.includes(currTools[j])) {
        console.log(`Attempting to save ${currTool}`);
        fetch("http://localhost:8081/user_tools", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: currTool, username: curr_user }),
        })
          .then((response) => {
            if (!response.ok) {
              return Promise.reject("Failed to save items");
            }
            console.log(`Tool ${currTool} saved!`, response);
          })
          .catch((error) => {
            console.error("Error saving items:", error);
          });
        hasSavedTools.push(currTool);
      } else {
        console.log(`You've already saved ${currTool}`);
      }
    }
    for (let i = 0; i < areFinal.length; i++) {
      console.log(areFinal);

      currFinals.push(areFinal[i]);
    }

    for (let i = 0; i < currFinals.length; i++) {
      const currFinal = currFinals[i];
      // console.log(`hasSaved: ${hasSavedItems}`);
      if (!hasSavedFinal.includes(currFinals[i])) {
        {
          console.log(`Attempting to save ${currFinal}`);

          fetch("http://localhost:8081/user_items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: currFinal, username: curr_user }),
          })
            .then((response) => {
              if (!response.ok) {
                return Promise.reject("Failed to save final item");
              }
              console.log(`Item ${currFinal} saved!`, response);
            })
            .catch((error) => {
              console.error("Error saving items:", error);
            });
          hasSavedFinal.push(currFinal);
        }
      } else {
        console.log(`You've already saved ${currFinal}`);
      }
    }
  }