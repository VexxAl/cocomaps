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
            * Los datos publicados en este mapa son meramente representativos para demostrar el funcionamiento de la plataforma, mientras estamos a la espera de información oficial o colaboración comunitaria. No deben considerarse como información definitiva de ubicación o estado de los comedores.
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
