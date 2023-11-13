class UIManager{

    displayLoginScreen(){
        add([
            sprite("loginPage"),
            scale(.85),
        ]);
        this.displayBlinkingUIMessage(
            "Login or Sign up to play the game!",
            vec2(center().x, center().y - 180)
        );
    
        const loginBox = add([
            rect(500, 300),
            color(204, 255, 204),
            pos(center().x, center().y),
            anchor("center"),
        ]);
    
        const loginForm = document.createElement("div");
        setupForm(loginForm, "400px", "200px");
    
        const usernameInput = createInputField("usernameInput", "text", "Username");
        const passwordInput = createInputField("passwordInput", "password", "Pin");
        loginForm.append(usernameInput, passwordInput);
    
        const loginButton = createButton("loginButton", "Login");
        loginForm.appendChild(loginButton);
    
        const signUpButton = createButton("signUpButton", "Sign Up");
        loginForm.appendChild(signUpButton);
    
        document.body.appendChild(loginForm);
    
        // Create the sign-up form
        const signUpForm = document.createElement("div");
        setupForm(signUpForm, "400px", "250px");
    
        const signUpUsernameInput = createInputField("signUpUsernameInput", "text", "Username");
        const signUpPasswordInput = createInputField("signUpPasswordInput", "password", "Pin");
        const confirmPasswordInput = createInputField("confirmPasswordInput", "password", "Confirm Pin");
        signUpForm.append(signUpUsernameInput, signUpPasswordInput, confirmPasswordInput);
    
        const registerButton = createButton("registerButton", "Register");
        signUpForm.appendChild(registerButton);
    
        // Initially hide the sign-up form
        signUpForm.style.display = "none";
        document.body.appendChild(signUpForm);
    
        // Event listeners
        loginButton.addEventListener("click", () => login(usernameInput, passwordInput));
        signUpButton.addEventListener("click", () => toggleForms(loginForm, signUpForm));
        registerButton.addEventListener("click", () => signUp(signUpUsernameInput, signUpPasswordInput, confirmPasswordInput));
        function setupForm(formElement, width, height){
            formElement.style.position = "absolute";
            formElement.style.top = "50%";
            formElement.style.left = "50%";
            formElement.style.transform = "translate(-50%, -50%)";
            formElement.style.width = width;
            formElement.style.height = height;
            formElement.style.display = "flex";
            formElement.style.flexDirection = "column";
            formElement.style.justifyContent = "space-around";
            formElement.style.alignItems = "center";
        }
        
        function createInputField(id, type, placeholder){
            const input = document.createElement("input");
            input.id = id;
            input.type = type;
            input.placeholder = placeholder;
            input.style.marginTop = "20px";
            return input;
        }
        
        function createButton(id, text){
            const button = document.createElement("button");
            button.id = id;
            button.textContent = text;
            return button;
        }
        
        function toggleForms(loginForm, signUpForm){
            if (loginForm.style.display === "none") {
                loginForm.style.display = "flex";
                signUpForm.style.display = "none";
            } else {
                loginForm.style.display = "none";
                signUpForm.style.display = "flex";
            }
        }
        async function login(usernameInput, passwordInput){
            const enteredUsername = usernameInput.value;
            const enteredPassword = passwordInput.value;
        
            // Send a POST request to the login route
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
            if (data.status === 'success') {
                // Remove the login form from the body
                if (document.body.contains(loginForm)) {
                    document.body.removeChild(loginForm);
                }
        
                // Store the username in local storage
                localStorage.setItem("username", enteredUsername);
        
                // Go to the menu scene
                go("menu");
            } else {
                // Show an error message
                alert("Invalid username or password");
            }
        }
        
        async function signUp(usernameInput, passwordInput, confirmPasswordInput){
            const enteredUsername = usernameInput.value;
            const enteredPassword = passwordInput.value;
            const enteredConfirmPassword = confirmPasswordInput.value;
        
            // Validation for matching passwords
            if (enteredPassword !== enteredConfirmPassword) {
                alert("Passwords do not match.");
                return;
            }
        
            try {
                const response = await fetch("http://localhost:8081/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: enteredUsername,
                        pin: enteredPassword
                    })
                });
        
                const data = await response.json();
        
                // Check response status
                if (data.status === 'success') {
                    alert("Registration successful. User ID: " + data.user_id);
        
                    // Clear the form
                    usernameInput.value = '';
                    passwordInput.value = '';
                    confirmPasswordInput.value = '';
        
                    // Redirect to the login page
                    toggleForms(loginForm, signUpForm); // Assuming you have a function to switch forms
                } else {
                    // Handling different error cases
                    if (data.username) {
                        alert("Error: Username " + data.username.join(', '));
                    } else if (data.pin) {
                        alert("Error: Pin " + data.pin.join(', '));
                    } else {
                        alert("An unknown error occurred.");
                    }
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
                alert("Failed to sign up. Please try again later.");
            }
        }
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