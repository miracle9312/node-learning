var http = require('http');

module.exports = function() {
  function middle (req, res) {
    var index = 0;

    //递归执行中间件栈
    function next() {
      //终止条件
      if(index == middle.stack.length){
        return;
      }
      var mid = middle.stack[index++];
      mid(req, res, next);
    }

    next();
  }

  //中间件栈
  middle.stack = [];

  //将中间件插入栈
  middle.use = function(mid) {
    middle.stack.push(mid);
    return this;
  };

  //监听
  middle.listen = function() {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
  };

  return middle;
};
