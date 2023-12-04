import NumeratedSectionWrapper from './NumeratedSectionWrapper';
import Input from './Input';
import RadioButton from './RadioButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import styles from '../css/AppointmentTime.module.css';

const AppointmentTime = ({
  today,
  lastDayOfYear,
  isSubmitting,
  holidaysLoading,
  moment,
  values,
  hours,
  currentSelectedDate,
  isTaken,
  hourChecked,
  setFieldValue,
  setHourChecked,
}) => {
  return (
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
        <label>Horarios disponibles:</label>
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
              value={new Date(currentSelectedDate).setHours(
                Number(item.split(':')[0]),
                Number(item.split(':')[1])
              )}
              taken={isTaken(item, index)}
              id={`radio${item}`}
              name={'radioHours'}
              innerText={item}
              checked={hourChecked === index}
              disabled={isSubmitting || isTaken(item, index)}
              onChange={() => {
                setFieldValue('appointmentHour', item);
                setHourChecked(index);
              }}
            />
          ))}
        </div>
      </div>
    </NumeratedSectionWrapper>
  );
};

export default AppointmentTime;
