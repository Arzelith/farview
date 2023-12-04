import NumeratedSectionWrapper from './NumeratedSectionWrapper';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faLocation,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import appointmentImage from '../assets/images/iStock-930864180.jpg';
import styles from '../css/AppointmentVerification.module.css'

const AppointmentVerification = ({values, moment, inputs, isSubmitting,errors}) => {
  return (
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
  )
}

export default AppointmentVerification