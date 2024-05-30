import { useRef } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Features from '../components/Features';
import About from '../components/About';
import Values from '../components/Values';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Appointment from '../components/Appointment';

//hooks
import useScrollPosition from '../hooks/useScrollPosition';
import useIsInViewPort from '../hooks/useIsInViewPort';

const Home = () => {
  const currentPosition = useScrollPosition();
  const contactRef = useRef(null);
  const isContactViewPort = useIsInViewPort(contactRef);

  return (
    <>
      <Navigation
        currentPosition={currentPosition.scrollY}
        isContactViewPort={isContactViewPort}
      />
      <Header />
      <Features />
      <Appointment />
      <About />
      <Values />
      <Contact ref={contactRef} />
      <Footer />
    </>
  );
};

export default Home;
