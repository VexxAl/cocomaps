import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RestaurantCards.css';

function RestaurantCards() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setRestaurantes(response.data);
        } else {
          console.error("Error: la API no devolvió un array", response.data);
          setError("Error al cargar los datos");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los comedores:", error);
        setError("Error al conectar con el servidor");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando comedores...</div>;
  if (error) return <div className="error">{error}</div>;
  if (restaurantes.length === 0) return <div>No hay comedores disponibles</div>;

  return (
    <div className="restaurant-cards-container" id="comedores">
      {restaurantes.map((restaurante, index) => (
        <div className="restaurant-card" key={restaurante.id || index}>
          <h2>{restaurante.nombre}</h2>
          
          {/* Agregamos la Asociación si es diferente al nombre (opcional) o siempre */}
          {restaurante.asociacion && (
            <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '10px' }}>
              <small>Asociación: {restaurante.asociacion}</small>
            </p>
          )}

          {restaurante.calle && (
            <p>
              <strong>Dirección:</strong>{' '}
              {`${restaurante.calle}`}
            </p>
          )}
          {/* Mostramos el Distrito si existe */}
          {restaurante.distrito && (
            <p> 
              <strong>Distrito:</strong>{' '}
              {`${restaurante.distrito}`}
            </p>
          )}
          {restaurante.telefono && (
            <p>
              <strong>Teléfono:</strong> {restaurante.telefono}
            </p>
          )}
          {/* {restaurante.email && (
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${restaurante.email}`}>{restaurante.email}</a>
            </p>
          )}
          {restaurante.web && (
            <p>
              <strong>Sitio web:</strong>{' '}
              <a href={restaurante.web} target="_blank" rel="noopener noreferrer">
                {restaurante.web}
              </a>
            </p>
          )} */}
          <p>
            <strong>Horario:</strong>
            <ul>
              {restaurante.horario_lunes_a_viernes && (
                <li>
                  <strong>Lunes a viernes:</strong>{' '}
                  {restaurante.horario_lunes_a_viernes}
                </li>
              )}
              {restaurante.horario_sabado && (
                <li>
                  <strong>Sábado:</strong> {restaurante.horario_sabado}
                </li>
              )}
              {restaurante.horario_domingo && (
                <li>
                  <strong>Domingo:</strong> {restaurante.horario_domingo}
                </li>
              )}
            </ul>
          </p>
        </div>
      ))}
    </div>
  );
}

export default RestaurantCards;