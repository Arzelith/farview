import * as Yup from 'yup';

const appointmentVal = (minDate, holidays, moment, validateRut, isEmail) => {
  const validationSchema = Yup.object({
    appointmentDate: Yup.date()
      .min(minDate, 'La fecha ingresada no es válida')
      .test(
        'is-holiday',
        'No es posible agendar hora en un día feriado',
        (value) => !holidays.includes(moment(value).format('YYYY-MM-DD'))
      )
      .test(
        'is-sunday',
        'No es posible agendar hora en un día domingo',
        (value) => !value.toString().startsWith('Sun')
      ),
    appointmentHour: Yup.string().required('Debe ingresar la hora de atención'),
    rut: Yup.string()
      .trim()
      .required('Debe ingresar su RUT')
      .test(
        'is-valid-rut-format',
        'Ingrese el RUT sin puntos y con guión',
        (value) => !value.includes('.') && value[value.length - 2] === '-'
      )
      .test('is-valid-rut', 'El RUT ingresado no es válido', (value) =>
        validateRut(value, false)
      ),
    names: Yup.string()
      .trim()
      .required('Debe ingresar sus nombres')
      .max(40, 'Sus nombres no pueden exceder los 40 caracteres'),
    lastNames: Yup.string()
      .trim()
      .required('Debe ingresar sus apellidos')
      .max(40, 'Sus apellidos no pueden exceder los 40 caracteres'),
    email: Yup.string()
      .trim()
      .required('Debe ingresar su email')
      .test('is-valid-email', 'El email ingresado no es válido', (value) =>
        isEmail(value)
      ),
    phone: Yup.string()
      .trim()
      .required('Debe ingresar su número de teléfono')
      .test('is-valid-phone', 'Ingrese solo valores numéricos', (value) =>
        /^[0-9]+$/.test(value)
      ),
  });

  return validationSchema;
};

export default appointmentVal;
