var Question = require('./work/controllers/question.js');
var Auth =      require('./work/controllers/auth.js');
var express =   require('express');

module.exports = (app) => {

  // app.get('/register')
  // http//localhost:3000/register
  app.post('/register', Auth.register);
  app.post('/login', Auth.login);
  app.get('/logout', Auth.logout);

  // anythin below is protected
  app.get('/', Auth.middlewares.session);
  app.all('/api*', Auth.middlewares.session);

    app.post('/api/question', Question.create);
    app.get('/api/question', Question.get);
    // app.get('/api/categories', Categories.get);
    app.get('/api/question/:id', Question.get);
    app.use(express.static(__dirname + '/work'));
}
