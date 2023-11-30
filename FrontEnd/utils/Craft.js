export default function checkCraftable(){
        if (
          toolAccess &&
          // tableItems.includes("paper") &&
          tableItems.length >= 1 &&
          !isPopupVisible
        ) {
          isCraftable = true;
          if (isCraftable) {
            // !TODO: allow users to move around, for now, only allow them to stay at the station until the craft is complete
            // console.log("hit");
            SPEED = 0;
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
            finalCraftCheck = true;
          }
        }
        if (!toolAccess || isPopupVisible) {
          destroyAll("craft");
        }
}