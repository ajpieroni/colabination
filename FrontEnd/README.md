# Express
- We're using [express](https://expressjs.com/) as a web server for the front end
- Couple of things learned while setting this up
  - in order to use `npm start`, I had to have a index.js, server.js and index.html file set up in the Frontend/
  - if not, we would have to run `node server.js`
  - **index.js** includes host, port and sourcing of server.js
  - **server.js** includes setting up express routes. Note, we have to provide our static page and folder in this file, so that we could show it on the web page
  - **index.html** is the page we're serving and it calls to our main.js
  - in **package.json**, we included both express and nodemon which helps us to keep the files live and synced
  - in **docker-compose.yml**, we had to add an volume for node_modules/ and Frontend/, so that we would have all the packages and the files synced from the container and the development