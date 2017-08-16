const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mustacheExpress = require('mustache-express');
const app = express();
// add id so that can get access individually
let list = [{
    name: "Learn Node Basics",
    done: true,
    id: 1
  }, {
    name: "Learn Express Basics",
    done: true,
    id: 2
  },
  {
    name: "Learn Mustache",
    done: true,
    id: 3
  }, {
    name: "Learn HTML forms with Express",
    done: false,
    id: 4
  }
]
// bodyparser, views, etc
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

//Listening on root
app.get('/', function (req, res) {
  // TODO write your code here
  res.render('todo.mustache',{todos: list});
})

// let generate new id for each new item created
app.post('/', function (req,res){
  const updatetask = req.body.taskinput;
  let max = 0;
  for (var i = 0; i < list.length; i++) {
    if(max < list[i].id){
      max = list[i].id;
    }
  }
  let task = {
    name: updatetask,
    done: false,
    id: max + 1
  }
  list.push(task);
  res.redirect('/')
})
// move to completed when click mark as complete
app.post('/:id', function(req, res){
  let id = parseInt(req.params.id);

  list.forEach ( function (e){
    if(id === e.id){
      e.done = true;
    }
  })
  res.render('todo', {todos: list});
})
// show on local host
app.listen(3000, function () {
  console.log('Successfully started express appslication!');
})
