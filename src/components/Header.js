import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importamos hooks
import './Header.css';
import logoCocomaps from './icons/isotype.svg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Saber dónde estamos
  const navigate = useNavigate(); // Para movernos manualmente

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Función inteligente para navegar a secciones
  const handleNavigation = (e, targetId) => {
    e.preventDefault(); // Evitamos comportamiento default
    
    // Cerramos menú si está abierto (útil en móvil)
    setMenuOpen(false);

    if (location.pathname !== '/') {
      // Si NO estamos en home, vamos a home y luego scrolleamos
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Pequeño delay para que cargue la página
    } else {
      // Si YA estamos en home, solo scrolleamos
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        {/* Usamos el nuevo logo SVG */}
        <img src={logoCocomaps} alt="Logo COCOMAPS" className="header-logo" />
        <div className="logo">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            COCOMAPS
          </Link>
        </div>
      </div>
      
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        {/* Botón Mapa: Usa la función inteligente */}
        <a 
          className="mapa" 
          href="#buscador" 
          onClick={(e) => handleNavigation(e, 'buscador')}
        >
          Mapa
        </a>

        {/* Botón Listado: Link normal de Router */}
        <Link to="/comedores" onClick={() => setMenuOpen(false)}>
          Listado Comedores
        </Link>

        {/* Botón Contacto: Usa la función inteligente */}
        <a 
          href="#contacto" 
          onClick={(e) => handleNavigation(e, 'contacto')}
        >
          Contacto
        </a>
      </nav>
    </header>
  );
}

export default Header;