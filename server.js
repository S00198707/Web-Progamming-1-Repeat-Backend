
const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
var routes = require('./routes/routes');
const cors = require('cors');
 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.listen(4800, function check(err)
{
if (err)
console.log("An Error Has Occured")
else
console.log("Started!")
});
 
mongoose.connect("mongodb://127.0.0.1:27017/OSD",{useNewUrlParser: true,  useUnifiedTopology: true },
function checkDb(error)
{
    if(error)
    {
        console.log("Error Connecting to DB");
    }
    else
    {
        console.log("Successfully Connected to DB");
    }
});
app.use(express.json());
app.use(routes);
