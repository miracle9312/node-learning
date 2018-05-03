var path = require('path');
var light = require('./middlewares/light');
var {cookie,querystring} = require('./middlewares/basic');
var {isFreshByCookie, upload} = require('./src/business');
var respond = require('./middlewares/respond');
var app = light();

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

app.use('/render', respond, function(req, res) {
  var viewname = "/test.html";
  var data = {layout:'/layout.html',user:"shao",username: "miracle"};
  res.render(viewname, data);
});

app.use('/bigpipe', respond, function(req, res) {
  var layout = '/bigpipe.html';
  res.render(layout, {});
  setTimeout(function() {
    var data = {
      name: "miracle",
      appearance: "handsome"
    };

    res.write("<script>bigpipe.set('data',"+data+")</script>");
    res.end();
  }, 2000)
});

app.listen(8000, '172.28.211.122');

console.log('server runing at 172.28.211:8000');
