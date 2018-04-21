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

// render html
var render = function(compiled, data) {
  return compiled(data, escape);
};

module.exports = {
  render,
  compile
};
