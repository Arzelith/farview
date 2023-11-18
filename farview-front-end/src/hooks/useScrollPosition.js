import { useEffect, useState } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({ scrollY: window.scrollY });

  const handleScroll = () => {
    // const scrollPosition = window.scrollY; // => scroll position
    setScrollPosition({ scrollY: window.scrollY });
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
