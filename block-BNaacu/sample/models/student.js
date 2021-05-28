let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let studentSchema = new Schema(
  {
    name: String,
    email: String,
    gender: String,
  },
  { timestamps: true }
);

let Student = mongoose.model('Student', studentSchema);

module.exports = Student;
