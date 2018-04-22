var mime = require('mime');
var path = require('path');
var fs = require('fs');
var templater = require('./render');

var respond = function (req, res, next) {
  res.sendFile = function(filepath) {
    fs.stat(filepath, function(err, stat) {
      var stream = fs.createReadStream(filepath);
      res.setHeader('Content-Type', mime.getType(filepath));
      res.setHeader('Content-Length', stat.size );
      res.setHeader('Content-Disposition',
        'attachment:filename="'+path.basename(filepath)+'"');
      res.writeHead(200);
      stream.pipe(res);
    })
  };

  res.json = function(json) {
    res.setHeader('Content-Type', mime.getType(json));
    res.writeHead(200);
    res.end(JSON.stringify(json))
  };

  res.redirect = function(url) {
    res.setHeader('Location', url);
    res.writeHead(302);
    res.end('Url redirect to '+ url);
  };

  res.render = function(viewname, data) {
    var template = templater(req, res);
    template.render(viewname, data);
    /*if(!cache[viewname]) {
      var text;
      try{
        text = fs.readFileSync(VALID_PATH+viewname, 'utf-8');
      }catch(e) {
        res.setHeader("Content-Type", 'text/html');
        res.writeHead(500);
        res.end('template error');
        return;
      }
      cache[viewname] = compile(text);
    }
    var compiled = cache[viewname];
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    var html = render(compiled, data);
    res.end(html);*/
  };

  next();
};

module.exports = respond;
