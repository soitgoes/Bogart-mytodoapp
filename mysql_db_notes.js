var mysql = require('mysql');
var MYSQL_USERNAME = 'root';
var MYSQL_PASSWORD = 'test123';
 
var client = mysql.createClient({
  user: 'root',
  password: 'test123',
});
 
// destroy old db
client.query('DROP DATABASE IF EXISTS mynode_db', function(err) {
  if (err) { throw err; }
});
 
// create database
client.query('CREATE DATABASE mynode_db', function(err) {
  if (err) { throw err; }
});
console.log('database mynode_db is created.');
client.query('USE mynode_db');
 
// create table
var sql = ""+
"create table Note("+
" id int unsigned not null auto_increment,"+
" Title varchar(50) not null default 'unknown',"+
" Description varchar(150) not null default 100000.00,"+
" primary key (id)"+
");";
client.query(sql, function(err) {
  if (err) { throw err; }
});
console.log('table Note is created.');

// function to create Note
exports.add_note = function(data, callback) {
 client.query("insert into Note (Title, Description) values (?,?)", [data.Title, data.Description], function(err, info) {
    // callback function returns last insert id
    callback(info.insertId);
    console.log('Note Title: '+data.Title+' has a Description of '+data.Description);
  });
}

// function to get list of Notes
exports.get_notes = function(callback) {
  client.query("select * from Note", function(err, results, fields) {
    // callback function returns employees array
    callback(results);
  });
}