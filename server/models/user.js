const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  name: String,
  email: String,
  password: String,
  roleId: String,
});

module.exports = model('User', userSchema);