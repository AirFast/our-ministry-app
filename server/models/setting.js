const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const settingSchema = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  value: { type: String, default: '' },
});

module.exports = model('Setting', settingSchema);