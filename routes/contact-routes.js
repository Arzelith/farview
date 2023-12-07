const express = require('express');
const { sendMessage } = require('../controllers/contact-controller');
const router = express.Router();

router.route('/').post(sendMessage);

module.exports = router;
