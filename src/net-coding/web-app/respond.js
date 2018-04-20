var mime = require('mime');
var path = require('path');
var fs = require('fs');

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

  next();
};

module.exports = respond;
