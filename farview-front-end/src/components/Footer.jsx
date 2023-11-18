import { Link } from 'react-router-dom';
import ColumnsWrappper from './ColumnsWrapper';
import styles from '../css/Footer.module.css';

const footerLinks = [
  {
    id: 'footerLink1',
    innerText: 'Inicio',
    destination: 'header',
  },
  {
    id: 'footerLink2',
    innerText: 'Citas',
    destination: 'appointment',
  },
  {
    id: 'footerLink3',
    innerText: 'Nosotros',
    destination: 'about',
  },
  {
    id: 'footerLink4',
    innerText: 'Contacto',
    destination: 'contact',
  },
];

const Footer = () => {
  const navigateToSection = (destination) => {
    const element = document.getElementById(destination);
    if (element) {
      element.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  return (
    <footer className={`${styles['footer']}`}>
      <div className={`container`}>
        <ColumnsWrappper className={`${styles['spacing']}`}>
          <div className={`${styles['col']}`}>
            <h6>¿Quieres hacer una compra?</h6>
            <p>
              No esperes mas y agenda tu cita <a href='#'>aquí</a>{' '}
            </p>
          </div>
          <div className={`${styles['col']}`}>
            <h6>Links</h6>
            <ul>
              <li>
                <p>Menu:</p>
              </li>
              {footerLinks.map((item) => (
                <Link key={item.id} onClick={() => navigateToSection(item.destination)}>
                  {item.innerText}
                </Link>
              ))}
            </ul>
          </div>
          <div className={`${styles['col']}`}>
            <h6>Contacto</h6>
            <p>
              Escríbenos a <a href='mailto:farview@gmail.com'>farview@gmail.com</a>
            </p>
          </div>
        </ColumnsWrappper>
      </div>
      <div>
        <p className={`${styles['copyright']}`}>{`Copyright © 2022-${
          new Date().getFullYear() + 1
        } Optica Farview`}</p>
      </div>
    </footer>
  );
};

export default Footer;
