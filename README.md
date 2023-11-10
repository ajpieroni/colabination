# Meeting Notes

## Nov 10th
Agenda:
- [] Take a look at our MVP checklist
  - [] sign up as a user
  - [] login as a user
  - [] craft the paper trail 1, 2, 
  - [] craft glass trail 1
  - [] craft metal trail 1
  - [] craft trash
  - [] save game progress
- [] To Do:
  - []
- [] Additional features:
  - [] tutorial
  - [] danai special(aka ending)
  - [] about us page
  - [] files re-org
Progress:
- Kelvin:
  -working on showing login/sign up features on the front end
- Dasol:
  - Map out of tutorial 
  - walkthrough of crafting first item
- Alex: 
  - worked on dynamic crafying
  - return whole object of creation
    - item will either go to backpack or documentation station
  
- Olly:
  - fixed backpack
  - worked on danai special :D 
  - adding tool logic this next week
## November 3rd

Progress Report:
- Alex:
  - figure out passing voume around scenes
- Kelvin:
  - discuss saving guest progress (not MVP)
  - force new players to make account (new game or load game)
  - documentation station, store final items
    - discuss animation for final items
    - some bugs to fix auto save to documentation
- Dasol: 
  - finish about us
  - start on controls page
- Olly:
## Nov 3rd
Agenda:
- [] updates from the week
- [] discuss Class vs function and how to pass data between files
- [] redefine end MVP goals
  - [] piece code together to have a full playable game
  - [] use APIs for initializing game, check crafting, save progress
  - [] working menu bar
  - [] login and sign up
- [] assign small issues out
  - [] items in vending machine vs in documentation station
  - [] remove trash or any other final items from pocket
  - [] 

## October 27th

Future Issues Notes:
- Slight art clash with pixel art and background, do we want to fix?
  - making tools look interactive on the table
  - add some more machines
- Put tools into array

Progress Report:
- Olly: 
  - can collide with tools on the table in the middle
  - also made pretty png images :D
- Kelvin: 
  - discussed comb table and how to get item 
- Dasol: 
  - shared more on menu button

## October 20th
Feedback Review:
- could autosave or save button or interval saving
- backend continue in rails
- ways to illustrate items/tools that are interactable:
  - items/tools glow when unlocked
  - items/tools have thicker outline
  - colliding w object has craft? prompt (still should prompt even if not craftable)
- animate a way to indicate new object: short prompt pop up?
- run the trees by someone who works in studio
- visualization of character (not mvp)
- you made dubious trash
- focus on first/second layer of tree for sprites
  - split between people keep consistent style
- get rid of drawers, first time playing have items spawn on floor

Progress Report:
- Kelvin:
  - save implementation in progress
  - make a base user
- Dasol:
  - menu integration with game (how to save items)
- Sophia:
  - simplify trail

## October 18th
Demo Summary:
- once you have items in vending machine, you can pick any item
- 5 base materials
- still a game of guessing -> game has clues
  - need correct 2 items in pocket to craft
- save progress everytime we play game -> login and password
  - vending machine/backpack is saved state
  - do we need a "save" feature? 
    - not saving as we go along
- hot keys -> how will users use?
  - prompt/tutorial
  - "press 'x' to open"
  - possible question mark button to show users what to press
- backend is in rails (isn't needed for project)
  - needed to add express -> renders Kaboom
- docker for consistency

Suggestions/Feedback/Questions:
- find a way to illustrate something you can interact with or not
- have character go in all 4 directions (change visualizations of character)
- talk to people about what objects make other final objects -> learn more about equipment
- something weird/certain prompt is triggered when you have wrong objects in pocket
- scope for quantity of created items should be reasonable
- progress saved -> documentation station
- be able to create a robot -> robot cat!!!
### Alex Demo Notes:
My very scattered notes:
- Make Dremel instead
- Looking into the drawer to see all the items
- Looks like pocket could hold 4
- Come close to vending machine, press v
- Question mark button to bring up instructions
- Next big phase is the crafting
- It might be good to find someway to illustrate that something is either something you can or cannot interact with
- Lock on machines that haven’t been discovered yet
- Character being able to go in four directions
- Talk with people who work in the CoLab studio, what are all the objects you have, talk through with the course staff (sauntering)
- 3d print, removing the supports, need a tool for that
- Something weird would happen if you had the wrong things in your pocket
- You fool, can’t make anything abbot X and Y
Contraband
Stained glass window 
Robot cat
## October 13th
- [] Explain web server
- [] Prepare for demo next wednesday
Danai, Zhichen, Sandra, Alexis
  - Make a demo branch that we can keep stable
  - Where we're at with our project & how far can we get
  - Distribute topics/demo:
    - One person explains, one person plays
    - Another person explain art/sound
    - Alex: Moving, playing
    - Ollie: Talking about what the game is, talking about alex is doing
    - Sophia/Dasol: show off art! 🎨
    - Dasol: ERD
    - Kelvin: Docker (sorry)
    
- [] update on progress
- [] assign issues
- [] combining art with the frontend code
- [] make sure no work is being overwritten
- [] making rectangles squares  in pocket
- [] perspective of printers and tables
- [] sprite for character?
- [] ensuring that each asset is exactly 50x50px to fit properly in vending and pocket
- [] let's talk crafting? once two items are on the crafting table, should they press a button? etc.

## October 6th
- ↓ select, only works for items in vending machine
- Being able to toggle soundtrack?
- player.pos.x, same for y
- Undefined error after dropping item on table, grab from vend, then try to drop again
- Combining game with assets
- Organizing game files into a more structured and scalable model, start building based on - Anni's game structure
- Logical error in crafting––would colliding with items on the table count as crafting, - button press? TBD
- Issue of server hosting frontend

 ## September 29th, Happy Mid-Autumn Festival
Agenda:
- [x]  Show and Tell from the week
- [x]  Test play the game
- [x]  Anni will be out next friday
- [x]  Next step...

Possible Issues to Work on: 
- Combine items
- Arrow select on vending machine
- Document what keys are required for a possible future tutorial
- Upload backdrop and export layers as pngs to incorporate with functionality (on Box)
- Look into adding buttons to computer to play test game with controls
- Design individual sprites

Handling Collisions
- debug.inspect = true -> in main

Frontend Over Backend
- keep items in frontend, access when you need it from possibly a folder
- not best to access from back end



## September 22th
Agenda:
- [x] talk about backend migration and seed, and this `bin/rails db:environment:set RAILS_ENV=development`
- [x] define the functions of pockets, vending machine and blueprints
- [x] decide on the blueprints: TBD
- [x] decide on the game name: Co-Labnation
- [x] check in on everyone's issue and assign new issues
- [x] combining code and next step...

### <span style="color:lightblue">Game Name: Co-Labination</span>
### Team Name: Studio Arbor (make stickers?)

[Migrations and Backend Resources](https://www.rubyguides.com/2020/03/rails-scaffolding/)

### Functions of Pockets
Vending Machine: 
- Either we walk up to it or are always able to press v from anywhere (pocket)
- POCKET! 
Blueprints:
- Mission system
- Item tree: ignoring 3d printing for now
    - Try and finish the other items int he tree and think about where any 3d prints could fit into that 
Final Items:
- Put them in documentation station, just visua

Tree
- Move Thread instead of Fabric as starting material
- Hammer + wood = paper
- Scissors/tools go on workspace
- 
- 

Next Steps
- Anni will assign everyone something to do
    - Coding frontend

## September 15th
Agenda:
- [x] Show off the Kaboom mini games
- [x] Talk about accomplishments
- ERD questions for the group

Accomplishments/Blueprint: 
- What should we keep track of in terms of # of items made, tools discovered…
- Visual representation of the accomplishment
- Have a report style that would show the past accomplishment

Count of Items made:
- Are we counting unique items? Can we make something multiple times?

Global Accomplishments:
- What should they be?
## September 8th
Agenda:
- [X] Set MVP goals
- [X] Play Olly's game paper prototype
- [X] Vote on Sophia's color theme
- [X] Talk about Dasol's ERD table
- [X] Listen to Kelvin & Alex's music sample?

### Set MVP Goals
- Start the map in the CoLab, something we can keep expanding
- Finish out the Co-Lab mini game
    - How long do we want it to be?
- Want it to be on the web and maybe on the game cabinet
- Controls will vary between the game cabinet and the web app
- Decide a name?
- [ ] Controlling the character?
  - Arrow keys or WASD
  - keys binded to drop, pickup
  - Search button, search in that area
  - Colliding into items?
  - How much guidance should we give the user?
  - Tutorial to explain the types of things, tools/materials
  - Build up; make a T-Shirt and make it into something else
  - Make tree of items to find the ultimate things

### Sophia's Color Theme & Style Guide 
- [X] Figure out font
- [X] Figure out color scheme
- Jamer Font (Logo)
- Atari Font (Body)
- Middle color palatte for the logo, a bit more in your face

### Talk about Dasol's ERD table
- Since the game is a bit bigger than a mini game, you want the "Rare" accomplishments
- Ability for players to come back
- Username and Password/PIN
- Need to have the table for the users
  - Username, Password
  - Their game progress
- Game Progress
- Tools
- Materials
- Blueprints
- Finding a way to figure out what we need to store, when to callback

# This Coming Week
- [ ] Interview people in the CoLab and build a tree of items
  - [ ] Look at the past CoLab projects  
- [ ] Dasol and Ollie working on the ERD

---
## August 30th, Discovery
- Frontend: Javascript
- Database…?
- Replace Pi on game machine
- Mission setup, goals along the way

### Stack

- Backend: Rails
- Database: MySQL
- Frontend: Javascript (Kaboom.js)

### Backend

- Used to store leaderboard, tools and materials

### Sprites

- Use sprite to grab and drop off object at another location


### Game Mechanics

- Singleplayer
- Ending scene where you create everything in the game, restart?
- Missions
- Minimum requirements to end the game, but many possible combinations
- Web and game cabinet
- Glowing for hints
- You were the Xth person to make this!




# Meeting: September 15th
### Database
- Option B: Joined table of userID and items


### Accomplishments
- Final item: a pet?
- Leaderboard function or X amount of items discovered?
  - 10th person to get this achievement?
  - For achievement style, join users and achieve, aiu_uid (1,1), (1,2), and count number of accomplishments
  - Global Achieve: would work for in-game notifications, not necessarily leaderboard since value would be updated after each user.

### Hint System: to be talked about after initial development

### Inventory Management
- Items are stored in pocket, 2 items at a time
- 2 items + blueprint
- Items are dropped to combine them

