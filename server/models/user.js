const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  name: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  roleId: String,
});

module.exports = model('User', userSchema);