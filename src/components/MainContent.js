import React from 'react';
import './MainContent.css';

function MainContent() {
  return (
    <section className="main-section">
      <div className="main-container">
        <h1>Mapa de comedores comunitarios de la ciudad de Santa Fe</h1>
        <p>
          El objetivo de <b>COCOMAP</b> es poder generar conexion entre los comedores
          y los vecinos de nuestra querida ciudad.
          Para ello, desde COCOMAP, facilitamos el acceso a información clave como pueden ser
          la ubicación, los horarios, los responsables, y las necesidades específicas de cada comedor.
        </p>
      </div>
    </section>
  );
}

export default MainContent;
