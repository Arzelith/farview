import ColumnsWrapper from '../components/ColumnsWrapper';
import Button from './Button';
import headerImage from '../assets/images/header-image.png';
import styles from '../css/Hero.module.css';

const Hero = () => {
  return (
    <div className='container'>
      <ColumnsWrapper>
        <div className={`${styles['column-a']}`}>
          <div>
            <h1>
              INNOVACIÓN <span className={`${styles['span-a']}`}>&</span>{' '}
              <span className={`${styles['span-b']}`}>TECNOLOGÍA</span>{' '}
              <span className={`${styles['span-c']}`}>- PARA TUS OJOS -</span>
            </h1>
            <p>Avenida Siempreviva #742, Springfield</p>
          </div>
          <div className={`${styles['btn-container']}`}>
            <Button variant={'default'} type={'button'} innerText={'Agenda tu cita'} />
          </div>
        </div>
        <div className={`${styles['column-b']}`}>
          <img
            className={`${styles['hero-image']}`}
            src={headerImage}
            alt='header-image'
          />
        </div>
      </ColumnsWrapper>
    </div>
  );
};

export default Hero;
