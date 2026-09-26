const express = require('express');
const router = express.Router();
const { getMessages, createMessage, updateMessageStatus, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getMessages)
  .post(createMessage);

router.route('/:id')
  .delete(protect, deleteMessage);

router.route('/:id/read')
  .put(protect, updateMessageStatus);

module.exports = router;
