import Button from './Button';
import styles from '../css/InfoModal.module.css';

const InfoModal = ({ title, message, onClick, type }) => {
  const clickAndReload = () => {
    if (title == '500') {
      window.location.reload(false);
    }
  };
  return (
    <>
      <div className={styles['overlay']}></div>
      <div className={styles['modal-container']}>
        <div className={styles['modal']}>
          <div className={styles['title-container']}>
            {type === 'error' ? `Error: ${title}` : title}
          </div>
          <hr />
          <div className={styles['message-container']}>
            <p>{message}</p>
          </div>
          <hr />
          <div className={styles['btn-container']}>
            <Button
              onClick={title == '500' ? clickAndReload : onClick}
              variant={'default'}
              innerText={'Aceptar'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoModal;
