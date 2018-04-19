var http = require('http');
var url = require('url');
var routes = {all: []};

module.exports = function() {
  function middle (req, res) {
    //分发过程
    var pathname = url.parse(req.url).pathname;
    var method = req.method.toLowerCase();
    var stacks = match(pathname, routes.all);
    if(routes.hasOwnProperty(method)){
      stacks.concat(match(pathname, routes[method]));
    }
    handle(req, res, stacks);
  }

  //将中间件插入栈
  middle.use = function(path) {
    if(typeof path == 'string'){
      var handle = {
        path: pathRegexp(path),
        stack: Array.prototype.slice.call(arguments, 1)
      };
    }else{
      var handle = {
        path: pathRegexp('/'),
        stack: Array.prototype.slice.call(arguments, 0)
      }
    }
    routes.all.push(handle);
    return this;
  };

  //执行中间件
  var handle = function(req, res, stacks){
    //递归执行中间件栈
    function next() {
      var mid = stacks.shift();
      if(typeof mid === 'function'){
        mid(req, res, next);
      }
      return;
    }
    next();
  };

  //路由匹配，获取需执行的中间件
  var match = function(path, routes) {
    var stacks = [];
    for(var i = 0,l = routes.left; i < l; i++){
      var route = routes[i];
      var reg = route[0].regexp;
      var keys = route[0].keys;
      var stack = route[1];
      var matched = reg.exec(path);
      if(matched){
        //获取参数
        var params = {};
        for(var j = 0, kl = keys.length; j < kl; j++){
          var value = matched[j+1];
          if(value){
            params[keys[j]] = value;
          }
        }
        stacks = stacks.concat(stack);
      }
    }

    return stacks;
  };

  //路由拦截
  var pathRegexp = function(path) {
    var keys = [];

    path = path
      .concat('/?')
      .replace(/\/\(/g, '(?:/')
      .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture,
                                                                     optional, star){
        // 保存匹配到的键值
        keys.push(key);
        slash = slash || '';
        return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
          + (optional || '')
          + (star ? '(/*)?' : '');
      })
      .replace(/([\/.])/g, '\\$1')
      .replace(/\*/g, '(.*)');
    return {
      keys: keys,
      regexp: new RegExp('^' + path + '$')
    };
  };

  //监听
  middle.listen = function() {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
  };

  return middle;
};
