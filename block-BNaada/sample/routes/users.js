let express = require('express');
let User = require('../models/users');

let routes = express.Router();

routes.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    console.log(users);
    res.render('usersList', { users: users });
  });
});

routes.get('/new', (req, res) => {
  res.render('newUser');
});

routes.post('/new', (req, res) => {
  let data = req.body;
  User.create(data, (err, createdUser) => {
    res.redirect('/users');
  });
});

module.exports = routes;
