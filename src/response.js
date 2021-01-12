var fs = require('fs');
var color = require('colorette');

function statusColor(status) {
  switch (status.toString()[0]) {
    case "1":
      // Information
      return color.blueBright(status);
      break;
    case "2":
      // Success
      return color.white(status);
      break;
    case "3":
      // Redirection
      return color.cyan(status);
      break;
    case "4":
      // Client Error
      if (status != 418) {
        return color.yellow(status);
      } else {
        return color.bold(color.white(color.bgMagenta(status)));
      }
      break;
    case "5":
      // Server Error
      return color.bold(color.bgRedBright(color.whiteBright(status)));
      break;
    default:
      // Unknown
      return color.bold(color.white(color.bgMagenta(status)));
      break;
  }
}

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

      console.log(statusColor(status)+' | '+pagename);
      res.writeHead(status, {'Content-Type':"text/html"});
      res.write(html);
      res.end();
    }
  });
}
