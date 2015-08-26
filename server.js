var express=require("express");
var multer  = require('multer');
var app=express();
var done=false;

/*Configure the multer.*/
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/uploads'));

app.use(multer(
  {
    dest: './uploads/',
    rename: function (fieldname, filename) {
      return filename+Date.now();
    },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path)
      done=true;
    }
  })
);

/*Handling routes.*/

app.get('/index',function(req,res){
  res.sendFile("./index.html",{root:__dirname});
});

app.get('/',function(req,res){
  res.sendFile("./demo.html",{root:__dirname});
});

app.post('/api/file',function(req,res){
  if(done==true){
    console.log(req.files);
    console.log(req.body);
    debugger;
    res.end("File uploaded.");
  }
});

/*Run the server.*/
var port = 9999;
app.listen(port,function(){
  console.log("Working on port:",port);
});
