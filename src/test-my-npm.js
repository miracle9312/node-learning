var count = 0;
var done = function () {
  count++;
  if(count>=3){
    console.log(3);
  }
};

setTimeout(function(){
  done();
},0);

setTimeout(function(){
  done();
},0);

setTimeout(function(){
  done();
},0);
