const bodyParser = require("body-parser");

const data = [{item : 'hello'} , {item: 'hii'} , {item : 'how are you'}];
const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo' , function(req , res){
      res.render('todo' , {todos : data});
  });

  app.post('/todo' , urlencodedParser , function(req , res){
       data.push(req.body);
       res.render('todo' , {todos : data});
  });

  app.delete('/todo' , function(req , res){
      data = data.filter(function(todo){
        return todo.item.replace(/ /g, '-') !== req.params.item;
      });
      res.json(data);
  });

};