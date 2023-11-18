import Card from './Card';
import SectionWrapper from './SectionWrapper';
import { faStar, faFire, faHandshake, faUsers } from '@fortawesome/free-solid-svg-icons';

const values = [
  {
    id: 'value1',
    title: 'Vocación de servicio',
    icon: faHandshake,
    content:
      'Disponibilidad de contacto con el equipo de trabajo como con el dueño de la empresa, siempre desde la preocupación y dar respuestas atingentes a nuestros clientes.',
  },
  {
    id: 'value2',
    title: 'Responsabilidad social',
    icon: faUsers,
    content:
      'Llevamos un servicio de salud que es cómodo, en cuanto a horario, precios y geográficamente.',
  },
  {
    id: 'value3',
    title: 'Calidad ante todo',
    icon: faStar,
    content:
      'Nos preocupamos de realizar una búsqueda de los mejores productos y materias primas para confeccionar bajo los más altos estándares de calidad haciendo de nuestra actividad un servicio de excelencia.',
  },
  {
    id: 'value4',
    title: 'Pasión',
    icon: faFire,
    content:
      'Invertimos tiempo y energía en la búsqueda de los mejores productos para cubrir las necesidades y expectativas de nuestros clientes a precios competitivos.',
  },
];

const Values = () => {
  return (
    <SectionWrapper heading={'Nuestros Valores'} SectionType={'values'}>
      {values.map((value) => (
        <Card
          key={value.id}
          icon={value.icon}
          title={value.title}
          content={value.content}
        />
      ))}
    </SectionWrapper>
  );
};

export default Values;
