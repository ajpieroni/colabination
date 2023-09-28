import kaboom from "kaboom";

kaboom();

let SPEED = 300;
let isPopupVisible = false;
let vendingContents = [];
let inPocket = [];

// vending machine
const vending = add([ 
    pos(30, 50),
    rect(50, 100),
    outline(4),
    color(105, 105, 105),
    area(),
    body({ isStatic: true }),
    "vend",
    z(0),
]);

// Character pocket
const pocket = add([
    pos(1300, 600),
    rect(200, 200),
    outline(4),
    color(0, 5, 0),
    area(),
    body({ isStatic: true }),
    "pocket",
    z(0),
]);

// character 
const player = add([
    pos(150, 150),
    rect(100, 100),
    outline(4),
    color(220, 20, 60),
    area(),
    body(),
    "player",
]);

// material #1
const material1 = add([
    pos(300,300),
    rect(50, 50),
    outline(4),
    color(102, 178, 225),
    area(),
    body(),
    z(10),
    {'type': 'category1'},
    "main",
    "material",
]);

// material #2
let material2 = add([
    pos(300,600),
    rect(50, 50),
    outline(4),
    color(153, 153, 225),
    area(),
    body(),
    z(10),
    "main",
    "material",
    {'type': 'category2'},
]);

// material #3
let material3 = add([
    pos(300,50),
    rect(50, 50),
    outline(4),
    color(255, 178, 102),
    area(),
    body(),
    z(10),
    {'type': 'category3'},
    "material",
]);

// onKeyDown() registers an event that runs every frame as long as the user is holding a certain key
onKeyDown("left", () => {
    player.move(-SPEED, 0);
});

onKeyDown("right", () => {
    player.move(SPEED, 0);
});

onKeyDown("up", () => {
    player.move(0, -SPEED);
});

onKeyDown("down", () => {
    player.move(0, SPEED);
});

function showVendingContents(contents) {
    const popup = add([
        rect(500, 600),
        pos(500, 125),
        z(10),
        color(105, 105, 105),
        outline(4),
        "vending",
    ]);

    const startX = popup.pos.x + 75;
    const startY = popup.pos.y + 50;
    const maxLineHeight = 40;
    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i < contents.length; i++) {
        const item = contents[i];

        if (currentX + item.width > popup.pos.x + popup.width - 50) {
            currentX = startX;
            currentY += maxLineHeight + 50;
        }

        const vendingItem = add([
            rect(item.width, item.height) ,
            pos(currentX, currentY),
            z(11),
            color(item.color.r, item.color.g, item.color.b),
            "vending"
        ]);

        onClick(() => {
            // Check if the mouse click occurred within the bounds of itemEntity
            if (isClicked(vendingItem)) {
                // Handle click events on items by calling the updatePocket function
                updatePocketVending(vendingItem, inPocket);
            } 
        });

        currentX += item.width + 50;
    }

    isPopupVisible = true;
}
function getDistance(x1, y1, x2, y2){
    let x = x2 - x1;
    let y = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}
// Function to check if the mouse click occurred within the bounds of an entity
function isClicked(item) {
    let distance = (getDistance(mousePos().x, mousePos().y, item.pos.x, item.pos.y))
    return (distance <= 55)
}

let itemsInPocket = 0;

function updatePocketVending(material, inPocket){
    if (itemsInPocket < 2) {
        if (itemsInPocket === 0) {
            const item1 = add([
                rect(material.width, material.height) ,
                pos(1440, 620),
                z(11),
                color(material.color.r, material.color.g, material.color.b),
           
            ]);
            inPocket.push(item1);
        } else {
            const item2 = add([
                rect(material.width, material.height) ,
                pos(1440, 730),
                z(11),
                color(material.color.r, material.color.g, material.color.b),
            ]);
            inPocket.push(item2)
        }
        itemsInPocket++;
       
    } else {
        // shake(5);
        alert("Remove items from pocket to select from vending machine")
    }

}

function updatePocket(material, inPocket) {
    if (itemsInPocket < 2) {
        if (itemsInPocket === 0) {
            material.moveTo(1440, 620);
        } else {
            material.moveTo(1440, 730);
        }
        itemsInPocket++;
        inPocket.push(material);
    } else {
        destroy(material);
    }
}

// backpack functionality
onKeyPress("v", () => {
    if (isPopupVisible) {
        destroyAll("vending");
        isPopupVisible = false;
        SPEED = 300;
    } else {
        showVendingContents(vendingContents);
        isPopupVisible = true;
        SPEED = 0;
    }
});

player.onCollide("material", (material) => {
    if (!vendingContents.includes(material)) {
        vendingContents.push(material);
    }
    updatePocket(material, inPocket);
    material.use(body({ isStatic: true }));
});


onKeyPress("q", () => {
    console.log(inPocket)
    if (itemsInPocket !== 0) {
        itemsInPocket--;
        let item = inPocket.pop();
        destroy(item);
    }
});
