const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);
module.exports = Education;
