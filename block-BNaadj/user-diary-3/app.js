let express = require('express');
let logger = require('morgan');
let mongoose = require('mongoose');
let userRoutes = require('./routes/user');

mongoose.connect(
  'mongodb://localhost:27017/user2',
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    console.log(err ? err : 'database connected');
  }
);
let app = express();

//middleware
app.use(logger('dev'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('server is live on port 3000');
});
