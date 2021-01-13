var http = require('http');
var path = require('./paths.js');
var resp = require('./response.js');
const port = 8000; // The port used for this HTTP server

var server = http.createServer(function(req, res) {
  /*
  req - Request
  res - Response
  */
  try {
    if (path.path(req, res)) {
      // Redirect the user to the page, if it returns true then it failed else it succeeded.
      resp.sendpage(res, req.url, 'pages/404.html', {'NODE':process.versions['node'], 'URL':req.url, 'HOST':req.headers['host'], 'PORT':port}, 404);
    }
  } catch(err) {
    resp.sendpage(res, req.url, 'pages/500.html', {'ERROR':err, 'URL':req.url}, 500);
  }
});

server.listen(port); // Listen for any incoming requests

console.log('Server running at port '+port+'. :)')
