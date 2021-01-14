var fs = require('fs');
var color = require('colorette');
var mime = require('mime');
var mustache = require('mustache');
var builtin = require('./builtinTags.js');
var database = require('./database.js');
var path = require('path');
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

exports.sendpage = function(res, urlname, pagename, htmlTags={}, status=200, input=null) {
  var type = mime.getType(path.join(__dirname, '../static/'+pagename));
  if (type == null) {
    Error('Unknown filetype: '+path.join(__dirname, '../static/'+pagename));
  }
  if (input == null) {
    htmlTags['DISPLAY_SHOP'] = 'none';
  } else {
    htmlTags['DISPLAY_SHOP'] = 'block';
  }
  fs.readFile(path.join(__dirname, '../static/'+pagename), 'utf8', async function(err, html) {
    if (err) {
      return console.error(err);
    } else if (type == 'text/html') {
      const temps = html.match(/[^\\]{(\s*?.*?)*?}/gi);
      // Mustache can render only one set of tags, so we are combining all tags here.
      tags = Object.assign({}, builtin.tags(urlname), htmlTags, input)
      if (input != null) {
        result = await database.query('SELECT * FROM \"items\"');
        tags['results'] = result['rows'];
      }
      html = mustache.render(html, tags);
    }
    console.log(statusColor(status)+' | '+urlname);
    res.writeHead(status, {'Content-Type':type});
    res.write(html);
    res.end();
  });
}
