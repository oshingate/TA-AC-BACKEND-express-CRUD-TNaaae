let express = require('express');
let mongoose = require('mongoose');
let logger = require('morgan');

let userRoutes = require('./routes/user');

let app = express();

//databas connection

mongoose.connect(
  'mongodb://localhost:27017/user',
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    console.log(err ? err : 'database connected');
  }
);
//logger
app.use(logger('dev'));

//basic middlewares
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

//route handlers

app.use('/users', userRoutes);

//error handling middlewares

app.use((req, res, next) => {
  res.send('404-page not found');
});

app.use((err, req, res, next) => {
  res.send(err);
});

//listener

app.listen(3000, () => {
  console.log('server is live on port 3000');
});
