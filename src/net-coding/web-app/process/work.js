var http = require('http');
var process = require('process');
var logger = require('logger');

var server = http.createServer(function(req, res) {
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.end('http is handled by child, pid is '+process.pid+"\n");
});

var worker;
process.on('message', function(m, tcp) {
  if(m=='server') {
    worker = tcp;
    worker.on('connection', function(socket) {
      server.emit('connection', socket);
    })
  }
});

//捕获异常
process.on('uncaughtException', function(err) {
  //记录日志
  logger.error(err);
  //自杀信号
  process.send({act: 'suicide'});
  //断开连接
  worker.close(function() {
    //退出进程
    process.exit(1);
  });
  //长连接超时
  setTimeout(function(){
    process.exit(1);
  },5000)
});
