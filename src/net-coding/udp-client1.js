var dgram = require('dgram');
var msg = new Buffer('miacle is handsome');
var client = dgram.createSocket('udp4');

client.send(msg, 0, msg.length, 41234, "localhost", function(err, bytes){
  client.close();
});
