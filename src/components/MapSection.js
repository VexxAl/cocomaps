import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './MapSection.css';
import mapMarker from './icons/map-marker.svg';

// Configure default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;

// COMPONENTE AUXILIAR 1: Maneja la lógica de Scroll-Trap
function ZoomHandler() {
  const map = useMap();

  useEffect(() => {
    map.scrollWheelZoom.disable();
    const handleKeyDown = (e) => {
      if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Meta') {
        map.scrollWheelZoom.enable();
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Meta') {
        map.scrollWheelZoom.disable();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [map]);

  return null;
}

// COMPONENTE AUXILIAR 2: Maneja el cambio dinámico de vista (para hacer ZOOM al click)
function ChangeView({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom, {
        animate: true,
        duration: 1.5
      });
    }
  }, [center, zoom, map]);

  return null; 
}


// COMPONENTE PRINCIPAL
function MapSection({searchTerm, zoomToLocation, handleZoomToMarker, setFilteredComedores, onPopupClose }) {
  // ESTADOS
  const [restaurantLocations, setRestaurantLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  
  // REFERENCIAS
  const markerRefs = useRef({});

  // ICONO PERSONALIZADO
  const customIcon = new L.Icon({
    iconUrl: mapMarker, 
    iconRetinaUrl: mapMarker,
    iconSize: [35, 45], 
    iconAnchor: [16.5, 45], 
    popupAnchor: [0, -45] 
  });

  // FUNCIÓN AUXILIAR: Geocodifica una dirección usando Nominatim
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
  
  // EFECTO 1: Cargar y filtrar locaciones
  useEffect(() => {
    const fetchLocations = async () => {
      // setLoading(true);
      setApiError(null); // Limpiar errores al iniciar una nueva búsqueda
      
      const url = searchTerm 
        ? `${process.env.REACT_APP_BACKEND_URL}?search=${encodeURIComponent(searchTerm)}`
        : process.env.REACT_APP_BACKEND_URL;

      try {
        const response = await axios.get(url);
        const rawLocations = response.data; // Datos crudos recibidos
        
        // Procesar coordenadas
        const locations = await Promise.all(
          rawLocations.map(async (restaurante) => {
            if (restaurante.coordenadas) {
              return { ...restaurante, coordinates: restaurante.coordenadas };
            } else {
              const fullAddress = `${restaurante.calle}, ${restaurante.ciudad}, ${restaurante.provincia} (${restaurante.codigo_postal})`;
              const coordinates = await geocodeAddress(fullAddress);
              if (coordinates) {
                // Guardar coordenadas en el backend
                await axios.post(process.env.REACT_APP_BACKEND_URL + `/${restaurante.id}/update-coordinates`, { coordinates });
                return { ...restaurante, coordinates };
              } else {
                return null;
              }
            }
          })
        );

        const finalLocations = locations.filter((loc) => loc !== null);

        // Devolver resultados filtrados al componente padre
        if (setFilteredComedores) {
          setFilteredComedores(finalLocations);
        }

        setRestaurantLocations(finalLocations);
        setLoading(false);

      } catch (error) {
        // CAPTURA DE ERROR DE CONEXIÓN
        console.error("Error al obtener los comedores:", error);
        setApiError("Error al conectar con la API del servidor.");
        setRestaurantLocations([]); // Asegurar lista vacía
        if (setFilteredComedores) {
          setFilteredComedores([]);
        }
        setLoading(false);
      }
    };

    fetchLocations();
  }, [searchTerm, setFilteredComedores]);
  
  // EFECTO 2: Abrir Popup si hay un ID en zoomToLocation
  useEffect(() => {
    if (zoomToLocation && zoomToLocation.id) {
      const marker = markerRefs.current[zoomToLocation.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [zoomToLocation]);

  // RENDERIZADO: Loading
  if (loading) {
    return (
      <section className="map-section">
        <div className="loader">
          <span style={{marginRight: "20px", color: "var(--color-fondo)"}}>Cargando mapa</span>
        </div>
      </section>
    );
  }

  // RENDERIZADO: Error de API
  if (apiError) {
    return (
      <section className="map-section" style={{height: '90vh'}}>
        <div className="loader" style={{flexDirection: 'column'}}>
          <span style={{color: 'var(--color-primario)', marginBottom: '20px', fontSize: '1.8rem'}}>
            Error de Conexión
          </span>
          <p style={{color: 'var(--color-texto)', maxWidth: '600px', textAlign: 'center'}}>
            {apiError}
          </p>
        </div>
      </section>
    );
  }
  
  // RENDERIZADO NORMAL DEL MAPA
  const currentCenter = zoomToLocation 
    ? [zoomToLocation.lat, zoomToLocation.lng] 
    : [-31.6263478, -60.717238]; 
    
  const currentZoom = zoomToLocation 
    ? zoomToLocation.zoom 
    : 12;

  return (
    <section className="map-section" id="mapa">
      <MapContainer
        style={{ width: '100vw', height: '90vh' }}
        center={currentCenter}
        zoom={currentZoom}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={false}
      >
        <ZoomHandler />
        <ChangeView center={currentCenter} zoom={currentZoom} />
       
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains='abcd'
          maxZoom={20}
        />

        {restaurantLocations.map((restaurante, index) => (
          <Marker
            key={restaurante.id || index}
            position={restaurante.coordinates}
            icon={customIcon}
            ref={(el) => (markerRefs.current[restaurante.id] = el)}
            eventHandlers={{
              click: () => handleZoomToMarker(restaurante),
              // Detectamos cuando se cierra el popup
              popupclose: () => {
                if (zoomToLocation && onPopupClose) {
                  onPopupClose();
                }
              }
            }}
          >
            <Popup className='custom-popup'>
              <h3>{restaurante.nombre}</h3>
              <p>
                <strong>Dirección:</strong> {`${restaurante.calle}, ${restaurante.ciudad}`}
              </p>
              <p>
                <strong>Teléfono:</strong> {restaurante.telefono}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}

export default MapSection;
