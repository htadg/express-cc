var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = mongoose.model('Student', new Schema({
  enrollment: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  father_name: {
    type: String,
    required: false
  }
}));

module.exports = Student;
