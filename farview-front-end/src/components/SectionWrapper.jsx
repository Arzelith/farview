import { forwardRef } from 'react';
import styles from '../css/SectionWrapper.module.css';
import Decorator from './Decorator';
import ColumnsWrapper from './ColumnsWrapper';

const SectionWrapper = forwardRef(
  ({ id, children, heading, isDecorator, SectionType, oneColumn }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={`${
          SectionType === 'about' ||
          SectionType === 'values' ||
          SectionType === 'appointment'
            ? styles['about-values-appointment-padding']
            : SectionType === 'contact'
            ? styles['contact-padding']
            : ''
        } container`}
      >
        <div className={`${styles['about-values-appointment-heading']}`}>
          <h2>{heading}</h2>
          {isDecorator && <Decorator type={'heading-decorator'} />}
        </div>
        <ColumnsWrapper
          oneColumn={oneColumn}
          className={`${
            SectionType === 'about' || SectionType === 'values'
              ? styles['about-values-wrap']
              : SectionType === 'contact'
              ? styles['contact-gap']
              : ''
          } `}
        >
          {children}
        </ColumnsWrapper>
      </div>
    );
  }
);

export default SectionWrapper;
