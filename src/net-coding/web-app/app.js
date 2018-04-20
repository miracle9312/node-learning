var light = require('./light');
var {cookie,querystring} = require('./basic');
var {isFreshByCookie, upload} = require('./business');
var respond = require('./respond');
var app = light();
var path = require('path');

app.use(cookie);
app.use(querystring);
app.use(isFreshByCookie);
app.use(respond);
app.use('/upload',upload);
app.use('/download/:file',respond, function(req, res) {
  res.sendFile(path.join(__dirname, 'resources', req.params.file));
});

app.use('/redirect', respond, function(req, res) {
  res.redirect('http://www.baidu.com');
});

app.use('/json', respond, function(req, res) {
  res.json({'name':'miracle'});
});

app.listen(8000, '172.28.211.122');

console.log('server runing at 172.28.211:8000');
