const http = require("http");
const fs = require("fs");

http
  .createServer(function(request, response) {
    console.log("request come", request.headers.host);

    if (request.url === "/") {
      const html = fs.readFileSync("test.html", "utf8");
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.end(html);
    }

    if (request.url === "/srcipt.js") {
      const etag = request.headers["if-none-match"];
      if (etag === "777") {
        response.writeHead(304, {
          "Content-Type": "text/javascript",
          "Cache-Control": "max-age=2000000, no-cache",
          "Last-Modified": "123",
          Etag: "777"
        });
        response.end("111");
      } else {
        response.writeHead(200, {
          "Content-Type": "text/javascript",
          "Cache-Control": "max-age=2000000, no-cache",
          "Last-Modified": "123",
          Etag: "777"
        });
        response.end('console.log("script loaded")');
      }
    }
  })
  .listen(8888);

console.log("on 8888");
