var fs = require('fs');

exports.sendpage = function(res, pagename, tags, status=200) {
  fs.readFile('./src/pages/'+pagename, 'utf8', function(err, html) {
    if (err) {
      return console.error(err);
    } else {
      const temps = html.match(/[^\\]{(\s*?.*?)*?}/gi);
      if (temps != null) {
        for (temp = 0; temp < temps.length; temp++) {
          // Replace the tag with the template. I know it's lengthy, deal with it.
          html = html.replace(temps[temp], temps[temp].charAt(0)+tags[temps[temp].slice(2,-1)]);
        }
      }
      res.writeHead(status, {'Content-Type':"text/html"});
      res.write(html);
      res.end();
    }
  });
}
