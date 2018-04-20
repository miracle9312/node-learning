var sessions = {};
var key = 'session_id';
var EXPIRES = 20*60*1000;
var util = require('../src/utils');

//生成session
var generaSession = function() {
  var session = {};
  session.id = (new Date()).getTime();
  session.cookie = {
    expire: (new Date()).getTime() + EXPIRES
  };
  sessions[session.id] = session;
  return session;
};

//重写writeHead方法
var rewriteHead = function(req, res) {
  var writeHead = res.writeHead;
  res.writeHead = function() {
    var args = arguments;
    return util.sign(req.session.id+'').then(function(val){
      var cookies = res.getHeader('Set-Cookie');
      var session = util.serializeCookie(key, val);
      cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
      res.setHeader('Set-Cookie', cookies);
      writeHead.apply(res, args);
    });
  }
};

module.exports = {
  sessions,
  key,
  EXPIRES,
  generaSession,
  rewriteHead
};
