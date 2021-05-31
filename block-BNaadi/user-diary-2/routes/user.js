let express = require('express');
let User = require('../models/user');

let routes = express.Router();

// get all users

routes.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('userList', { users: users });
  });
});

//get usert by id

routes.get('/:id', (req, res, next) => {
  let id = req.params.id;

  User.findById(id, (err, user) => {
    if (err) return next(err);

    res.render('userDetails', { user: user });
  });
});

//create new user

routes.post('/', (req, res, next) => {
  let data = req.body;

  User.create(data, (err, createdUser) => {
    if (err) return next(err);
    res.redirect('/users/');
  });
});

//edit new user

routes.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  User.findByIdAndUpdate(id, data, (err, updatedUser) => {
    if (err) return next(err);
    res.json(updatedUser);
  });
});

//delete

routes.delete('/:id', (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndDelete(id, (err, deleted) => {
    if (err) return next(err);
    res.json(deleted);
  });
});

module.exports = routes;
