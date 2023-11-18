import styles from '../css/Button.module.css';

const Button = ({ type, onClick, innerText, variant, isSubmitting }) => {
  const classes = () => {
    let btnClases = '';
    if (variant === 'default') {
      btnClases = `${styles['btn-default']} ${styles['border-radius-100']} ${styles['fit-content']}`;
    }
    if (variant === 'variable-b-radius') {
      btnClases = `${styles['btn-default']} ${styles['variable-b-radius']} `;
    }
    if (variant === 'light') {
      btnClases = `${styles['btn-light']}`;
    }

    return btnClases;
  };

  return (
    <button className={classes()} type={type} onClick={onClick} disabled={isSubmitting}>
      {innerText}
    </button>
  );
};

export default Button;
