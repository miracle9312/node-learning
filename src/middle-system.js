var index = 0,
  middle_req = {},
  middle_res = {};

function middle (req, res) {
  middle_req = req;
  middle_res = res;
  middle.handle(middle_req, middle_res);
}

//中间件栈
middle.stack = [];

//将中间件插入栈
middle.use = function(mid) {
  middle.stack.push(mid);
  return this;
};

//触发中间件
middle.handle = function(req, res){
  next();
};

//递归执行中间件栈
function next() {
  //终止条件
  if(index == middle.stack.length){
    return;
  }
  var mid = middle.stack[index++];
  mid.handle(middle_req, middle_res, next);
}

module.exports = {
  middle
};

/*var mid1 = {
  handle: function(req, res, next){
    req.mid1 = 'mid1';
    res.mid1 = 'mid1';

    next();
  }
};

var mid2 = {
  handle: function(req, res, next){
    req.mid2 = 'mid2';
    res.mid2 = 'mid2';

    next();
  }
};*/

/*
middle.use(mid1)
  .use(mid2);

var req = {},
  res = {};
middle(req, res);
*/
