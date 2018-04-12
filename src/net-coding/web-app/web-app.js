var http = require('http');
var url = require('url');
var querystring = require('querystring');
var util = require('./utils');

http.createServer(function(req, res) {
  //judge request method
  util.request(req.method);
  //get pathname
  var pathname = url.parse(req.url).pathname;
  //get query string
  var query = querystring.parse(url.parse(req.url).query);
  //get cookie
  var cookie = util.parseCookie(req.headers.cookie);

  console.log(pathname,'=======pathname======');
  console.log(query,'=======query=========');
  console.log(cookie,'=======cookie========')
}).listen(8000, '172.28.211.122');



console.log('server runing at 172.28.211:8000');

