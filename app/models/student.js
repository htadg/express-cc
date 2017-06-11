var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = new Schema({
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
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
});

Student.pre('save', function(next){
  var user = this;
  now = new Date();
  user.updated_at = now;
  if ( !user.created_at ) {
    user.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Student', Student);
