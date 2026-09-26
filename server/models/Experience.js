const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  isCurrent: { type: Boolean, default: false },
  description: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;
