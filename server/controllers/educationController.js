const Education = require('../models/Education');

// @desc    Get all education
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res) => {
  try {
    const education = await Education.find({}).sort({ order: 1, startDate: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch education' });
  }
};

// @desc    Create an education record
// @route   POST /api/education
// @access  Private
const createEducation = async (req, res) => {
  try {
    const { institution, degree, startDate, endDate, description, order } = req.body;

    if (!institution || !degree || !startDate) {
      return res.status(400).json({ message: 'Institution, degree, and start date are required' });
    }

    const education = new Education({
      institution,
      degree,
      startDate,
      endDate,
      description,
      order
    });

    const createdEducation = await education.save();
    res.status(201).json(createdEducation);
  } catch (error) {
    res.status(400).json({ message: 'Invalid education data' });
  }
};

// @desc    Update an education record
// @route   PUT /api/education/:id
// @access  Private
const updateEducation = async (req, res) => {
  try {
    const { institution, degree, startDate, endDate, description, order } = req.body;
    const education = await Education.findById(req.params.id);

    if (education) {
      education.institution = institution || education.institution;
      education.degree = degree || education.degree;
      education.startDate = startDate || education.startDate;
      education.endDate = endDate !== undefined ? endDate : education.endDate;
      education.description = description !== undefined ? description : education.description;
      education.order = order !== undefined ? order : education.order;

      const updatedEducation = await education.save();
      res.json(updatedEducation);
    } else {
      res.status(404).json({ message: 'Education not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid education data' });
  }
};

// @desc    Delete an education record
// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (education) {
      res.json({ message: 'Education removed' });
    } else {
      res.status(404).json({ message: 'Education not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to delete education' });
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
};
