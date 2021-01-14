var resp = require('./response.js');
var { paths } = require('../paths.js');

exports.pathFind = function(req, res) {
  // Find the path
  var index = -1;
  var path = req.url.split('?')[0];
  var input = req.url.split('?')[1];
  if (input != undefined) { // Check if there even is input
    var rinput = input.split('&');
    var input = {}
    for (var iform=0; iform<rinput.length; iform++) {
      // Format the input
      input[rinput[iform].split('=')[0]] = rinput[iform].split('=')[1]
    }
  } else {
    input = null;
  }
  for (var insearch=0; insearch<paths.length; insearch++) {
    if (paths[insearch][0] == path) {
      index = insearch;
      break;
    }
  }

  if (index != -1) {
    resp.sendpage(res, req.url, paths[index][1], paths[index][2], paths[index][3], input);
    return false // Page found
  } else {
    return true // Page not found (404)
  }
}
