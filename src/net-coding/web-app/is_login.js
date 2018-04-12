module.exports = function(req,res){
  if(!req.session.isVisit){
    req.session.isVisit = true;
    res.writeHead(200);
    res.end("welcome to SKY dancing house");
  }else{
    res.writeHead(200);
    res.end("welcome to SKY dancing house again");
  }
};
