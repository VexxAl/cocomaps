import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
          <h3>Contacto</h3>
          <ul>
            <li>agusmarzioni24@gmail.com</li>
            <li>valentinalderete19@gmail.com</li>            
          </ul>
          <p className="info-fuente">La información presentada en este sitio ha sido brindada por la Municipalidad de Santa Fe y está actualizada hasta enero 2025</p>
        </div>
      
      </div>
      <div className="social-media">
        <span>Creado en el marco del programa Eureka por</span>
        <i> Valentín Alderete</i> y
        <i> Agustín Marzioni </i>
        
      </div>
    </footer>
  );
}

export default Footer;
