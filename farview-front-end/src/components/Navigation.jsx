import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScreenSize from '../hooks/useScreenSize';
import styles from '../css/Navigation.module.css';
import brand from '../assets/images/nav-brand.svg';
import hamburger from '../assets/images/icon-hamburger.svg';

let offsets = [];

const Navigation = ({ currentPosition, isContactViewPort }) => {
  const links = [
    {
      id: 'link1',
      innerText: 'Inicio',
      destination: 'header',
    },
    {
      id: 'link2',
      innerText: 'Citas',
      destination: 'appointment',
    },
    {
      id: 'link3',
      innerText: 'Nosotros',
      destination: 'about',
    },
    {
      id: 'link4',
      innerText: 'Contáctenos',
      destination: 'contact',
      inView: isContactViewPort,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const screenSize = useScreenSize();

  const navigateToSection = (destination) => {
    setIsOpen(false);
    const element = document.getElementById(destination);
    if (element) {
      element.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  const fromTop = () => {
    const offsets = links.map((item) => {
      let element = document.getElementById(item.destination);
      return element?.offsetTop;
    });
    return offsets;
  };

  const changeToActive = (index) => {
    let style = `${styles['non-active']}`;
    if (currentPosition+50 >= offsets[index] && currentPosition+50 <= offsets[index + 1]) {
      style = `${styles['active']}`;
    }
    if (index !== 3 && links[links.length - 1].inView === true) {
      style = `${styles['non-active']}`;
    }
    if (links[links.length - 1].inView === true && index === 3) {
      style = `${styles['active']}`;
    }
    return style;
  };

  useEffect(() => {
    offsets = fromTop();
  }, []);
  return (
    <nav>
      <div className={`${styles['nav-container']} container`}>
        <Link to={'/'} className={`${styles['brand-container']}`}>
          <img src={brand} />
          <p className={`${styles['farview']}`}>Farview</p>
        </Link>
        <div
          className={
            isOpen && screenSize.width <= 1061
              ? ` ${styles['primary-navigation-mobile']} ${styles['show']}`
              : !isOpen && screenSize.width <= 1061
              ? ` ${styles['primary-navigation-mobile']} ${styles['hide']}`
              : `${styles['primary-navigation']} `
          }
        >
          <ul role='list' className={`${styles['nav-list']}`}>
            {links.map((item, index) => (
              <Link
                className={changeToActive(index)}
                key={item.id}
                id={item.id}
                onClick={() => navigateToSection(item.destination)}
              >
                {item?.innerText}
              </Link>
            ))}
          </ul>
        </div>
        <div className={`${styles['btn-container']}`}>
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src={hamburger} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
