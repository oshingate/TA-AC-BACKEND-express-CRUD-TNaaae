let express = require('express');
let logger = require('morgan');
let mongoose = require('mongoose');
let usersRoutes = require('./routes/users');
const User = require('./models/users');

let app = express();
//connecting database
mongoose.connect(
  'mongodb://localhost:27017/test',
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    console.log(err ? err : 'database connected');
  }
);

//setting views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//logger middleware
app.use(logger('dev'));

//middlewares
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

//routers

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/users', usersRoutes);

//error middlewares

app.use((req, res) => {
  res.send('404-page not found');
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(3000, () => {
  console.log('server is live on port 3000');
});
