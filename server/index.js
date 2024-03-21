const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.url} New Req Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Welcome to the Home page");
        break;
      case "/about":
        res.end("Welcome to the About Page");
        break;
      default:
        res.end("Page not found");
    }
  });
});

myServer.listen(8000, () => console.log("Server is started"));
