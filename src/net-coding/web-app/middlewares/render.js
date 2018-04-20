var render = function(view, data) {
  var tpl = view.replace(/< =([ % \s\S]+?) >/g, function(match, code) {
    return "'+obj."+code+"'";
  });

  var tpl = "var tpl='"+tpl+"'\nreturn tpl;";
  var compile = new Function('obj', tpl);
  return compile(data);
};

module.exports = {
  render
};
