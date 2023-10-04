'use strict';
 
const express = require('express');
 
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
 
// App
// const app = express();
// app.get('/', (req, res) => {
//   res.send('<html><body><p style="font-size: 24px; font-weight: bold;">Hello, Co-Lab! 🕺</p></body></html>');
// });

// app.use('/Sprite-Grab-and-Drop', express.static(path.join(__dirname, 'Sprite-Grab-and-Drop')));

 
app.get('/', (req, res) => {
  // This is an example HTML structure, adapt it to your needs
  res.send(`
    <html>
      <head>
        <title>Kaboom Game</title>
      </head>
      <body>
        <script src="/Sprite-Drag-and-Drop/main.js"></script>
    </html>
  `);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

