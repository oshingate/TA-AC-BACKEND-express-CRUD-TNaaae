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

routes.get('/:id', (req, res, next) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.render('userDetails', { user: user });
  });
});

routes.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    res.render('updateUserForm', { user: user });
  });
});

routes.post('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  User.findByIdAndUpdate(id, data, (err, user) => {
    res.redirect('/users/' + id);
  });
});

routes.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndDelete(id, (err, removeduser) => {
    if (err) return next(err);
    res.redirect('/users/');
  });
});

module.exports = routes;
