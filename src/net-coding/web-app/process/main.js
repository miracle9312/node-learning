var fork = require('child_process').fork;
var cpus = require('os').cpus();
var path = require('path');
var server = require('net').createServer();
var process = require('process');
var workers = {};
var limit = 10;
var duration = 60000;
var restart = [];

//限量重启
var isTooFrequently = function() {
  var time = new Date.now();
  var length = restart.push(time);
  if(length>limit) {
    restart = restart.slice(limit*-1);
  }

  return length>=limit && restart[limit-1]-restart[0]<duration;
};

var createWorker = function() {
  var worker = fork(path.join(__dirname, '/work.js'));
  worker.on('message', function(msg) {
    if(msg.act === 'suicide') {
      createWorker();
    }
  });
  //自动重启
  worker.on('exit', function() {
    console.log('process has exit pid is ' + worker.pid);
    delete workers[worker.pid];
  });

  workers[worker.pid] = worker;
  worker.send('server', server);
  console.log('create process '+worker.pid);
};

process.on('exit', function() {
  for(var pid in workers) {
    workers[pid].kill();
  }
});

server.listen(8000, function() {
  for(var i = 0; i < cpus.length; i++) {
    createWorker();
  }
  server.close();
});
