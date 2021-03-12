require('./Config/db');
var api = require('./Router/userRouter');
var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/', api);


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server is running at http://localhost:" + port);
})