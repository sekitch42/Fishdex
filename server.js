const http = require("http");
const connectDB = require("./server/config/db");
const app = require("./server/config/app");

const PORT = 3000;

connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Fishdex server running on port ${PORT}`);
});
