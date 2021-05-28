let express = require('express');
let mongoose = require('mongoose');
let logger = require('morgan');
let ejs = require('ejs');

let usersRoutes = require('./routes/users');

let app = express();
//mongoose
mongoose.connect(
  'mongodb://localhost:27017/test',
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    console.log(err ? err : 'database connected');
  }
);
//logger

app.use(logger('dev'));
//controll middlewares

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//routes handler
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/users', usersRoutes);

//errror handler

app.use((req, res, next) => {
  res.status(404).send('404 page not found');
});

app.listen(3000, () => {
  console.log('Server is live on port 3000');
});
