var fs = require('fs');

exports.sendpage = function(res, pagename) {
  fs.readFile('./src/pages/'+pagename, 'utf8', function(err, html) {
    if (err) {
      return console.error(err);
    } else {
      res.writeHead(200, {'Content-Type':"text/html"});
      res.write(html);
      res.end();
    }
  });
}
