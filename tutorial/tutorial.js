const http = require("http");

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello you fuck man');
}).listen(8081, '127.0.0.1');
console.log("server running on 8081");