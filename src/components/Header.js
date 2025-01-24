import React, { useState } from 'react';
import './Header.css';
import escudoSantaFe from './escudo-de-santa-fe.svg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
      <div className="logo">COCOMAP</div>
      <img src={escudoSantaFe} alt="Escudo de Santa Fe" />
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
        <a href="#informacion">Información</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}

export default Header;
