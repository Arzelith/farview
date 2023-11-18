import Input from './Input';
import Decorator from '../components/Decorator';
import Button from './Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import isEmail from 'validator/lib/isEmail';
import styles from '../css/NewsLetter.module.css';

const initialValues = {
  newsLetterEmail: '',
};

//PENDIENTE MODAL DE CONFIRMACIÓN & ERROR
//PENDIENTE VALIDACION DE EMAIL

const NewsLetter = () => {
  const validationSchema = Yup.object({
    newsLetterEmail: Yup.string()
      .required('Debe ingresar su email').trim()
      .test('is-valid', 'El email ingresado no es válido', (value) => isEmail(value)),
  });

  return (
    <>
      <Decorator type={'section-decorator-reverse'} />
      <div className={`${styles['news-letter']}`}>
        <div className={`container `}>
          <h2>Suscribete para estar actualizado</h2>
          <p>
            Te estaremos enviando constantemente información sobre nuestros productos
            destacados y las mejores ofertas de tu interes.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                console.log({ ...values });
                actions.setSubmitting(false);
                actions.resetForm();
              }, '1000');
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form className={`${styles['news-letter-form']}`}>
                <Input
                  variant={'outlined-xl'}
                  placeholder='Email'
                  name='newsLetterEmail'
                  type='text'
                  autoComplete='off'
                  disabled={isSubmitting}
                />
                <Button
                  isSubmitting={isSubmitting}
                  variant={'variable-b-radius'}
                  type={'submit'}
                  innerText={isSubmitting ? 'Enviando...' : 'Suscribirse'}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Decorator type={'section-decorator'} />
    </>
  );
};

export default NewsLetter;
