const Experience = require('../models/Experience');

// @desc    Get all experience
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find({}).sort({ order: 1, startDate: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch experience' });
  }
};

// @desc    Create an experience record
// @route   POST /api/experience
// @access  Private
const createExperience = async (req, res) => {
  try {
    const { company, role, startDate, endDate, isCurrent, description, order } = req.body;

    if (!company || !role || !startDate) {
      return res.status(400).json({ message: 'Company, role, and start date are required' });
    }

    const experience = new Experience({
      company,
      role,
      startDate,
      endDate,
      isCurrent,
      description,
      order
    });

    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
  } catch (error) {
    res.status(400).json({ message: 'Invalid experience data' });
  }
};

// @desc    Update an experience record
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = async (req, res) => {
  try {
    const { company, role, startDate, endDate, isCurrent, description, order } = req.body;
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      experience.company = company || experience.company;
      experience.role = role || experience.role;
      experience.startDate = startDate || experience.startDate;
      experience.endDate = endDate !== undefined ? endDate : experience.endDate;
      experience.isCurrent = isCurrent !== undefined ? isCurrent : experience.isCurrent;
      experience.description = description !== undefined ? description : experience.description;
      experience.order = order !== undefined ? order : experience.order;

      const updatedExperience = await experience.save();
      res.json(updatedExperience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid experience data' });
  }
};

// @desc    Delete an experience record
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (experience) {
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to delete experience' });
  }
};

module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
};
