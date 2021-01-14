var resp = require('./response.js');
var { paths, redirects } = require('../paths.js');
var { statusColor } = require('./statCol.js');

exports.pathFind = function(req, res) {
  // Find the path
  var index = -1;
  var redirect = false;

  for (var insearch=0; insearch<paths.length; insearch++) {
    if (paths[insearch][0] == req.url | paths[insearch][0]+'/' == req.url) {
      index = insearch;
      break;
    }
  }

  if (index == -1) {
    for (var insearch=0; insearch<redirects.length; insearch++) {
      if (redirects[insearch][0] == req.url | redirects[insearch][0]+'/' == req.url) {
        index = insearch;
        redirect = true;
        break;
      }
    }
  }
  if (index != -1 && !redirect) {
    resp.sendpage(res, req.url, paths[index][1], paths[index][2], paths[index][3]);
    return false // Page found
  } else if (redirect) {
    console.log(statusColor(308)+' | '+req.url);
    res.writeHead(308, {'Location':'/'});
    res.end();
    return false // Page found (redirect)
  } else {
    return true // Page not found (404)
  }
}
