const Profile = require('../models/Profile');

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create or update profile
// @route   PUT /api/profile
// @access  Private (Admin)
const updateProfile = async (req, res) => {
  try {
    const { name, title, bio, resumeUrl, email, github, linkedin, phone } = req.body;

    let profile = await Profile.findOne();

    if (profile) {
      // Update existing profile
      profile.name = name || profile.name;
      profile.title = title || profile.title;
      profile.bio = bio !== undefined ? bio : profile.bio;
      profile.resumeUrl = resumeUrl !== undefined ? resumeUrl : profile.resumeUrl;
      profile.email = email || profile.email;
      profile.github = github !== undefined ? github : profile.github;
      profile.linkedin = linkedin !== undefined ? linkedin : profile.linkedin;
      profile.phone = phone !== undefined ? phone : profile.phone;

      const updatedProfile = await profile.save();
      return res.json(updatedProfile);
    } else {
      // Create new profile if none exists
      profile = new Profile({
        name, title, bio, resumeUrl, email, github, linkedin, phone
      });
      const createdProfile = await profile.save();
      return res.status(201).json(createdProfile);
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
