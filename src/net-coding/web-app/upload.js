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
  return function(req, res){
    var buffers = [];
    req.on('data', function(chunk) {
      buffers.push(chunk);
    });

    req.on('end', function() {
      req.rawBody = Buffer.concat(buffers).toString();
      fn(req, res);
    })
  }
};

var parseform = function(req, res) {
  req.body = querystring.parse(req.rawBody);
}

//接受数据为JSON格式
var parseJSON = function(req, res) {
  try{
    req.body = JSON.parse(req.rawBody);
  }catch(e){
    res.writeHead(400);
    res.end('INVALID JSON');
    return
  }
};

//接受数据为xml格式
var parseXML = function(req, res) {
  xml2js.parseString(req.rawBody, function (err, xml) {
    if(err){
      res.writeHead(400);
      res.end('INVALID XML');
      return
    }
    res.body = xml;
  })
};

//接受数据为表单附件
var parseMultiPart = function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    req.body = fields;
    req.files = files;
  })
};

var curryParseJSON = toRawBody(parseJSON);
var curryParseXML = toRawBody(parseXML);
var curryParseForm = toRawBody(parseform);

module.exports = function(req, res, next) {
  if(hasbody(req)){
    var type = mime(req);
    if(type === 'application/json'){
      curryParseJSON(req,res);
    }else if(type === 'application/xml'){
      curryParseXML(req, res);
    }else if(type === 'application/x-www-form-urlencoded'){
      curryParseForm(req, res)
    }else if(type === 'application/form-data') {
      parseMultiPart(req, res);
    }
  }
};

