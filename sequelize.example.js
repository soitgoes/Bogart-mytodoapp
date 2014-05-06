var Sequelize = require('sequelize')
  , sequelize = new Sequelize('todo', 'myuser', 'mypass', {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    })
 
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

  var todo = sequelize.define('todo', {
    todo_id: Sequelize.INTEGER,
    todo_name: Sequelize.STRING(250),
    todo_descriptioin: Sequilize.STRING(1000)
  }, {
    tableName: 'todos'
    timestamps: true
  })

  todo
  .save()
  .complete(function(err) {
    if (!!err) {
      console.log('The instance has not been saved:', err)
    } else {
      console.log('We have a persisted instance now')
    }
  })
