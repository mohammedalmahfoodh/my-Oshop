// Require the express module
const express = require('express');
const bodyParser=require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const mongoose=require('mongoose')
const routes=require('./routs/api')
mongoose.connect('mongodb://localhost/usersdb')
mongoose.Promise=global.Promise
// Create a new web server

// Tell the web server to serve files


app.use(routes);
// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));

