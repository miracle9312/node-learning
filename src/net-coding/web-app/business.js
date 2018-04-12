var sessionStorage = require('./session');
var util = require('./utils');
var querystring = require('querystring');
var url = require('url');

function respond(req,res) {
  sessionStorage.rewriteHead(req, res);
  if(!req.session.isVisit){
    req.session.isVisit = true;
    res.writeHead(200);
    res.end("welcome to SKY dancing house");
  }else{
    res.writeHead(200);
    res.end("welcome to SKY dancing house again");
  }
};

function getUrl(key, value, _url) {
  var obj = url.parse(_url, true);
  obj.query[key] = value;
  return url.format(obj);
}

function isFreshByUrl (req, res, next) {
  var redirect = function(url) {
    /*res.setHeader('Location', url);
    res.writeHead(302);*/
    res.end(url);
  };
  var query = querystring.parse(url.parse(req.url).query);
  var session_id = query[sessionStorage.key];

  if(!session_id){
    req.session = sessionStorage.generaSession();
    redirect(getUrl(sessionStorage.key, req.session.id, req.url));
  }else{
    var session = sessionStorage.sessions[session_id];
    if((new Date().getTime())>session.cookie.expire){
      delete sessionStorage.sessions[session_id];
      req.session = sessionStorage.generaSession();
      redirect(getUrl(sessionStorage.key, req.session.id, req.url));
    }else{
      session.cookie.expire = new Date().getTime() + sessionStorage.EXPIRES;
      req.session = session;
      respond(req, res);
    }
  }

  next();
}

var isFreshByCookie = function (req, res, next) {
  var cookie = util.parseCookie(req.headers.cookie);
  var session_id = cookie[sessionStorage.key];

  if(!session_id){
    req.session = sessionStorage.generaSession();
  }else{
    var session = sessionStorage.sessions[session_id];
    if((new Date().getTime())>session.cookie.expire){
      delete sessionStorage.sessions[session_id];
      req.session = sessionStorage.generaSession();
    }else{
      session.cookie.expire = new Date().getTime() + sessionStorage.EXPIRES;
      req.session = session;
    }
  }

  respond(req, res);
  next();
};

module.exports = {
  isFreshByUrl,
  isFreshByCookie
};
