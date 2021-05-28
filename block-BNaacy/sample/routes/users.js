let express = require('express');
let User = require('../models/user');

let router = express.Router();

router.get('/new', (req, res) => {
  res.render('newForm');
});

router.post('/', (req, res) => {
  let data = req.body;
  User.create(data, (err, createdUser) => {
    res.render('newUserDisplay', { user: createdUser });
  });
});

module.exports = router;
