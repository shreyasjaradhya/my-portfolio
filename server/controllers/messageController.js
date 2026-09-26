const Message = require('../models/Message');

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private (Admin)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    const { senderName, senderEmail, subject, message } = req.body;

    if (!senderName || !senderEmail || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new Message({
      senderName,
      senderEmail,
      subject,
      message
    });

    const created = await newMessage.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Update message read status
// @route   PUT /api/messages/:id/read
// @access  Private (Admin)
const updateMessageStatus = async (req, res) => {
  try {
    const { isRead } = req.body;
    const message = await Message.findById(req.params.id);

    if (message) {
      message.isRead = isRead !== undefined ? isRead : message.isRead;
      const updated = await message.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private (Admin)
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (message) {
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getMessages,
  createMessage,
  updateMessageStatus,
  deleteMessage
};
