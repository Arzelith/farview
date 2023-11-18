import { Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../css/Input.module.css';

const Input = ({
  labelText,
  placeholder,
  type,
  name,
  autoComplete,
  as,
  rows,
  disabled,
  icon,
  variant,
  hidden,
  min,
  max
}) => {
  const classes = () => {
    const inputClases = {
      container: '',
      group: '',
      label: '',
      field: '',
      errorMessage: '',
    };
    if (variant === 'iconed-sm') {
      inputClases.container = `${styles['input-container-md']}`;
      inputClases.inputGroup = `${styles['iconed-input-group']}`;
      inputClases.label = `${styles['iconed-input-label']}`;
      inputClases.field = `${styles['iconed-input-sm']}`;
      inputClases.errorMessage = `${styles['error-message-md']}`;
    }

    if (variant === 'outlined-sm') {
      inputClases.container = `${styles['input-container-md']}`;
      inputClases.inputGroup = `${styles['input-group']}`;
      inputClases.field = `${styles['outlined-input']} ${styles['outlined-input-sm']}`;
      inputClases.errorMessage = `${styles['error-message-md']}`;
    }

    if (variant === 'outlined-md') {
      inputClases.container = `${styles['input-container-md']}`;
      inputClases.inputGroup = `${styles['input-group']}`;
      inputClases.field = `${styles['outlined-input']} ${styles['outlined-input-md']}`;
      inputClases.errorMessage = `${styles['error-message-md']}`;
    }

    if (variant === 'outlined-xl') {
      inputClases.container = `${styles['input-container-xl']}`;
      inputClases.field = `${styles['outlined-input']} ${styles['outlined-input-xl']}`;
      inputClases.errorMessage = `${styles['error-message-xl']}`;
    }
    return inputClases;
  };

  return (
    <div className={classes()?.container}>
      <div className={classes()?.inputGroup}>
        <label className={classes()?.label}>{labelText}</label>
        {variant === 'iconed-sm' && <FontAwesomeIcon icon={icon} />}
        <Field
          className={classes().field}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          name={name}
          disabled={disabled}
          as={as}
          rows={rows}
          hidden={hidden}
          min={min}
          max={max}
        />
      </div>

      <ErrorMessage name={name} component={'label'} className={classes()?.errorMessage} />
    </div>
  );
};

export default Input;
