var http = require('http');
const port = 8000; // The port used for this HTTP server

var server = http.createServer(function(req, res) {
  /*
  req - Request
  res - Response
  */
  if (req.url == '/') {
    res.writeHead(200, {'Content-Type':"text/html"});
    res.write('<html><head><title>Hello, world</title></head><body><h1>Hello, world!</h1></body></html>');
    res.end();
  }
});

server.listen(port); // Listen for any incoming requests

console.log('Server running at port '+port+'. :)')
