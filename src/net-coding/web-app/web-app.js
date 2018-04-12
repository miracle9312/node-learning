var http = require('http');
var url = require('url');
var querystring = require('querystring');
var util = require('./utils');
var sessionStorage = require('./session');
var handleLogin = require('./is_login');

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
  console.log(cookie,'=======cookie========');

  //session
  var session_id = cookie[sessionStorage.key];

  if(!session_id){
    req.session = sessionStorage.generaSession();
  }else{
    var session = sessionStorage.sessions[session_id]
    if((new Date().getTime())>session.cookie.expire){
      delete sessionStorage.sessions[session_id];
      req.session = sessionStorage.generaSession();
    }else{
      session.cookie.expire = new Date().getTime() + sessionStorage.EXPIRES;
      req.session = session;
    }
  }
  sessionStorage.rewriteHead(req, res);
  handleLogin(req, res);
  console.log(sessionStorage);
}
).listen(8000, '172.28.211.122');

console.log('server runing at 172.28.211:8000');
