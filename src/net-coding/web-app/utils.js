var request =function (method) {
  switch(method){
    case 'POST':
      console.log('post');
      break;
    case 'GET':
      console.log('get');
      break;
    case 'DELETE':
      console.log('delete');
      break;
    case 'PUT':
      console.log('put');
      break;
    default:
      console.log('get');
  }
}

var parseCookie = function(cookie) {
  var cookies = {};
  if(!cookie){
    return cookies;
  }

  var list = cookie.split(';');
  list.map(function(item) {
    var pair = item.split('=');
    cookies[pair[0].trim()] = pair[1];
  });

  return cookies;
};

module.exports = {
  request,
  parseCookie
};
