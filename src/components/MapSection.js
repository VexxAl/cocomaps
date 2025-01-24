import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapSection.css';
import restaurantData from '../data/restaurants.json'; // Importar datos desde el archivo JSON

// Configurar el ícono predeterminado de Leaflet
delete L.Icon.Default.prototype._getIconUrl; // Eliminar rutas predefinidas que pueden causar errores

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function MapSection() {
  const [restaurantLocations, setRestaurantLocations] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para el cargador
  const mapTilerAPIKey = '0pZJ3k4e4pahjfZ7scLs'; // Reemplaza con tu API Key de MapTiler

  // Función para geocodificar direcciones con Nominatim
  const geocodeAddress = async (address) => {
    const formattedAddress = `${address.calle}, ${address.ciudad}, ${address.provincia}, ${address.codigo_postal}`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      formattedAddress
    )}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      } else {
        console.error('No se encontró la dirección:', formattedAddress);
        return null;
      }
    } catch (error) {
      console.error('Error al geocodificar la dirección:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const locations = await Promise.all(
        restaurantData.restaurantes.map(async (restaurante) => {
          const coordinates = await geocodeAddress(restaurante.direccion);
          return coordinates ? { ...restaurante, coordinates } : null;
        })
      );
      setRestaurantLocations(locations.filter((loc) => loc !== null));
      setLoading(false); // Desactiva el cargador una vez completado
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <section className="map-section">
        <div className="loader">Cargando mapa </div>;
      </section>
    );
    // Renderiza el cargador
  }

  return (
    <section className="map-section">
      <MapContainer
        style={{ width: '100%', height: '500px' }}        
        center={[-31.6263478, -60.717238]}
        zoom={12}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        {/* Estilo de MapTiler: DATAVIZ.LIGHT */}
        <TileLayer
          url={`https://api.maptiler.com/maps/dataviz-light/{z}/{x}/{y}.png?key=${mapTilerAPIKey}`}
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
        />

        {/* Renderizar marcadores una vez que las coordenadas estén listas */}
        {restaurantLocations.map((restaurante, index) => (
          <Marker
            key={index}
            position={restaurante.coordinates} // Coordenadas geocodificadas
          >
            <Popup>
              <h3>{restaurante.nombre}</h3>
              <p>
                <strong>Dirección:</strong>{' '}
                {`${restaurante.direccion.calle}, ${restaurante.direccion.ciudad}`}
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
                <strong>Horario:</strong> L-V:{' '}
                {restaurante.horario.lunes_a_viernes}, S:{' '}
                {restaurante.horario.sabado}, D: {restaurante.horario.domingo}
              </p>
              <a
                href={restaurante.contacto.sitio_web}
                target="_blank"
                rel="noreferrer"
              >
                Visitar sitio web
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}

export default MapSection;
