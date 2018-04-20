var url = require('url');
var util = require('../src/utils')

//路由拦截
var pathRegexp = function(path) {
  var keys = [];

  path = path
    .concat(strict ? '' : '/?')
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

//创建路由管理器
var route = function(req, res) {
  var app = {};
  var routes = {'all' : []};

  app.use = function(path, action) {
    routes.all.push([pathRegexp(path), action]);
  };

  ['get', 'post', 'put', 'delete'].map(function(method){
    app[method] = function(path, action) {
      routes[method].push([pathRegexp(path), action]);
    }
  });

  //匹配路由
  var match = function(pathname, routes) {
    for(var i = 0, l = routes.length; i < l; i++){
      var route = routes[i];
      var reg = route[0].regexp;
      var keys = route[0].keys;
      //[Array] matched:[path, param1, param2...]
      var matched = reg.exec(pathname);
      if(matched) {
        var params = {};
        for(var j = 0; j < keys.length; j++) {
          var value = matched[j+1];
          if(value){
            params[keys[j]] = matched[j];
          }
        }
        req.params = params;

        var action = route[1];
        action(req, res);
        return true;
      }
    }

    return false;
  };

  return function(req, res, next) {
    var pathname = url.parse(req.url).pathname;
    var method = req.method.toLowerCase();
    if(routes.hasOwnProperty(method)){
      if(match(pathname, route[method])){//根据请求方法分发
        return;
      }else if(match(pathname, routes.all)){//用all进行分发
        return;
      }
    }else{
      if(match(pathname, routes.all)){//用all进行分发
        return;
      }
    }
    util.handle404(req, res);
  };
};
