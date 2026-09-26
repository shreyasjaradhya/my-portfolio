const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String },
  resumeUrl: { type: String },
  email: { type: String, required: true },
  github: { type: String },
  linkedin: { type: String },
  phone: { type: String }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
