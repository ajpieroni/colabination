class UIManager{

    displayLoginScreen(){
        this.displayBlinkingUIMessage(
            "Login or Sign up to play the game!",
            vec2(center().x, center().y - 150)
        )
    
        const loginBox = add([
            rect(400, 200),
            color(204, 255, 255),
            pos(center().x, center().y),
            anchor("center"),
        ])
    
        const username = add([
            text("Username:", {
                size: 24,
                color: (0,0,102),
            }),
            pos(center().x, center().y - 25),
            anchor("center"),
        ])
    
        const password = add([
            text("Pin:", {
                size: 24,
                color: (0,0,102),
            }),
            pos(center().x, center().y + 25),
            anchor("center"),
        ])
    
        // Create the login form
        const loginForm = document.createElement("div");
        loginForm.id = "loginForm";
        loginForm.style.position = "absolute";
        loginForm.style.top = "50%";
        loginForm.style.left = "50%";
        loginForm.style.transform = "translate(-50%, -50%)";
        loginForm.style.width = "400px";
        loginForm.style.height = "200px";
        loginForm.style.display = "flex";
        loginForm.style.flexDirection = "column";
        loginForm.style.justifyContent = "space-around";
        loginForm.style.alignItems = "center";
    
        const usernameInput = document.createElement("input");
        usernameInput.id = "usernameInput";
        usernameInput.type = "text";
        usernameInput.placeholder = "Username";
        loginForm.appendChild(usernameInput);
    
        const passwordInput = document.createElement("input");
        passwordInput.id = "passwordInput";
        passwordInput.type = "password";
        passwordInput.placeholder = "Pin";
        loginForm.appendChild(passwordInput);
    
        const loginButton = document.createElement("button");
        loginButton.id = "loginButton";
        loginButton.textContent = "Login";
        loginForm.appendChild(loginButton);
    
        // Add the login form to the body
        document.body.appendChild(loginForm);
    
        // Add an event listener to the login button
        loginButton.addEventListener("click", async () => {
            // Get the entered username and password
            const enteredUsername = usernameInput.value;
            const enteredPassword = passwordInput.value;
        
            // Send a POST request to the validation route
            const response = await fetch("http://localhost:8081/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: enteredUsername,
                    pin: enteredPassword
                })
            });
        
            // Parse the response
            const data = await response.json();
        
            // Check if the validation was successful
            if (data.success) {
                // Remove the login form from the body
                document.body.removeChild(loginForm);
        
                // Go to the menu scene
                go("menu");
            } else {
                // Show an error message
                alert("Invalid username or password");
            }
        });
    }
    
    displayBlinkingUIMessage(content, position){
        // PARAMS:
        // content is the message we want to display
        // position is position of msg
        const message = add([
            text(content, {
                // optional object
                size: 24,
                color: (0,0,0),
                // can specify font here,
            }),
            area(),
            anchor("center"),
            pos(position),
            opacity(),
            // first param of state is default
            state("flash-up", ["flash-up", "flash-down"])

        ])

        
    // kaboom event listeners (key, funciton)
        onKeyPress("enter", () => {
            go("characterMovement");
        });

        message.onStateEnter("flash-up", async () =>{
            // tweening: a component that allows you to gradually change the value from x to y
            // ex. fde, animation, etc.

            // use await since we want to the tween to ahppen before we move on from anythign else
            // aka wait for tween to finish

            // function, final, time

            await tween(message.opacity, 
                0, 
                0.5, 
                (nextOpacityValue) => message.opacity = (nextOpacityValue),
                easings.linear)
                message.enterState("flash-down")


        })
        // same but in reverse
        message.onStateEnter("flash-down", async () =>{
           
            await tween(message.opacity, 
                1, 
                0.5, 
                (nextOpacityValue) => message.opacity = (nextOpacityValue),
                easings.linear)
                message.enterState("flash-up")


        })


    }

    displayMainMenu(){
        // add creates game object to be displayed on the screen
        // add function returns game objects, can store in const or var
        add([
            sprite("colabdoors"),
            scale(.85),
        ])
        add([
            sprite("colablogo"),
            // area component will create a hitbox over the game object
            // will also enable anchor component
            area(),
            anchor("center"),
            // moves logo up
            pos(center().x, center().y-200),
            scale(.75),
        ])
        this.displayBlinkingUIMessage(
            "Press [ Enter ] to Start Game",
            // kaboom, offers ability to make vec2
            vec2(center().x, center().y + 100)
        )
    }

    
    
}

export const uiManager = new UIManager()