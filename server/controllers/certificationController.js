const Certification = require('../models/Certification');

const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find({}).sort({ order: 1, createdAt: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createCertification = async (req, res) => {
  try {
    const { title, issuer, date, fileUrl, fileType, order } = req.body;
    if (!title || !issuer || !date) {
      return res.status(400).json({ message: 'Title, issuer, and date are required' });
    }
    const certification = new Certification({ title, issuer, date, fileUrl, fileType, order });
    const created = await certification.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

const updateCertification = async (req, res) => {
  try {
    const { title, issuer, date, fileUrl, fileType, order } = req.body;
    const certification = await Certification.findById(req.params.id);
    if (certification) {
      certification.title = title || certification.title;
      certification.issuer = issuer || certification.issuer;
      certification.date = date || certification.date;
      if (fileUrl !== undefined) certification.fileUrl = fileUrl;
      if (fileType !== undefined) certification.fileType = fileType;
      certification.order = order !== undefined ? order : certification.order;
      const updated = await certification.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (certification) {
      res.json({ message: 'Removed' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getCertifications, createCertification, updateCertification, deleteCertification };
