const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mustacheExpress = require('mustache-express');
const app = express();
// mongo requires
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017/todo';

// bodyparser, views, etc
app.use(bodyParser.urlencoded({extended:false}));
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

//Listening on root
app.get('/', function (req, res) {
  var collection = database.collection('todos');
  collection.find({}).toArray(function(err, todos) {
    res.render('todo',{todos});
  });
})


// let generate new id for each new item created
app.post('/', function(req, res){
  let todo = {name: req.body.newtodo, dont: false}
  let collection = database.collection('todos')
  // save the todo to the collection
  // after saving get the list
  collection.find({}).toArray(function(err, todos) {
    res.render('todo',{});
  })
})


// app.post('/', function (req,res){
//   const updatetask = req.body.taskinput;
//   let max = 0;
//   for (var i = 0; i < list.length; i++) {
//     if(max < list[i].id){
//       max = list[i].id;
//     }
//   }
//   let task = {
//     name: updatetask,
//     done: false,
//     id: max + 1
//   }
//   list.push(task);
//   res.redirect('/')
// })
// // move to completed when click mark as complete
// app.post('/:id', function(req, res){
//   let id = parseInt(req.params.id);
//
//   list.forEach ( function (e){
//     if(id === e.id){
//       e.done = true;
//     }
//   })
//   res.render('todo', {todos: list});
// })
// show on local host
app.listen(3000, function () {
  console.log('Successfully started express application!');
})


// code here


let database;

// code here

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb");
  database = db;
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  database.close(function () {
    console.log('mongodb disconnected on app termination');
    process.exit(0);
  });
});
