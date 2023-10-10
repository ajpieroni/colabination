'use strict';

// const reload = require('reload')
const express = require('express');
 
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
 
// App
const app = express();
// app.get('/', (req, res) => {
//   res.send('<html><body><p style="font-size: 24px; font-weight: bold;">Hello, Co-Lab!! 🕺</p></body></html>');
// });
 
app.get('/', (req, res) => {
  // This is an example HTML structure, adapt it to your needs
  res.send(`
    <html>
      <head>
        <title>Kaboom Game</title>
      </head>
      <body>
        <style>
        * {
          margin: 0;
        }
        html,
        body {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        canvas {
          display: block;
        }
      </style>
        <h1> hello main </h1>
        <script type="module" src="main.js"></script>
    </html>
  `);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

// reload(express);

