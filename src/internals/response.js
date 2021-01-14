var fs = require('fs');
var path = require('path');
var mime = require('mime');
var mustache = require('mustache');
var builtin = require('./builtinTags.js');
var database = require('./database.js');
var { statusColor } = require('./statCol.js');

exports.sendpage = function(res, urlname, pagename, htmlTags={}, status=200) {
  var type = mime.getType(path.join(__dirname, '../static/'+pagename));
  if (type == null) {
    Error('Unknown filetype: '+path.join(__dirname, '../static/'+pagename));
  }
  fs.readFile(path.join(__dirname, '../static/'+pagename), 'utf8', async function(err, html) {
    if (err) {
      return console.error(err);
    } else if (type == 'text/html') {
      const temps = html.match(/[^\\]{(\s*?.*?)*?}/gi);
      // Mustache can render only one set of tags, so we are combining all tags here.
      tags = Object.assign({}, builtin.tags(urlname), htmlTags)
      if (htmlTags['SHOP_TYPE'] != undefined) {
        var shop_dep = null;
        switch(tags['SHOP_TYPE']) {
          case "Operating System":
            shop_dep = "OS";
            break;
          case "Personal Computer":
            shop_dep = "PC";
            break;
          default:
            shop_dep = tags['SHOP_TYPE'];
            break;
        }
        result = await database.query('SELECT * FROM \"items\" WHERE department = \''+shop_dep+'\';');
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
