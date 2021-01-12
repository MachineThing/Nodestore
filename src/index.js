var http = require('http');
var resp = require('./response.js')
const port = 8000; // The port used for this HTTP server

var server = http.createServer(function(req, res) {
  /*
  req - Request
  res - Response
  */
  if (req.url == '/') {
    resp.sendpage(res, 'index.html', {'NODE':process.versions['node']});
  } else if (req.url == '/teapot') {
    resp.sendpage(res, 'teapot.html', {'LUCKY':Math.round(Math.random()*10)}, 418);
  } else {
    resp.sendpage(res, '404.html', {'NODE':process.versions['node'], 'URL':req.url, 'HOST':req.headers['host'], 'PORT':port}, 404);
  }
});

server.listen(port); // Listen for any incoming requests

console.log('Server running at port '+port+'. :)')
