const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  name: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  roleId: String,
});

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
    });
  });
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('User', userSchema);