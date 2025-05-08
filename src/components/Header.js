import React, { useState } from 'react';
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
      <div className="logo">COCOMAP</div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <a className="mapa" href="#mapa">
          Mapa
        </a>
        <a href="#comedores">Comedores</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}

export default Header;
