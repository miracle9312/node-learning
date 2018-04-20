var light = require('./light');
var {cookie,querystring} = require('./middlewares');
var {isFreshByCookie, upload} = require('./business');
var app = light();

app.use(cookie);
app.use(querystring);
app.use(isFreshByCookie);
app.use('/upload',upload);

app.listen(8000, '172.28.211.122');

console.log('server runing at 172.28.211:8000');
