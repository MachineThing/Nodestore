var http = require('http');
const port = 8000; // The port used for this HTTP server

var server = http.createServer(function(request, response) {
  // Server code goes here
});

server.listen(port); // Listen for any incoming requests

console.log('Server running at port '+port+'. :)')
