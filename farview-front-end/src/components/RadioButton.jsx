import styles from '../css/RadioButton.module.css';

const RadioButton = ({
  name,
  id,
  innerText,
  onChange,
  defaultChecked,
  checked,
  disabled,
}) => {
  return (
    <div className={styles['rb-container']}>
      
      <input
        className={styles['rb-radio']}
        id={id}
        type='radio'
        name={name}
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <label className={styles['rb-label']} htmlFor={id}>
        {innerText}
      </label>
    </div>
  );
};

export default RadioButton;
