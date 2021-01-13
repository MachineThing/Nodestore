var resp = require('./response.js');

exports.path = function(req, res) {
  paths = [
    ['/', 'pages/index.html', 0, {'NODE':process.versions['node']}],
    ['/teapot', 'pages/teapot.html', 0, {'LUCKY':Math.round(Math.random()*10)}, 418],
    ['/index.css', 'css/index.css', 1]
  ]

  // Find the path
  var index = -1;
  var path = req.url;
  for (var insearch=0; insearch<paths.length; insearch++) {
    if (paths[insearch][0] == path) {
      index = insearch;
      break;
    }
  }

  if (index != -1) {
    resp.sendpage(res, req.url, paths[index][1], paths[index][2], paths[index][3], paths[index][4]);
    return false // Page found
  } else {
    return true // Page not found (404)
  }
}
