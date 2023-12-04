import NumeratedSectionWrapper from './NumeratedSectionWrapper';
import Input from './Input';

const AppointmentUserDetails = ({ inputs }) => {
  return (
    <NumeratedSectionWrapper secNumber={'2'} secHeading={'Cuéntanos sobre ti'}>
      {inputs.map((input) => (
        <Input
          icon={input.icon}
          key={input.label}
          name={input.name}
          type={'text'}
          variant={'iconed-sm'}
          labelText={input.label}
          placeholder={input.placeHolder}
          autoComplete='off'
        />
      ))}
    </NumeratedSectionWrapper>
  );
};

export default AppointmentUserDetails;
