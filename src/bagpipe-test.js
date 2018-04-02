const fs = require('fs');
const path = require('path');

function createAsync (i) {
  fs.readFile(path.join(__dirname,'./test.txt'),(err, data)=>{
    console.log(data);
  })
};

for(var i = 0; i < 100; i++){
  createAsync(i);
}
