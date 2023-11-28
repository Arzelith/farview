const express = require('express');
const { logout } = require('../controllers/logout-controller');
const router = express.Router();

router.route('/').get(logout);

module.exports = router;
