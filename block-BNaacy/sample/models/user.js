let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: String,
    email: String,
    sports: [String],
  },
  { timestamps: true }
);

let User = mongoose.model('User', userSchema);

module.exports = User;
