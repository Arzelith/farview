const express = require('express');
const {
  createAppointment,
  getDailyAppointments,
} = require('../controllers/appointment-controller');
const router = express.Router();

router.route('/').post(createAppointment)
router.route('/:appointment').get(getDailyAppointments)

module.exports = router;
