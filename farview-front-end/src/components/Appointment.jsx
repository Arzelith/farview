import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import SectionWrapper from './SectionWrapper';
import NumeratedSectionWrapper from './NumeratedSectionWrapper';
import Input from './Input';
import Button from './Button';
import RadioButton from './RadioButton';
import * as Yup from 'yup';
import isEmail from 'validator/lib/isEmail';
import { validateRut } from '@fdograph/rut-utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faUser,
  faEnvelope,
  faPhone,
  faLocation,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';
import 'moment/locale/es';
moment().locale('es');
import appointmentImage from '../assets/images/iStock-930864180.jpg';
import styles from '../css/Appointment.module.css';

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

const inputs = [
  { label: 'RUT', placeHolder: '00000000-0', icon: faUser, name: 'rut' },
  { label: 'Nombres', placeHolder: 'Ingrese sus nombres', icon: faUser, name: 'names' },
  {
    label: 'Apellidos',
    placeHolder: 'Ingrese sus apellidos',
    icon: faUser,
    name: 'lastNames',
  },
  { label: 'Email', placeHolder: 'Ingrese su Email', icon: faEnvelope, name: 'email' },
  { label: 'Teléfono', placeHolder: 'Ingrese su teléfono', icon: faPhone, name: 'phone' },
];

let currentDate = new Date();
let minDate = new Date();
let maxDate = new Date(new Date().getFullYear(), 11, 31);
minDate.setHours(0, 0, 0, 0);
maxDate.setHours(0, 0, 0, 0);
let today = currentDate.toISOString().substring(0, 10);
let lastDayOfYear = maxDate.toISOString().substring(0, 10);

const initialValues = {
  rut: '',
  names: '',
  lastNames: '',
  email: '',
  phone: '',
  appointmentDate: today,
  appointmentHour: '',
};

//PENDIENTE MODAL DE CONFIRMACIÓN & ERROR
//PENDIENTE VALIDACION DE DIAS FESTIVOS

const Appointment = () => {
  const [hourChecked, setHourChecked] = useState(-1);
  const [holidays, setHolidays] = useState([]);
  const [holidaysLoading, setHolidaysLoading] = useState(false);

  const getHoliDays = async () => {
    try {
      setHolidaysLoading(true);
      const response = await axios.get(
        'https://api.victorsanmartin.com/feriados/en.json'
      );
      const holidays = response.data.data.map((item) => item.date);
      setHolidays(holidays);
      setHolidaysLoading(false);
    } catch (error) {
      console.log(error);
      setHolidaysLoading(false);
    }
  };

  useEffect(() => {
    getHoliDays();
  }, []);

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

  return (
    <SectionWrapper
      id={'appointment'}
      heading={'Agenda tu cita'}
      isDecorator={true}
      SectionType={'appointment'}
      oneColumn={true}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log({ ...values });
            actions.setSubmitting(false);
            setHourChecked(0);
            actions.resetForm();
          }, '1000');
        }}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => (
          <Form className={`${styles['appointment-form']}`}>
            <NumeratedSectionWrapper
              secNumber={'1'}
              secHeading={'¿Cuando desea su exámen visual?'}
            >
              <Input
                labelText={'Fecha:'}
                variant={'outlined-sm'}
                name='appointmentDate'
                type='date'
                min={today}
                max={lastDayOfYear}
                disabled={isSubmitting || holidaysLoading}
              />
              <div className={`${styles['selected-date']}`}>
                <FontAwesomeIcon icon={faCalendar} />
                <p>{moment(values.appointmentDate).format('dddd DD MMMM YYYY')}</p>
              </div>

              <div className={`${styles['input-group']}`}>
                <label>Horario:</label>
                <Input
                  name={'appointmentHour'}
                  hidden={true}
                  variant={'outlined-sm'}
                  type={'text'}
                />

                <div className={`${styles['hours-container']}`}>
                  {hours.map((item, index) => (
                    <RadioButton
                      key={item}
                      id={`radio${item}`}
                      name={'radioHours'}
                      innerText={item}
                      checked={hourChecked === index}
                      disabled={isSubmitting}
                      onChange={() => {
                        setFieldValue('appointmentHour', item);
                        setHourChecked(index);
                      }}
                    />
                  ))}
                </div>
              </div>
            </NumeratedSectionWrapper>
            <NumeratedSectionWrapper secNumber={'2'} secHeading={'cuentanos Sobre ti'}>
              {inputs.map((input) => (
                <Input
                  icon={input.icon}
                  key={input.label}
                  name={input.name}
                  type={'text'}
                  variant={'iconed-sm'}
                  labelText={input.label}
                  placeholder={input.placeHolder}
                  autoComplete='off'
                />
              ))}
            </NumeratedSectionWrapper>

            <NumeratedSectionWrapper
              secNumber={'3'}
              secHeading={'Verificación y confirmación'}
            >
              <div className={`${styles['appointment-details']}`}>
                <div className={styles[`col-a`]}>
                  <h3 className={`${styles['details-header']}`}>Detalle de la Cita</h3>
                  <div>
                    <FontAwesomeIcon icon={faLocation} />
                    <p>Avenida siempreviva #742, Springfield</p>
                  </div>
                  {values.appointmentDate && values.appointmentHour && (
                    <div>
                      <FontAwesomeIcon icon={faCalendar} />
                      <p>{`${moment(values.appointmentDate).format(
                        'dddd DD MMMM YYYY'
                      )} ${values.appointmentHour}`}</p>
                    </div>
                  )}
                  {inputs.map((confirmation) => (
                    <div key={`${confirmation.label}confirmation`}>
                      {values[`${confirmation.name}`] && (
                        <>
                          <FontAwesomeIcon icon={confirmation.icon} />
                          <p>{values[`${confirmation.name}`]}</p>
                        </>
                      )}
                    </div>
                  ))}

                  {Object.values(errors).every((v) => v === false) ? null : (
                    <div>
                      <FontAwesomeIcon icon={faX} className={`${styles['red-icon']}`} />
                      <p className={`${styles['general-error']}`}>
                        algunos datos se encuentran erróneos o incompletos
                      </p>
                    </div>
                  )}

                  <Button
                    type={'submit'}
                    variant={'default'}
                    innerText={isSubmitting ? 'Enviando...' : 'Confirmar cita'}
                    isSubmitting={isSubmitting}
                  />
                </div>
                <div className={styles[`col-b`]}>
                  <img alt='appointment-image' src={appointmentImage} />
                </div>
              </div>
            </NumeratedSectionWrapper>
          </Form>
        )}
      </Formik>
    </SectionWrapper>
  );
};

export default Appointment;
