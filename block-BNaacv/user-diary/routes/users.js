let express = require('express');
let User = require('../models/user');

let routes = express.Router();

routes.get('/', (req, res) => {
  User.find({}, (err, list) => {
    res.render('list', { users: list });
  });
});

routes.get('/get/:id', (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    res.render('list', { users: [user] });
  });
});

routes.get('/new', (req, res) => {
  res.render('newForm');
});

routes.post('/new', (req, res) => {
  let data = req.body;
  User.create(data, (err, user) => {
    res.render('list', { users: [user] });
  });
});

routes.delete('/get/:id', (req, res) => {
  let id = req.params.id;
  User.findByIdAndDelete(id, (err, deleted) => {
    res.render('list', { users: [deleted] });
  });
});

routes.put('/update/:id', (req, res) => {
  let id = req.params.id;
  let data = req.body;
  User.findByIdAndUpdate(id, data, (err, updated) => {
    res.render('list', { users: [updated] });
  });
});

module.exports = routes;
