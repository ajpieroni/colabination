'use strict';
 
const express = require('express');
 
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
 
// App
const app = express();
app.get('/', (req, res) => {
  res.send('<html><body><p style="font-size: 24px; font-weight: bold;">Hello, Co-Lab! 🕺</p></body></html>');
});
 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});