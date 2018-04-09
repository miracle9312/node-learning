/*通过http协议建立连接
* 报文头部
* upgrade:websocket
* connection:upgrade
* sec-WebSocket-Key:16字节随机码
* ...*/
var WebSocket = require('ws');
var ws = new WebSocket("ws://172.28.211.122:8000");
ws.onerror = function(e) {
  console.log("error" + e);
};

ws.onopen = function(e) {
  console.log('握手成功');
};
