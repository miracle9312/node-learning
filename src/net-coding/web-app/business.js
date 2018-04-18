var sessionStorage = require('./session');
var util = require('./utils');
var querystring = require('querystring');
var url = require('url');
var {assembleUpload}= require('./upload');

function respond(req,res) {
  sessionStorage.rewriteHead(req, res);
  if(!req.session.isVisit){
    req.session.isVisit = true;
    return res.writeHead(200).then(function(){
      res.end("welcome to SKY dancing house");
    });
  }else{
    return res.writeHead(200).then(function(){
      res.end("welcome to SKY dancing house again");
    });
  }
};

var isFreshByCookie = function (req, res, next) {
  var cookie = util.parseCookie(req.headers.cookie);
  var session_id = cookie[sessionStorage.key];

  if(!session_id){//无登录纪录
    req.session = sessionStorage.generaSession();
    respond(req, res).then(function(){
      next();
    });
  }else{
    util.unsign(session_id).then(function(is_safe){
      if(is_safe){
        session_id = session_id.slice(0, session_id.indexOf('.'));
        var session = sessionStorage.sessions[session_id];
        if(session){
          if((new Date().getTime())>session.cookie.expire){//登录超时
            delete sessionStorage.sessions[session_id];
            req.session = sessionStorage.generaSession();
          }else{//正常登录
            session.cookie.expire = new Date().getTime() + sessionStorage.EXPIRES;
            req.session = session;
          }
        }else{//口令不正确
          req.session = sessionStorage.generaSession();
        }
        respond(req, res).then(function(){
          next();
        });
      }else{
        throw Error('client is not safe');
      }
    });
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

var handleUpload = function(req, res) {
  console.log(req.body);
};

var upload = assembleUpload(handleUpload);

module.exports = {
  isFreshByUrl,
  isFreshByCookie,
  upload
};
