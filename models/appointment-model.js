const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const AppointmentSchema = mongoose.Schema({
  rut: {
    type: String,
    trim: true,
  },
  names: {
    type: String,
    required: [true, 'Los nombres son requeridos'],
    maxlength: [40, 'Los nombres pueden tener más de 40 caracteres'],
    trim: true,
  },
  lastNames: {
    type: String,
    required: [true, 'Los apellidos son requeridos'],
    maxlength: [40, 'Los apellidos pueden tener más de 40 caracteres'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: 'El email ingresado no es válido',
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  appointmentDate: {
    type: String,
    required: true,
    trim: true,
  },
  appointmentHour: {
    type: String,
    required: true,
    trim: true,
  },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
