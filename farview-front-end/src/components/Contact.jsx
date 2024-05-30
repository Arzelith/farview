import { useState } from 'react';
import { axiosPublic } from '../Api/axios';
import handleServerError from '../utils/serverErrorHandler';
import { forwardRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import SectionWrapper from './SectionWrapper';
import Button from './Button';
import InfoModal from './InfoModal';
import isEmail from 'validator/lib/isEmail';
import contactImage from '../assets/images/q&aimage.jpg';
import styles from '../css/Contact.module.css';

const initialValues = {
  name: '',
  lastName: '',
  email: '',
  content: '',
};

const Contact = forwardRef(({}, ref) => {
  const [serverError, setServerError] = useState();
  const [contactSuccess, setContactSuccess] = useState();

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required('Debe ingresar su nombre')
      .max(20, 'Su nombre no puede exceder los 20 caracteres'),
    lastName: Yup.string()
      .required('Debe ingresar su apellido')
      .max(20, 'Su apellido no puede exceder los 20 caracteres'),
    email: Yup.string()
      .trim()
      .required('Debe ingresar su email')
      .test('is-valid-email', 'El email ingresado no es válido', (value) =>
        isEmail(value)
      ),
    content: Yup.string()
      .trim()
      .required('Debe ingresar su consulta')
      .max(2000, 'Su consulta no puede exceder los 2000 caracteres'),
  });

  const sendMessage = async (values, actions) => {
    try {
      const response = await axiosPublic.post('/contact', values);
      actions.setSubmitting(false);
      actions.resetForm();
      setContactSuccess(true);
    } catch (error) {
      actions.setSubmitting(false);
      const serverError = handleServerError(error);
      setServerError({ title: serverError.status, message: serverError.message });
    }
  };

  return (
    <SectionWrapper
      ref={ref}
      id={'contact'}
      heading={'¿Tienes Consultas?'}
      SectionType={'contact'}
      isDecorator={true}
    >
      <div className={`${styles['col-a']}`}>
        <img src={contactImage} alt='contact-image' />
      </div>
      <div className={`${styles['col-b']}`}>
        {serverError && (
          <InfoModal
            type={'error'}
            title={serverError.title}
            message={serverError.message}
            onClick={() => setServerError(null)}
          />
        )}
        {contactSuccess && (
          <InfoModal
            type={'success'}
            title={'Mensaje enviado con éxito'}
            message={
              'Hemos recibido su mensaje. Nos contactaremos con Usted a la brevedad.'
            }
            onClick={() => setContactSuccess(null)}
          />
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            await sendMessage(values, actions);
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Input
                variant={'outlined-md'}
                placeholder='Nombre'
                name='name'
                type='text'
                autoComplete='off'
                disabled={isSubmitting}
              />
              <Input
                variant={'outlined-md'}
                placeholder='Apellido'
                name='lastName'
                type='text'
                autoComplete='off'
                disabled={isSubmitting}
              />
              <Input
                variant={'outlined-md'}
                placeholder='Email'
                name='email'
                type='text'
                autoComplete='off'
                disabled={isSubmitting}
              />
              <Input
                variant={'outlined-md'}
                placeholder={'Su consulta...'}
                as={'textarea'}
                rows={6}
                name='content'
                type='text'
                autoComplete='off'
                disabled={isSubmitting}
              />
              <div className={`${styles['btn-container']}`}>
                <Button
                  isSubmitting={isSubmitting}
                  variant={'default'}
                  type={'submit'}
                  innerText={isSubmitting ? 'Enviando...' : 'Enviar'}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </SectionWrapper>
  );
});

export default Contact;
