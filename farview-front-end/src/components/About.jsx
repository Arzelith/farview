import Card from './Card';
import SectionWrapper from './SectionWrapper';

const About = () => {
  return (
    <SectionWrapper
      id='about'
      heading='Sobre Nosotros'
      isDecorator={true}
      SectionType={'about'}
    >
      <Card
        isAboutCard={true}
        title={'Misión'}
        content={`Somos una óptica y oftalmología preocupada por brindar una experiencia de
            atención visual, de la mano de los mejores profesionales comprometidos con su
            quehacer, al mismo tiempo que generamos cercanía con nuestros clientes, los
            recibimos en espacios acogedores, escuchando sus necesidades e inquietudes,
            para ello tenemos disponible nuestro equipo de personas y la mejor tecnología
            para oftalmología y óptica, desarrollando continuamente nuestros estándares de
            calidad.`}
      />
      <Card
        isAboutCard={true}
        title={'Visión'}
        content={`Ser una Óptica móvil Líder dentro del país, brindando un servicio diferente
            donde oftalmología y óptica estén disponibles para una experiencia de compra
            rápida y ágil. A través de nuestros productos de marcas, la calidad de nuestro
            equipamiento y tecnología de punta al servicio de las familias.`}
      />
    </SectionWrapper>
  );
};

export default About;
