Sophia - 8/29/2023
DockerFile:
- added image to DockerFile, made a working directory, and copied the directory into Docker
docker-compose.yml
- added version, services, and changed "client" to "frontend", directing it to the FrontEnd directory

### How to Start Frontend
- docker-compose build
- docker-compose run frontend bash

    - npm install
    - npm install nodemon