var fork = require('child_process').fork;
var cpus = require('os').cpus();
var path = require('path');

var server = require('net').createServer();
server.listen(8000, function() {
  for(var i = 0, child; i < cpus.length; i++) {
    child = fork(path.join(__dirname, '/work.js'));
    child.send('server', server);
  }
  server.close();
});

