var url = require('url');

var cookie = function(req, res, next) {
  var cookie = req.headers.cookies;
  var cookies = {};
  if(!cookie){
    next();
    return cookies;
  }

  var list = cookie.split(';');
  list.map(function(item) {
    var pair = item.split('=');
    cookies[pair[0].trim()] = pair[1];
  });

  req.cookies = cookies;
  next();
};

var querystring = function(req, res, next) {
  req.query = url.parse(req.url).query;
  next();
};

module.exports = {
  cookie,
  querystring
};
