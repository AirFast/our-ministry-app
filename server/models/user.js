const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { hash, compare } = require('../shared/bcrypt');

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  tokenVersion: { type: Number, default: 0},
  roleId: String,
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  this.password = hash(this.password);
  next();
});

userSchema.methods.comparePassword = function(password) {
  return compare(password, this.password);
};

userSchema.methods.hashTokenVersion = function() {
  return hash(`${this.tokenVersion}`);
};

userSchema.methods.compareTokenVersion = function(hash) {
  return compare(`${this.tokenVersion}`, hash);
};

module.exports = model('User', userSchema);