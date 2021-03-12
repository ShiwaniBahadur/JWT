const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/projectJWT",{useNewUrlParser: true}).then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log("Error in connecting to Database " + err);
})