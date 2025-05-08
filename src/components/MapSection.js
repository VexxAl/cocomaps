import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './MapSection.css';

// Configure default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function MapSection() {
  const [restaurantLocations, setRestaurantLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapTilerAPIKey = process.env.REACT_APP_MAP_TILER_API_KEY;
  
  const customIcon = new L.Icon({
    iconUrl: './icons/Icon3.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  // Function to geocode addresses with Nominatim
  const geocodeAddress = async (address) => {
    const formattedAddress = `${address}, Santa Fe, Argentina`;
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
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL);
        const locations = await Promise.all(
          response.data.map(async (restaurante) => {
            if (restaurante.coordenadas) {
              return { ...restaurante, coordinates: restaurante.coordenadas };
            } else {
              const fullAddress = `${restaurante.calle}, ${restaurante.ciudad}, ${restaurante.provincia} (${restaurante.codigo_postal})`;
              const coordinates = await geocodeAddress(fullAddress);
              if (coordinates) {
                await axios.post(process.env.REACT_APP_BACKEND_URL + `/${restaurante.id}/update-coordinates`, { coordinates });
                return { ...restaurante, coordinates };
              } else {
                return null;
              }
            }
          })
        );
        setRestaurantLocations(locations.filter((loc) => loc !== null));
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los comedores:", error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <section className="map-section">
        <div className="loader">Cargando mapa</div>
      </section>
    );
  }

  return (
    <section className="map-section" id="mapa">
      <MapContainer
        style={{ width: '100%', height: '500px' }}
        center={[-31.6263478, -60.717238]}
        zoom={12}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url={`https://api.maptiler.com/maps/dataviz-light/{z}/{x}/{y}.png?key=${mapTilerAPIKey}`}
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
        />

        {restaurantLocations.map((restaurante, index) => (
          <Marker
            key={index}
            position={restaurante.coordinates}
            icon={customIcon}
          >
            <Popup>
              <h3>{restaurante.nombre}</h3>
              <p>
                <strong>Dirección:</strong> {`${restaurante.calle}, ${restaurante.ciudad}, ${restaurante.provincia} (${restaurante.codigo_postal})`}
              </p>
              <p>
                <strong>Teléfono:</strong> {restaurante.telefono}
              </p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${restaurante.email}`}>{restaurante.email}</a>
              </p>
              {restaurante.web && (
                <a href={restaurante.web} target="_blank" rel="noreferrer">
                  Visitar sitio web
                </a>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}

export default MapSection;