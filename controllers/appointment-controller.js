const Appointment = require('../models/appointment-model');
const asyncHandler = require('../utils/async-handler');
const RequestError = require('../errors/request-error');
const transporter = require('../utils/email-handler');
const { validateRut } = require('@fdograph/rut-utilities');
const axios = require('axios');
const moment = require('moment');
require('moment/locale/es');
moment().locale('es');

const createAppointment = asyncHandler(async (req, res) => {
  const { rut, names, lastNames, email, phone, appointmentDate, appointmentHour } =
    req.body;
  if (
    !rut ||
    !names ||
    !lastNames ||
    !email ||
    !phone ||
    !appointmentDate ||
    !appointmentHour
  ) {
    throw new RequestError(400, 'Todos los campos son requeridos');
  }
  const reorderedDate = appointmentDate.split('-');
  const foundAppointment = await Appointment.findOne({
    $and: [
      { appointmentDate: `${reorderedDate[2]}-${reorderedDate[1]}-${reorderedDate[0]}` },
      { appointmentHour },
    ],
  });
  if (foundAppointment) {
    throw new RequestError(400, 'Cita no disponible en este horario');
  }
  const pattern = /^[0-9]+$/;
  if (!pattern.test(phone)) {
    throw new RequestError(400, 'El teléfono debe contener solo valores numéricos');
  }
  rutValidation(rut);
  validateHours(appointmentHour);
  await validateDate(appointmentDate);

  const appointment = await Appointment.create({
    rut,
    names,
    lastNames,
    email,
    phone,
    appointmentDate: `${reorderedDate[2]}-${reorderedDate[1]}-${reorderedDate[0]}`,
    appointmentHour,
  });
  await transporter(
    `"Óptica Farview" <${process.env.MAILER_USER}>`,
    email,
    'Cita agendada',
    `<p>Estimado/a ${names} ${lastNames}:</p>
    <p>Se ha reservado una hora para el ${moment(appointmentDate).format(
      'dddd DD MMMM'
    )} a las ${appointmentHour}hrs. Su atención se realizará en nuestra sucursal ubicada en Avenida Siempreviva #742 Springfield. Para una mejor atención recuerde llegar 10 minutos antes de la hora estipulada.<p/>
    <p>Atte: Óptica Farview</p>`
  );
  await transporter(
    `"Óptica Farview" <${process.env.MAILER_USER}>`,
    process.env.MAILER_USER,
    'Cita agendada por cliente',
    `<p>Detalles de cita:</p>
    <p>Nombre: ${names} ${lastNames}</p>
    <p>Rut: ${rut}</p>
    <p>Hora de atención: ${moment(appointmentDate).format(
      'dddd DD MMMM'
    )}, ${appointmentHour}hrs.</p>
    `
  );
  res.status(200).json(appointment);
});

const getDailyAppointments = asyncHandler(async (req, res) => {
  const appointmentDate = req.params.appointment;
  const dailyAppointments = await Appointment.find({ appointmentDate });
  const takenHours = dailyAppointments.map((item) => item.appointmentHour);
  res.status(200).json(takenHours);
});

const rutValidation = (rut) => {
  if (rut.includes('.') || rut[rut.length - 2] != '-') {
    throw new RequestError(400, 'El formato del rut debe ser sin puntos y con guión');
  }
  const isValid = validateRut(rut, false);
  if (!isValid) {
    throw new RequestError(400, 'El rut ingresado no es válido');
  }
};

const validateDate = async (date) => {
  const dateData = date.split('-');
  const currentDate = new Date();
  const maxDate = new Date(new Date().getFullYear(), 11, 31);
  const entryDate = new Date(
    Number(dateData[0]),
    Number(dateData[1]) - 1,
    Number(dateData[2])
  );

  currentDate.setHours(0, 0, 0, 0);
  entryDate.setHours(0, 0, 0, 0);

  if (entryDate < currentDate) {
    throw new RequestError(400, 'La fecha ingresada no puede ser inferior al dia de hoy');
  }
  if (entryDate > maxDate) {
    throw new RequestError(400, 'La fecha ingresada debe pertenecer al año actual');
  }
  const isHoliday = await getHolidays(dateData);
  if (isHoliday) {
    throw new RequestError(400, 'La fecha ingresada no puede ser feriado');
  }
  if (entryDate.getDay() === 0) {
    throw new RequestError(400, 'La fecha ingresada no puede ser domingo');
  }
};

const validateHours = (appointmentHour) => {
  const hours = [];
  for (let hour = 10; hour < 20; hour++) {
    hours.push(moment({ hour }).format('H:mm'));
    for (let times = 1; times < 4; times++) {
      hours.push(
        moment({
          hour,
          minute: 15 * times,
        }).format('H:mm')
      );
    }
  }
  if (!hours.includes(appointmentHour)) {
    throw new RequestError(400, 'La hora ingresada no es válida');
  }
};

const getHolidays = async (datedata) => {
  let holidays;
  let dateData = datedata;
  let isHoliday = false;
  try {
    const response = await axios.get('https://api.boostr.cl/feriados/en.json');
    holidays = response.data.data.map((item) => item.date);
    if (holidays.includes(`${dateData[2]}-${dateData[1]}-${dateData[0]}`)) {
      isHoliday = true;
    }
  } catch (error) {
    throw new RequestError(400, 'Error al intentar obtener feriados desde api externa');
  }
  return isHoliday;
};

module.exports = {
  createAppointment,
  getDailyAppointments,
};
