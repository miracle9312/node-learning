var xml2js = require('xml2js');
var querystring = require('querystring');
var formidable = require('formidable');

//判断是否包含上传数据
var hasbody = function(req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
};

//报文头部简化
var mime = function (req) {
  var str = req.headers['content-type'] || '';
  return str.split(';')[0];
};

//上传内容添加至rawBody
var toRawBody = function(fn) {
  return function(req, res, handle){
    var buffers = [];
    req.on('data', function(chunk) {
      buffers.push(chunk);
    });

    req.on('end', function() {
      req.rawBody = Buffer.concat(buffers).toString();
      fn(req, res, handle);
    })
  }
};

var parseform = function(req, res, handle) {
  req.body = querystring.parse(req.rawBody);
  handle(req, res);
};

//接受数据为JSON格式
var parseJSON = function(req, res, handle) {
  try{
    req.body = JSON.parse(req.rawBody);
    handle(req, res);
  }catch(e){
    res.writeHead(400);
    res.end('INVALID JSON');
    return
  }
};

//接受数据为xml格式
var parseXML = function(req, res, handle) {
  xml2js.parseString(req.rawBody, function (err, xml) {
    if(err){
      res.writeHead(400);
      res.end('INVALID XML');
      return
    }
    req.body = xml;
    handle(req, res);
  })
};

//接受数据为表单附件
var parseMultiPart = function(req, res, handle) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    req.body = fields;
    req.files = files;
    handle(req, res);
  })
};

var curryParseJSON = toRawBody(parseJSON);
var curryParseXML = toRawBody(parseXML);
var curryParseForm = toRawBody(parseform);

//控制上传文件大小，防止内存泄漏
var safeUpload = function(req, res) {
  var bytes = 1024;
  var len = req.headers['content-length']
    ? parseInt(req.headers['content-lenght'], 10)
    : 0;
  if(len && len>bytes){
    res.writeHead(413);
    res.end();
    return false;
  }

  return true;
};

/*创建upload中间件
* [Function]handle:处理上传数据*/
var assembleUpload = function(handle) {
  return function(req, res, next) {
    if(safeUpload(req, res) && hasbody(req)){
      var type = mime(req);
      if(type === 'application/json'){
        curryParseJSON(req,res, handle);
      }else if(type === 'application/xml'){
        curryParseXML(req, res, handle);
      }else if(type === 'application/x-www-form-urlencoded'){
        curryParseForm(req, res, handle)
      }else if(type === 'application/form-data') {
        parseMultiPart(req, res, handle);
      }
    }else{
      handle(req, res);
    }
    next();
  }
};

module.exports = {
  assembleUpload
};

