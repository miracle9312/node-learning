var sessions = {};
var key = 'session_id';
var EXPIRES = 20*60*1000;

//分辨请求方法
var request =function (method) {
  switch(method){
    case 'POST':
      console.log('post');
      break;
    case 'GET':
      console.log('get');
      break;
    case 'DELETE':
      console.log('delete');
      break;
    case 'PUT':
      console.log('put');
      break;
    default:
      console.log('get');
  }
};

//解析cookie
var parseCookie = function(cookie) {
  var cookies = {};
  if(!cookie){
    return cookies;
  }

  var list = cookie.split(';');
  list.map(function(item) {
    var pair = item.split('=');
    cookies[pair[0].trim()] = pair[1];
  });

  return cookies;
};

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

//序列化报文cookie
var serializeCookie = function (name, val, opt) {
  var pairs = [name + '=' + val];
  opt = opt || {};

  if(opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
  if(opt.domain) pairs.push('Domain=' + opt.domain);
  if(opt.path) pairs.push('Path=' + opt.path);
  if(opt.expires) pairs.push('expires=' + opt.expires);
  if(opt.secure) pairs.push('Secure');
  if(opt.httpOnly) pairs.push('HttpOnly');

  return pairs.join(';');
};

module.exports = {
  request,
  parseCookie,
  generaSession,
  serializeCookie
};
