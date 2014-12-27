var bogart = require('bogart')
, path   = require('path')
, nano = require('nano')('http://localhost:5984')
, viewEngine = bogart.viewEngine('mustache', path.join(bogart.maindir(), 'views'))
, todos = {}
, router = bogart.router();
nano.db.destroy('madstodo');
nano.db.create('madstodo'); //burn the last iteration
var madstodo = nano.use('madstodo')
  madstodo.insert(
  { "views": 
    { "tdNaD": 
      { "map": function(doc) { emit([doc.name, doc.description], doc._id); } } 
    }
  }, '_design/td', function (error, response) {
    console.log("created td view and tdNaD DesignDoc " + response);
  }); //create the design doc

router.get('/', function(req) {
var errors = req.params.errors;
var todoList = []; // the array that will contain every saved to do created
var context = {
  locals: {
    ListTitle: "My Todo List",
    todos: todoList
      },
    };

    for (var todoName in todos){
  todoList.push(todos[todoName]); 
  //This for ^ is pushing the locally saved todos, need to load from db 
  }
madstodo.view('td', 'tdNaD', function(err, body) {
  if (!err) {
    body.rows.forEach(function(doc) {
      console.log(doc.value); 
    });
  }
}); /* This is the right method, takes the design doc name and view name, and spits out whatever the view is designed to spit out.
Now gotta figure out how to push that out to html*/

return viewEngine.respond('index.html', context);
  // Mustache.to_html(templateString, context.locals)
});

router.get("/addtodo", function(req){
var errors = req.params.errors;
var todoList = []; // the array that will contain every saved to do created
var context = {
  locals: {
    ListTitle: "My Todo List",
    todos: todoList
      },
    };
return viewEngine.respond('addPage.html', context);
})

router.post("/addtodo", function(req) {
  var todo = {
    name: req.params.name, //request paramater name from the html form post
    description: req.params.description // request parameter desc from the html form post
  },
  errors = [];

  if(!todo.name || todo.name.trim() === "") {
  errors.push("A name for your to do is required"); //check that the todo is not empty string
}
if (errors.length > 0) {
    return bogart.redirect("/?errors="+JSON.stringify(errors)); //print out the error;
  }
  todos[todo.name] = todo; //pushes the todo down below on html 
//figure out best place to destroy db then create it on each new run for dev-ing 
madstodo.insert(
  todo, 
  function(err, body) {
    
    if (!err)
      console.log(body);
  });
return bogart.redirect("/");
});

router.del("/:name", function(req) {
  console.log('deleting '+req.params.name);
  console.log(todos);
  delete todos[req.params.name];

  /*madstodo.destroy('thedocumentsRevID# to delete', function(err, body) {
  if (!err)
    console.log(body);
});*/

  return bogart.redirect("/");
});

var app = bogart.app();
app.use(bogart.batteries);
app.use(router); // Our router

app.start();