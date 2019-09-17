const http = require("http");

http
  .createServer(function(request, response) {
    console.log("request", request.url);

    response.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      // 允许请求头范围
      "Access-Control-Allow-Headers": "X-Test-Cors",
      // 允许请求方法
      "Access-Control-Allow-Methods": "POS, PUT, DELETE",
      // 产生预请求后，时间范围内不需要再次发送预请求
      "Access-Control-Max-Age": "1000"
    });

    response.end("123");
  })
  .listen(8887);

console.log("on 8887");
