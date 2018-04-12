var index = 0,
  middle_req = {},
  middle_res = {},
  http = require('http');

module.exports = function() {
  function middle (req, res) {
    middle_req = req;
    middle_res = res;
    middle.handle(middle_req, middle_res);
  }

  //中间件栈
  middle.stack = [];

  //将中间件插入栈
  middle.use = function(mid) {
    middle.stack.push(mid);
    return this;
  };

  //触发中间件
  middle.handle = function(req, res){
    next();
  };

  //监听
  middle.listen = function() {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
  };

  //递归执行中间件栈
  function next() {
    //终止条件
    if(index == middle.stack.length){
      return;
    }
    var mid = middle.stack[index++];
    mid(middle_req, middle_res, next);
  }

  return middle;
};
