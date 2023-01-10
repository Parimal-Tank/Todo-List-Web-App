const bodyParser = require("body-parser");
const mongoose = require('mongoose');

let data = [{item : 'hello'} , {item: 'hii'} , {item : 'how are you'}];
const urlencodedParser = bodyParser.urlencoded({extended: false});

// Connect to a Database
mongoose.connect('mongodb+srv://root:root@todolist-db.yq0veoe.mongodb.net/test' , ()=>{
    console.log("Mongodb Successfully Connected");
});

// Create a Schema - this is like a blueprint
let todoSchema = new mongoose.Schema({
  item : String
});

let Todo = mongoose.model('Todo' ,todoSchema);

// let itemOne = Todo({item : 'buy flowers'}).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// })

module.exports = function(app){

  app.get('/todo' , function(req , res){

    // get data from the mongodb database and 
    Todo.find({} , function(err , data){
      if(err) throw err;
      res.render('todo' , {todos : data});
      // res.json(data);
    })
  });

  app.post('/todo' , urlencodedParser , function(req , res){

    // add data into a mongodb database
    let newTodo = Todo(req.body).save(function(err , data){
      if(err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      if(data)
      {
        res.render('todo' , {todos : data});
        // res.json(data);
      }
    })
      // data.push(req.body);
  });

  app.delete('/todo/:item' , function(req , res){

    Todo.find({item : req.params.item.replace(/\-/g, ' ')}).deleteOne(function(err, data){
      if(err) throw err;
        // res.render("todo" , {todos:data});
        res.json(data);
    })
      // data = data.filter((todo) => {
      //   return todo.item.replace(/ /g, '') !== req.params.item;
      // });
      // console.log(data);
      // data = dataa;
      // res.render("todo" , {todos:data});
      
  });

};