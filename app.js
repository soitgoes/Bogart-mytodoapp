var bogart = require('bogart')
, path   = require('path');

var viewEngine = bogart.viewEngine('mustache', path.join(bogart.maindir(), 'views'));

var todos = {};

var router = bogart.router();

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
  }
  return viewEngine.respond('index.html', context);
  // Mustache.to_html(templateString, context.locals)
});

router.post("/", function(req) {
  var todo = {name: req.params.name, description: req.params.description },
      errors = [];

if(!todo.name || todo.name.trim() === "") {
  errors.push("A name for your to do is required");
}
 if (errors.length > 0) {
    return bogart.redirect("/?errors="+JSON.stringify(errors));
  }
  todos[todo.name] = todo;

return bogart.redirect("/");
});

router.del("/:name", function(req) {
console.log('deleting '+req.params.name);
console.log(todos);
delete todos[req.params.name];

return bogart.redirect("/");
});

var app = bogart.app();
app.use(bogart.batteries);
app.use(router); // Our router

app.start();