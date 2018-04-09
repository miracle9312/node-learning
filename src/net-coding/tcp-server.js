var net = require('net');

var server = net.createServer(function(socket){
  socket.on('data', function(data) {
    data = data.toString('utf-8');
    console.log(data);
    socket.write('#from server# have bound');
  });

  socket.on('end', function() {
    console.log('已断开连接');
  });
});

server.listen(8124, function() {
  console.log('server bound');
});


