Bogart-ToDoApp
==============

A To Do List/Note creation Application made in Bogart

-
npm install bogart
npm install nano
npm install nodemon //is this worth using? 
//will need setup instructions for mysql

create a folder in root called views, this should include an index page, add page, edit page, etc..

index page- main page for showing all of the notes you have made

add page- page for creating a new to do list/note. This should include a Name of the note and the description.

edit page- you should be taken to this page when you want to edit a note from the index page.

update 12/14: rerouted so that index displays the todos and adds a add todo button which routes users to the addPage view which is where they add the todo.
notes: currently the index is only showing the locally saved todos. I Put a method for getting documents. Need to figure out how to take the db stuff and put it in a object or array to display on index rather than the current locally saved version. Also added a route for deleting todo notes, but need a way to find the id's. Need to add bootstrap styling.