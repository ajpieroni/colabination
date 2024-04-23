# Colabination

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
This folder contains the most important part of the game! Each file has its own function. For example, CharacterMovement.js has code that is specific to the character movement. The same as the tutorial.js file contains code that pertains only to the tutorial feature of the game 

## Want to make improvements?

