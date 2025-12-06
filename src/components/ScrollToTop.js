import React, { useState, useEffect } from 'react';
import './ScrollToTop.css'; // Ahora lo creamos

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar botón solo si bajamos más de 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Función para subir
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top">
          {/* Icono de flecha simple (SVG en línea para no importar assets) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="var(--color-fondo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </>
  );
}

export default ScrollToTop;