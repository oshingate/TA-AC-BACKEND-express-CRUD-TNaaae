let express = require('express');
let mongoose = require('mongoose');
let logger = require('morgan');

let userRouter = require('./routes/users');

//database connect

mongoose.connect(
  'mongodb://localhost:27017/test',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err ? err : 'db connected');
  }
);

let app = express();
//logger

app.use(logger('dev'));

//view setters

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//json/form/static

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

//middlewares

//routers

app.use('/users', userRouter);

//error handling middlewares
app.use((req, res, next) => {
  res.send('404 page not found');
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(3000, () => {
  console.log('server is live on port 3000');
});
