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
          setError("Error al cargar los datos");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Error al conectar con el servidor");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Cargando comedores...</div>;
  if (error) return <div className="error">{error}</div>;
  if (restaurantes.length === 0) return <div>No hay comedores disponibles</div>;

  return (
    <div className="restaurant-cards-container" id="comedores">
      {restaurantes.map((restaurante, index) => (
        <div className="restaurant-card" key={restaurante.id || index}>
          <div className="card-header">
            <h2>{restaurante.nombre}</h2>

            {restaurante.organizacion && (
                <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '10px' }} className="org-badge">
                  <small>Asociación: {restaurante.organizacion}</small>
                </p>
            )}
          </div>
          
          <div className="card-body">
              {/* DIRECCIÓN DINÁMICA: Calle + Altura*/}
              
              {restaurante.calle && restaurante.altura ? (
              <p>
                <strong>Dirección:</strong>{' '}
                {`${restaurante.calle} ${restaurante.altura}`}
              </p>
              ) : null}

              {restaurante.localidad && (
                <p>
                  <strong>Localidad:</strong>{' '}
                  {` ${restaurante.localidad}`}
                </p>
              )}

              {restaurante.distrito && (
                <p style={{marginTop: '10px'}}>
                  <strong className="distrito-tag">Distrito:</strong>{' '}
                  <strong style={{ backgroundColor: 'var(--color-secundario)', color: 'var(--color-primario)', padding: '2px 6px', borderRadius: '6px' }}>{` ${restaurante.distrito}`}</strong>
                </p>
              )}

              {restaurante.telefono && (
                <p>
                  <strong>Teléfono:</strong> {restaurante.telefono}
                </p>
              )}

              {restaurante.horarios_apertura && (
                <p>
                  <strong>Horarios:</strong> {restaurante.horarios_apertura}
                </p>
              )}

              {/* {restaurante.needs && restaurante.needs.length > 0 && (
                <div className="needs-section">
                  <strong>Necesitan:</strong>
                  <ul className="needs-list">
                    {restaurante.needs.map((need, i) => (
                      <li key={i}>{need}</li>
                    ))}
                  </ul>
                </div>
              )} */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RestaurantCards;