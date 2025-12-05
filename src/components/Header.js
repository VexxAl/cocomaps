import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import './Header.css';
import escudoSantaFe from './icons/escudo-de-santa-fe.svg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={escudoSantaFe} alt="Escudo de Santa Fe" />
        <div className="logo">
          <a href="#home">COCOMAPS</a>
        </div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    <nav className={`nav ${menuOpen ? 'open' : ''}`}>
      {/* Cambiamos <a> por <Link> */}
      <Link className="mapa" to="/" onClick={toggleMenu}>
        Mapa
      </Link>
      <Link to="/comedores" onClick={toggleMenu}>
        Listado Comedores
      </Link>
      <a href="#contacto" onClick={toggleMenu}>Contacto</a>
    </nav>
    </header>
  );
}

export default Header;
