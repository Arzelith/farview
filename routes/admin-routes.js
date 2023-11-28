const express = require('express');
const {
  getCurrentAdmin,
  updateCurrentAdminCredentials,
} = require('../controllers/admin-controller');
const router = express.Router();
const auth = require('../middlewares/auth-handler');

router.route('/current').get(auth, getCurrentAdmin);
router.route('/current/credentials').patch(auth, updateCurrentAdminCredentials);

module.exports = router;
