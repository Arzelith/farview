import styles from '../css/RadioButton.module.css';

const RadioButton = ({
  name,
  id,
  innerText,
  onChange,
  defaultChecked,
  checked,
  disabled,
  taken,
  value,
}) => {
  return (
    <div className={styles['rb-container']}>
      <input
        value={value}
        className={styles['rb-radio']}
        id={id}
        type='radio'
        name={name}
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <label className={taken ? styles['taken-label'] : styles['rb-label']} htmlFor={id}>
        {innerText}
      </label>
    </div>
  );
};

export default RadioButton;
