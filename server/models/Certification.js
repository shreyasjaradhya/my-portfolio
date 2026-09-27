const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  fileUrl: { type: String, default: '' },
  fileType: { type: String, enum: ['pdf', 'image', ''], default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Certification = mongoose.model('Certification', certificationSchema);
module.exports = Certification;
