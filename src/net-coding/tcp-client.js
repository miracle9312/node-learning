var net = require('net');

var client = net.connect({port:8124},function() {
  console.log('connected');
  client.write('#from client# hello world');
});

client.on('data', function(data){
  data = data.toString('utf-8');
  console.log(data);
  client.end();
});

client.on('end', function() {
  console.log('client disconnected');
});
