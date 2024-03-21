const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if(req.url == '/favicon.ico'){
        return res.end();
    }
  const log = `${Date.now()} ${req.url} New Req Received\n`;
  const myUrl = url.parse(req.url, true);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Welcome to the Home page");
        break;
      case "/about":
        res.end("Welcome to the About Page");
        break;
      case "/search":
        const searchResults = myUrl.query.search_query
        res.end(`These are your search results ${searchResults}`);
        break;
      default:
        res.end("Page not found");
    }
  });
});

myServer.listen(8000, () => console.log("Server is started"));
