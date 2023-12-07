import Hero from './Hero';
import Carousel from './Carousel';
import Decorator from './Decorator';
import styles from '../css/Header.module.css';

const Header = () => {
  return (
    <>
      <header id='header' className={`${styles['header']}`}>
        <Hero />
        <Carousel />
      </header>
      <Decorator type={'section-decorator'} />
    </>
  );
};

export default Header;
