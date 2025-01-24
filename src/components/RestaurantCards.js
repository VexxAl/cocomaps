import React from 'react';
import './RestaurantCards.css';

function RestaurantCards({ restaurantes }) {
  return (
    <div className="restaurant-cards-container">
      {restaurantes.map((restaurante, index) => (
        <div className="restaurant-card" key={index}>
          <h2>{restaurante.nombre}</h2>
          <p>
            <strong>Dirección:</strong>{' '}
            {`${restaurante.direccion.calle}, ${restaurante.direccion.ciudad}, ${restaurante.direccion.provincia} (${restaurante.direccion.codigo_postal})`}
          </p>
          <p>
            <strong>Teléfono:</strong> {restaurante.contacto.telefono}
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${restaurante.contacto.email}`}>
              {restaurante.contacto.email}
            </a>
          </p>
          <p>
            <strong>Sitio web:</strong>{' '}
            <a
              href={restaurante.contacto.sitio_web}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurante.contacto.sitio_web}
            </a>
          </p>
          <p>
            <strong>Horario:</strong>
            <ul>
              <li>
                <strong>Lunes a viernes:</strong>{' '}
                {restaurante.horario.lunes_a_viernes}
              </li>
              <li>
                <strong>Sábado:</strong> {restaurante.horario.sabado}
              </li>
              <li>
                <strong>Domingo:</strong> {restaurante.horario.domingo}
              </li>
            </ul>
          </p>
        </div>
      ))}
    </div>
  );
}

export default RestaurantCards;
