'use strict';

const express = require('express');
 
// App
const app = express();
 
app.get('/', (req, res) => {
  // This is an example HTML structure, adapt it to your needs
  res.sendFile(__dirname + "/index.html");
});
 
app.get('/main.js', (req, res) => {
  // This is an example HTML structure, adapt it to your needs
  res.sendFile(__dirname + "/main.js");
});
 
app.use('/utils', express.static('utils'))
app.use('/libs', express.static('libs'))
app.use('/assets', express.static('assets'))

module.exports = app