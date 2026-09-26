const Achievement = require('../models/Achievement');

const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({}).sort({ order: 1, createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createAchievement = async (req, res) => {
  try {
    const { title, description, order } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const achievement = new Achievement({ title, description, order });
    const created = await achievement.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

const updateAchievement = async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const achievement = await Achievement.findById(req.params.id);
    if (achievement) {
      achievement.title = title || achievement.title;
      achievement.description = description || achievement.description;
      achievement.order = order !== undefined ? order : achievement.order;
      const updated = await achievement.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (achievement) {
      res.json({ message: 'Removed' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAchievements, createAchievement, updateAchievement, deleteAchievement };
