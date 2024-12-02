import React, { useState, useEffect } from 'react';
import { ArrowUpCircle } from 'lucide-react';

const BackToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-40 right-7 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          <ArrowUpCircle size={24} />
        </button>
      )}
    </>
  );
};

export default BackToTop;
