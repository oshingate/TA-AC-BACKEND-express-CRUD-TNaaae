let express = require('express');
let User = require('../models/user');

let routes = express.Router();

//all users (Read)

routes.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('usersList', { users: users });
  });
});

// new user (Create)

routes.get('/new', (req, res, next) => {
  res.render('newUserForm');
});

routes.post('/new', (req, res, next) => {
  let data = req.body;

  User.create(data, (err, createdUser) => {
    if (err) return next(err);

    res.redirect('/users');
  });
});

// get seperate user details

routes.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    res.render('userDetails', { user: user });
  });
});

//edit user (Update)

routes.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.render('editUserForm', { user: user });
  });
});

routes.post('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  User.findByIdAndUpdate(id, data, (err, updatedUser) => {
    if (err) return next(err);

    res.redirect('/users');
  });
});

//delete

routes.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndDelete(id, (err, deletedUser) => {
    if (err) return next(err);

    res.redirect('/users');
  });
});

module.exports = routes;
