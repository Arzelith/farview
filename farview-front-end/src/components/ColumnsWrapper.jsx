import styles from '../css/ColumnsWrapper.module.css';

const ColumnsWrapper = ({ children, className, oneColumn }) => {
  return (
    <div
      className={`${
        oneColumn ? styles['one-column'] : styles['even-columns']
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ColumnsWrapper;
