
const hostname = '0.0.0.0';
const port = 3000;
const app = require("./server");

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});