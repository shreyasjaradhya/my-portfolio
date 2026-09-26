const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({}).sort({ order: 1, createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch skills' });
  }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res) => {
  try {
    const { name, category, proficiency, iconUrl, order } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: 'Name and category are required' });
    }

    const skill = new Skill({
      name,
      category,
      proficiency,
      iconUrl,
      order
    });

    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(400).json({ message: 'Invalid skill data' });
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  try {
    const { name, category, proficiency, iconUrl, order } = req.body;
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      skill.name = name || skill.name;
      skill.category = category || skill.category;
      skill.proficiency = proficiency !== undefined ? proficiency : skill.proficiency;
      skill.iconUrl = iconUrl || skill.iconUrl;
      skill.order = order !== undefined ? order : skill.order;

      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid skill data' });
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (skill) {
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to delete skill' });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
};
