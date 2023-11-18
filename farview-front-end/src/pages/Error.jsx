import {useNavigate} from 'react-router-dom'
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/error.module.css';


const Error = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles['error']}`}>
      <div>
        <FontAwesomeIcon icon={faWarning} />
      </div>
      <div className={`${styles['error-message-container']}`}>
        <p>404</p>
        <p>La página que busca no existe</p>
        <Button onClick={()=>navigate('/')} variant={'light'} innerText={'Volver a inicio'} />
      </div>
    </div>
  );
};

export default Error;
