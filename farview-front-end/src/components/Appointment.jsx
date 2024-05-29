import { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosPublic } from '../Api/axios';
import handleServerError from '../utils/serverErrorHandler';
import { Formik, Form } from 'formik';
import appointmentVal from '../utils/forms-validations/appointment-validations';
import SectionWrapper from './SectionWrapper';
import AppointmentTime from './AppointmentTime';
import AppointmentUserDetails from './AppointmentUserDetails';
import AppointmentVerification from './AppointmentVerification';
import InfoModal from './InfoModal';
import isEmail from 'validator/lib/isEmail';
import { validateRut } from '@fdograph/rut-utilities';
import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';
import 'moment/locale/es';
moment().locale('es');
import FormikValueObserver from '../utils/FormikValueObserver';
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
currentDate.setHours(0, 0, 0, 0);
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

//PENDIENTE MODAL DE CONFIRMACIÓN

const Appointment = () => {
  const [hourChecked, setHourChecked] = useState(-1);
  const [holidays, setHolidays] = useState([]);
  const [holidaysLoading, setHolidaysLoading] = useState(false);
  const [currentSelectedDate, setCurrentSelectedDate] = useState(
    initialValues.appointmentDate
  );
  const [takenHours, setTakenHours] = useState([]);
  const [serverError, setServerError] = useState();
  const [appointmentSuccess, setAppointmentSuccess] = useState();

  const getHoliDays = async () => {
    try {
      setHolidaysLoading(true);
      const response = await axios.get(
        'https://api.boostr.cl/feriados/en.json'
      );
      const holidays = response.data.data.map((item) => item.date);
      setHolidays(holidays);
      setHolidaysLoading(false);
    } catch (error) {
      console.log(error);
      setHolidaysLoading(false);
    }
  };

  const getDailyAppointments = async () => {
    try {
      const response = await axiosPublic.get(
        `/appointment/${moment(currentSelectedDate).format('DD-MM-YYYY')}`
      );
      setTakenHours(response.data);
    } catch (error) {
      const serverError = handleServerError(error);
      setServerError({ title: serverError.status, message: serverError.message });
    }
  };

  const makeAppointment = async (values, actions) => {
    try {
      const response = await axiosPublic.post('/appointment', values);
      actions.setSubmitting(false);
      actions.resetForm();
      setHourChecked(-1);
      setAppointmentSuccess(response.data);
    } catch (error) {
      actions.setSubmitting(false);
      const serverError = handleServerError(error);
      setServerError({ title: serverError.status, message: serverError.message });
    }
  };

  const isTaken = (item) => {
    let isTaken = false;
    const now = new Date();
    const dateData = currentSelectedDate.split('-');
    const currentItemHour = item.split(':');
    const current = new Date(
      Number(dateData[0]),
      Number(dateData[1]) - 1,
      Number(dateData[2])
    );
    current.setHours(Number(currentItemHour[0]), Number(currentItemHour[1]));
    if (takenHours.includes(item) || now > current) {
      isTaken = true;
    }
    return isTaken;
  };

  useEffect(() => {
    getHoliDays();
  }, []);

  useEffect(() => {
    getDailyAppointments();
  }, [currentSelectedDate]);

  return (
    <SectionWrapper
      id={'appointment'}
      heading={'Agenda tu cita'}
      isDecorator={true}
      SectionType={'appointment'}
      oneColumn={true}
    >
      {serverError && (
        <InfoModal
          type={'error'}
          title={serverError.title}
          message={serverError.message}
          onClick={() => setServerError(null)}
        />
      )}
      {appointmentSuccess && (
        <InfoModal
          type={'success'}
          title={'Cita agendada con éxito'}
          message={`Se ha reservado una hora para el ${moment(currentSelectedDate).format(
            'dddd DD MMMM'
          )} a las ${appointmentSuccess.appointmentHour}hrs a nombre de ${
            appointmentSuccess.names
          } ${appointmentSuccess.lastNames}. Detalles adicionales se han enviado a ${
            appointmentSuccess.email
          }.`}
          onClick={() => setAppointmentSuccess(null)}
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={appointmentVal(minDate, holidays, moment, validateRut, isEmail)}
        onSubmit={async (values, actions) => {
          await makeAppointment(values, actions);
        }}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => (
          <Form className={`${styles['appointment-form']}`}>
            <FormikValueObserver
              onChange={(values) => {
                setCurrentSelectedDate(values.appointmentDate);
              }}
            />
            <AppointmentTime
              today={today}
              lastDayOfYear={lastDayOfYear}
              isSubmitting={isSubmitting}
              holidaysLoading={holidaysLoading}
              moment={moment}
              values={values}
              hours={hours}
              currentSelectedDate={currentSelectedDate}
              isTaken={isTaken}
              hourChecked={hourChecked}
              setFieldValue={setFieldValue}
              setHourChecked={setHourChecked}
            />
            <AppointmentUserDetails inputs={inputs} />
            <AppointmentVerification
              values={values}
              moment={moment}
              inputs={inputs}
              isSubmitting={isSubmitting}
              errors={errors}
            />
          </Form>
        )}
      </Formik>
    </SectionWrapper>
  );
};

export default Appointment;
