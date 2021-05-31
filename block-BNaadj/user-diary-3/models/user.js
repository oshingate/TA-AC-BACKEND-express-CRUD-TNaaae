let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  age: Number,
  address: String,
  bio: String,
  hobbies: [String],
});

let User = mongoose.model('User', userSchema);

module.exports = User;
