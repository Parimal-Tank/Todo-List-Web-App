const express = require('express');
const todoController = require('./controllers/todoController')

const app = express();

// set up template engine
app.set('view engine' , 'ejs');

//static files
app.use(express.static('./public'));

// listen to port
app.listen(3000);
console.log("You are Listening to port 3000 ");

// fire controller
todoController(app);