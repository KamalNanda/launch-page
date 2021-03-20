var express=require("express"); 
var bodyParser=require("body-parser"); 
  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://rudy17:rudy17@cluster0.9jinf.mongodb.net/apnaipl?retryWrites=true&w=majority'); 
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
  
app.post('/sign_up', function(req,res){ 
    var email =req.body.email; 
    var phone =req.body.phone; 
    var data = { 
        "email":email, 
        "phone":phone 
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('signup_success.html'); 
}) 
  
let port = process.env.PORT || 3000
app.get('/',function(req,res){ 
    res.set({ 
        'Access-control-Allow-Origin': '*'
        }); 
    return res.redirect('index.html'); 
}).listen(port) 
  
console.log("server listening at port 3000"); 
