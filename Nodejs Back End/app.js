// Require the express module
const express = require('express');
const bodyParser=require('body-parser')
const app = express();
app.use(bodyParser.json())

const routes=require('./routs/api')
// Create a new web server

// Tell the web server to serve files


app.use(routes);
// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));

