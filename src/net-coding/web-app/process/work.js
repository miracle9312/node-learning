var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.end('http is handled by child, pid is '+process.pid+"\n");
});

process.on('message', function(m, tcp) {
  if(m=='server') {
    tcp.on('Connection', function(socket) {
      server.emit('connection', socket);
    })
  }
});
