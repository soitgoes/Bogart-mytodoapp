var bogart = require('bogart');
var viewEngine = bogart.viewEngine('mustache');
var router = bogart.router();
var mysql      = require('mysql');
var settings = require('./settings.js')
var fs = require('fs'); //is this bogart friendly?
var db_helper = require("./mysql_db_notes.js");
connection.connect();
//probably need to remove this excess boilerplate msyql code and get the mysql_db_notes integrated
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.end();
var post  = {id: 1, title: 'Hello MySQL'};
var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
  // Neat!
});
console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
router.get('/', function(req) {
  return viewEngine.respond('index.html', {
    locals: {}
  });
});
var app = bogart.app();
app.use(bogart.batteries); // A batteries included JSGI stack including streaming request body parsing, session, flash, and much more.
app.use(router); // Our router

app.start();