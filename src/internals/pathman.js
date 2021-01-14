var resp = require('./response.js');
var { paths } = require('../paths.js');

exports.pathFind = function(req, res) {
  // Find the path
  var index = -1;

  for (var insearch=0; insearch<paths.length; insearch++) {
    if (paths[insearch][0] == req.url) {
      index = insearch;
      break;
    }
  }

  if (index != -1) {
    resp.sendpage(res, req.url, paths[index][1], paths[index][2], paths[index][3]);
    return false // Page found
  } else {
    return true // Page not found (404)
  }
}
