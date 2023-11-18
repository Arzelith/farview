import styles from '../css/NumeratedSectionWrapper.module.css';

const NumeratedSectionWrapper = ({ secNumber, secHeading, children }) => {
  return (
    <div className={`${styles['sec-wrapper']}`}>
      <div className={`${styles['numerator']}`}>{secNumber}</div>
      <p className={`${styles['sec-heading']}`}>{secHeading}</p>
      <div className={`${styles['sec-content']}`}>{children}</div>
    </div>
  );
};

export default NumeratedSectionWrapper;
