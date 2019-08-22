var path = require('path');
var fs = require('fs');
var light = require('./middlewares/light');
var {cookie,querystring} = require('./middlewares/basic');
var {isFreshByCookie, upload} = require('./src/business');
var respond = require('./middlewares/respond');
var VALID_PATH = path.join(__dirname, "./src/views");
var app = light();

app.use(cookie);
app.use(querystring);
app.use(isFreshByCookie);
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

app.use('/bigpipe', function(req, res) {
    const tpl = fs.readFileSync(VALID_PATH + '/bigpipe.html', 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.write(tpl);
    setTimeout(function() {
        var data = {
            name: "miracle",
            appearance: "handsome"
        };

        res.write("<script>bigpipe.set('data',"+ JSON.stringify(data)+")</script>");
        res.end();
    }, 500)
});

app.use('/assets/:path', respond, function(req, res) {
  const { path } = req.params;
  const filePath = VALID_PATH + '/js/' + path;
  res.sendFile(filePath);
})


// app.use('/bigpipe', respond, function(req, res) {
//   var layout = '/bigpipe.html';
//   res.render(layout, {});
//   setTimeout(function() {
//     var data = {
//       name: "miracle",
//       appearance: "handsome"
//     };
//
//     res.write("<script>bigpipe.set('data',"+data+")</script>", function() {
//         res.end();
//     });
//   },2000)
// });

app.listen(8000, '127.0.0.1');

console.log('server runing at 172.28.211:8000');
