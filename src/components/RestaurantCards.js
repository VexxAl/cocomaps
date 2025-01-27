import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RestaurantCards.css';

function RestaurantCards() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/comedores")
      .then((response) => setRestaurantes(response.data))
      .catch((error) => console.error("Error al obtener los comedores:", error));
  }, []);

  return (
    <div className="restaurant-cards-container">
      {restaurantes.map((restaurante, index) => (
        <div className="restaurant-card" key={index}>
          <h2>{restaurante.nombre}</h2>
          <p>
            <strong>Dirección:</strong>{' '}
            {`${restaurante.calle}, ${restaurante.ciudad}, ${restaurante.provincia} (${restaurante.codigo_postal})`}
          </p>
          <p>
            <strong>Teléfono:</strong> {restaurante.telefono}
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${restaurante.email}`}>
              {restaurante.email}
            </a>
          </p>
          <p>
            <strong>Sitio web:</strong>{' '}
            <a
              href={restaurante.web}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurante.web}
            </a>
          </p>
          <p>
            <strong>Horario:</strong>
            <ul>
              <li>
                <strong>Lunes a viernes:</strong>{' '}
                {restaurante.horario_lunes_a_viernes}
              </li>
              <li>
                <strong>Sábado:</strong> {restaurante.horario_sabado}
              </li>
              <li>
                <strong>Domingo:</strong> {restaurante.horario_domingo}
              </li>
            </ul>
          </p>
        </div>
      ))}
    </div>
  );
}

export default RestaurantCards;