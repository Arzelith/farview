const express = require('express');
const {
  createAppointment,
  getDailyAppointments,
} = require('../controllers/appointment-controller');
const router = express.Router();
const auth = require('../middlewares/auth-handler');

router.route('/').post(createAppointment)
router.route('/:appointment').get(getDailyAppointments)

module.exports = router;
