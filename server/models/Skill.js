const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Frontend', 'Backend', 'Tools'
  iconUrl: { type: String },
  proficiency: { type: Number, min: 1, max: 100 },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
