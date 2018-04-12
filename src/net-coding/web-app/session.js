var sessions = {};
var key = 'session_id';
var EXPIRES = 20*60*1000;
var util = require('./utils');

//生成session
var generaSession = function() {
  var session = {};
  session.id = (new Date()).getTime()+Math.random();
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
    var cookies = res.getHeader('Set-Cookie');
    var session = util.serializeCookie(key, req.session.id);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    return writeHead.apply(this, arguments);
  }
};

module.exports = {
  sessions,
  key,
  EXPIRES,
  generaSession,
  rewriteHead
};
