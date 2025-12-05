import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links" id="contacto">
        <div>
          <h3>Contacto</h3>
          <ul>
            <li>agusmarzioni24@gmail.com</li>
            <li>valentinalderete19@gmail.com</li>            
          </ul>
          <p className="info-fuente">
            <strong>Nota:</strong> Los datos visualizados actualmente son demostrativos (mock data) a fines de probar la funcionalidad de la plataforma. 
            Estamos a la espera de la integración con los datos oficiales municipales.
          </p>
        </div>
      
      </div>
      <div className="social-media">
        <span>Creado en el marco del programa Eureka por</span>
        <i> <a href="https://github.com/VexxAl" target="_blank" rel="noopener noreferrer"> Valentín Alderete </a></i> y
        <i> Agustín Marzioni </i>
        
      </div>
    </footer>
  );
}

export default Footer;
