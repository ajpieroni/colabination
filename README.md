# Meeting Notes

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

