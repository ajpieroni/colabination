# Colabination

See the published version [here](https://collabonation.colab.duke.edu/)!

## What is this project about?
Colabination is a game developed that allows students who want to learn more about the Co-Lab space, specifically the Studio. We used games like [Little Alchemy 2](https://littlealchemy2.com) and [Infinite Craft](https://neal.fun/infinite-craft/) as inspiration for Colabination. Although the game can get creative at times, for example, a combination of a doll and a dining table makes a family, we give a general idea of what tools the Studio offers students, such as scissors, hammers, sewing machine, Cricut, soldering station, etc. Overall, we want every student, graduate or undergraduate, Trinity or Pratt, to feel comfortable coming into the space and being able to express their creativity!


## Dev Stack

Colabination is developed using Kaboom.js and Ruby on Rails, with Docker. MySQL is used as the database, storing the users, combinations, tools, and items. 

### Frontend

**Framework**: [Kaboom.js](https://kaboomjs.com)

### Backend

**Framework**: [Ruby on Rails](https://rubyonrails.org)

**Database**: [MySQL](https://www.mysql.com)

### Source Control
Managed through Git. [Link to repository](https://gitlab.oit.duke.edu/colab-insomnia-dev/colab-games) for access to the current codebase.

## How to run the project

### 1. Installation
  * Clone project from Gitlab: https://gitlab.oit.duke.edu/colab-insomnia-dev/colab-games
  * Install Docker: https://docs.docker.com/get-docker/

### 2. Set up Enviornment
  * Build docker image and start application
    * `cd path/to/colab-games`
    * `docker-compose build` - builds the images
    * `docker-compose up` - command to start the application
  * Go to localhost:3000 in your browser

### 3. docker-compose commands
  * `docker-compose build` - builds the images. This must be run if we install more npm packages
  * `docker-compose up` - starts the containers (backend, frontend, db)
  * `docker-compose down` - tears down  the containers, run this when done
  * `docker-compose exec <servicename> bash` - give you a bash shell in your selected container replace *servicename* with service, e.g. backend, frontend, db. 
  * `docker-compose logs -f servicename` - attach terimal to log output of a service
  * `docker container ls` — views all the running containers
  * `docker system prune` -- delete all images and volumes to free up space

### 4. In docker container “backend” 
    rails db:drop db:create db:migrate
    rails db:seed

## Files

### App Structure
* `backend` - This directory contains the rails code. This is the backend.
* `frontend` - This directory contains the kaboom code. This is the frontend.
* `docker-compose.yml` - Defines the docker ecosystem needed to run the app. 
  
### Frontend
 
##### /colab-games/FrontEnd/assets
This folder contains all the sprites, images, and art that is used throughout the game. We used a combination of open-source, handmade, and AI-generated imagery. 

Note that all the item sprites are 50x50 pixels!

##### /colab-games/FrontEnd/utils
This folder contains the most essential part of the game! Each file has its function. For example, CharacterMovement.js has code specific to character movement. The same tutorial.js file contains code that pertains only to the tutorial feature of the game. Different files for different functionality helped increase the readability of code and file length. 

### Backend

##### /colab-games/backend/app/models
This directory contains the models for your application. Models in a Ruby on Rails application are used to define the structure of your database tables and the relationships between them.

##### /colab-games/backend/app/contollers
The Rails controller is the logical center of your application. It coordinates the interaction between the user, the views, and the model.

##### /colab-games/backend/config/routes.rb
This file defines the routes of your application. Routes are rules written to map incoming requests to controllers and actions.

##### /colab-games/backend/db/seeds.rb
This file is used to populate the database with initial data during setup.


## Want to make improvements?

This project is far from perfect, and we are excited that others are continuing the legacy of it! Here are some [issues](https://gitlab.oit.duke.edu/colab-insomnia-dev/colab-games/-/issues) that we did not get to during our time working on Colabination.

We added labels to the issues, such as _Future ✨_, which are enhancements that will add new features, _A Bug!_, which are critical fixes, and _Bonus 🧸_, which are less critical but nice-to-have additions. These labels allow us to organize and prioritize what to work on next.
