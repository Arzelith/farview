import ColumnsWrapper from '../components/ColumnsWrapper';
import Button from './Button';
import featuresImage from '../assets/images/iStock-1398162726.jpg';
import styles from '../css/Features.module.css';

const Features = () => {
  const navigateToSelection = () => {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  return (
    <div id='features' className={`container ${styles['features']}`}>
      <ColumnsWrapper className={`${styles['gap']}`}>
        <div className={`${styles['col-a']}`}>
          <img src={featuresImage} alt='features-image' />
        </div>
        <div className={`${styles['col-b']}`}>
          <div>
            <h3>¿Por qué nosotros?</h3>
            <p>
              Óptica Farview cuenta con examen oftalmológico con especialista en el área,
              quienes prescriben su receta de acuerdo a su dioptría, de este modo poder
              confeccionar sus lentes en nuestras sucursales a su medida y
              especificaciones.
            </p>
            <p>
              Somos una Óptica con 30 años de trayectoria entregando calidad y rapidez a
              su servicio, todo en un mismo lugar para su comodidad, así Ud. podrá elegir
              lentes de variadas marcas y los mejores laboraratorios a su disposición
              estos son: Rodenstock y Essilor, así mismo, contamos con asesoría
              personalizada para la elección de multifocales y cristales de laboratorio
              adelgazados con los mejores productos a precios competitivos.
            </p>
            <p>
              Nuestro equipo está siempre disponible para brindar una experiencia de
              servicio cercana y responsable.
            </p>
          </div>
          <Button
            onClick={() => navigateToSelection()}
            variant={'default'}
            type={'button'}
            innerText={'Agenda tu cita'}
          />
        </div>
      </ColumnsWrapper>
    </div>
  );
};

export default Features;
