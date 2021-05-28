let express = require('express');
let path = require('path');
let logger = require('morgan');
let mongoose = require('mongoose');

let Student = require('./models/student');

let app = express();

mongoose.connect(
  'mongodb://localhost:27017/test',
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    console.log(err ? err : 'database connected');
  }
);

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  let user = { name: 'onkar', age: 24 };
  res.render('index', { user: user });
});

app.get('/students/new', (req, res) => {
  res.render('newForm');
});

app.post('/students', (req, res) => {
  data = req.body;

  Student.create(data, (err, student) => {
    if (err) {
      console.log(err);
    } else {
      res.json(student);
    }
  });
});

app.get('/students', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      console.log(err);
    } else {
      res.render('list', { students: students });
    }
  });
});

app.get('/students/:id', (req, res) => {
  let id = req.params.id;

  Student.findById(id, (err, student) => {
    res.render('list', { students: [student] });
  });
});

app.listen(3000, () => {
  console.log('server is live on port 3000');
});
