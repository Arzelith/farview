import styles from '../css/Card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Card = ({ isAboutCard, icon, title, content }) => {
  return (
    <div className={`${styles['card']}`}>
      {!isAboutCard && (
        <div className={`${styles['card-image']}`}>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className={`${styles['card-body']}`}>
        <h5 className={`${styles['title']}`}>{title}</h5>
        {isAboutCard && <hr />}
        <div className={`${styles['content-container']}`}>
          <p className={`${styles['content']}`}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
