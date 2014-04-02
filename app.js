var bogart = require('bogart')
, path   = require('path');

var viewEngine = bogart.viewEngine('mustache', path.join(bogart.maindir(), 'views'));

var router = bogart.router();

var context = {
	locals: {
		ListTitle: "My Todo List",
		TodoItems: [
					{value: 'This is my first item to do!'}, 
					{value: 'This is my second item to do!'},
					{value: 'This is my third item to do!'}
					]
	},
};

router.get('/', function(req, res) {
  return viewEngine.respond('index.html', context);
  // Mustache.to_html(templateString, context.locals)
});
function SaveText(){
var todotext = $("#TextToSave").val();
context.TodoItems.push({value: "" + todotext + ""});
};
var app = bogart.app();

app.use(router); // Our router

app.start();