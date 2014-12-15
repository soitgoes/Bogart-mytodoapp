var bogart = require('bogart')
, path   = require('path')
, nano = require('nano')('http://localhost:5984')
, madstodo = nano.use('madstodo')
, viewEngine = bogart.viewEngine('mustache', path.join(bogart.maindir(), 'views'))
, todos = {}
, router = bogart.router();

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

/* madstodo.get('todoList', { revs_info: true }, function(err, body) {
  if (!err)
    console.log(body);
}); */

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
  todo, /*pass in the todo object, need to setup filters in couch*/  
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