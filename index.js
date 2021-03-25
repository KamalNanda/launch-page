var express=require("express"); 
var bodyParser=require("body-parser"); 
  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://anshika:Anshika@cluster0.tpd4t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
  
var app=express() 
  
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");

  next();
};

app.use(allowCrossDomain);
  
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
  
app.post('/contact', function(req,res){ 
    var name =req.body.name; 
    var email =req.body.email; 
    var phone=req.body.phone;
    var message=req.body.message;
    var data = { 
        "name":name,

        "email":email, 
        "phone":phone ,
        "message":message,
    } 
db.collection('contact').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.json({isSent:true ,message: "Record inserted Successfully"}); 
}) 
  
let port = process.env.PORT || 3000
app.get('/',function(req,res){ 
    res.set({ 
        'Access-control-Allow-Origin': '*'
        }); 
    return res.redirect('index.html'); 
}).listen(port) 
  
console.log("server listening at port 3000"); 