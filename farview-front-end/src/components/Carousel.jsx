import logos from '../utils/brand-logos';
import styles from '../css/Carousel.module.css';

const Carousel = () => {
  return (
    <div className={`container`}>
      <div className={`${styles['carousel']}`}>
        <div className={`${styles['carousel-track']}`}>
          {logos.map((logo) => (
            <div key={logo.id} className={`${styles['slide']}`}>
              <img src={logo.src} alt='logo-img' />
            </div>
          ))}

          {logos.map((logo) => (
            <div key={`${logo.id}copy`} className={`${styles['slide']}`}>
              <img src={logo.src} alt='logo-img' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
