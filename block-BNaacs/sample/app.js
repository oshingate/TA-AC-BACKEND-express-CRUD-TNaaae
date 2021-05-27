let express = require('express');
let path = require('path');

let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  let user = { name: 'onkar', age: 24 };
  res.render('index', { user: user });
});

app.listen(3000, () => {
  console.log('server is live on port 3000');
});
