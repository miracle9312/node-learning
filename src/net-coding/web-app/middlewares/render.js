var fs = require('fs');
var path = require('path');
var cache = {};
var VALID_PATH = path.join(__dirname, "../src/views");

module.exports = function(req, res) {
  // xss safe replace the tags
  var escape = function(html) {
    return String(html)
      .replace(/&(?!\w+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

// pre-compile
  var compile = function(str) {
    var tpl = str.replace(/\n/g, '\\n')
      .replace(/<%=([\s\S]+?)%>/g, function(match, code) {//转义
        return "'+escape("+code+")+'";
      }).replace(/<%-([\s\S]+?)%>/g, function (match, code) {//非转义
        // normal output
        return "' + " + code + "+ '";
      }).replace(/<%([\s\S]+?)%>/g, function(match, code) {
        return "';\n" + code + "\ntpl += '";
      }).replace(/\'\n/g, '\'')
      .replace(/\n\'/gm, '\'')
      .replace(/\r/g, '');

    tpl = "tpl = '" + tpl + "';";
    tpl = tpl.replace(/''/g, '\'\\n\'');
    tpl = 'var tpl = "";\nwith (obj || {}) {\n' + tpl + '\n}\nreturn tpl;';
    return new Function('obj', 'escape', tpl);
  };

//render nest template
  var renderLayout = function(str, viewname) {
    return str.replace(/<%-\s*body\s*%>/g, function(match, code) {
      if(!cache[viewname]) {
        cache[viewname] = fs.readFileSync(VALID_PATH + viewname, 'utf-8');
      }
      return cache[viewname];
    })
  };

// render html
  var render = function(viewname, data) {
    //load layout
    var layout = data.layout;
    if(layout){
      if(!cache[layout]){
        try{
          cache[layout] = fs.readFileSync(VALID_PATH+layout, 'utf-8');
        }catch(e) {
          res.setHeader("Content-Type", 'text/html');
          res.writeHead(500);
          res.end('template error');
          return;
        }
      }
    }
    var layoutContent = cache[layout] || "<%- body %>";

    //replace layout by view
    var replaced;
    try{
      replaced = renderLayout(layoutContent, viewname);
    }catch(e) {
      res.setHeader("Content-Type", 'text/html');
      res.writeHead(500);
      res.end('template error');
      return;
    }

    //compile template
    var key = viewname + ':' + (layout || '');
    if(!cache[key]) {
      cache[key] = compile(replaced);
    }
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    var html = cache[key](data, escape);
    res.write(html);
    // res.end();
  };

  return{
    cache,
    VALID_PATH,
    render
  }
};
