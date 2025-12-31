import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './MapSection.css';
import mapMarker from './icons/map-marker.svg';

delete L.Icon.Default.prototype._getIconUrl;

// --- AUXILIARES ---

// COMPONENTE: Habilita/deshabilita zoom con rueda según teclas modificadoras
function ZoomHandler() {
  const map = useMap();
  useEffect(() => {
    map.scrollWheelZoom.disable();
    const handleKeyDown = (e) => { if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Meta') map.scrollWheelZoom.enable(); };
    const handleKeyUp = (e) => { if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Meta') map.scrollWheelZoom.disable(); };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); };
  }, [map]);
  return null;
}

// COMPONENTE: Cambia la vista del mapa
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) map.setView(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);
  return null; 
}

// --- PRINCIPAL ---
function MapSection({searchTerm, zoomToLocation, handleZoomToMarker, setFilteredComedores, onPopupClose }) {
  const [restaurantLocations, setRestaurantLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const markerRefs = useRef({});

  const customIcon = new L.Icon({
    iconUrl: mapMarker, 
    iconRetinaUrl: mapMarker,
    iconSize: [35, 45], 
    iconAnchor: [16.5, 45], 
    popupAnchor: [0, -45] 
  });

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // FUNCION AUXILIAR: Geocodifica una dirección usando Nominatim
  const geocodeAddress = async (calle, altura, localidad, provincia) => {
    // Usamos los datos de la DB. Si faltan, fallback a Argentina.
    const loc = localidad || 'Santa Fe';
    const prov = provincia || 'Santa Fe';
    
    const addressString = `${calle} ${altura || ''}, ${loc}, ${prov}, Argentina`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressString)}&format=json&limit=1`;
    
    try {
      const response = await fetch(url, { headers: { 'User-Agent': 'CocomapsProject/1.0' } });
      const data = await response.json();
      if (data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      return null;
    } catch (error) {
      console.error('Error buscando dirección:', addressString, error);
      return null;
    }
  };
  
  // EFECTO: Cargar y filtrar ubicaciones de comedores
  useEffect(() => {
    const fetchLocations = async () => {
      setApiError(null);
      const url = searchTerm 
        ? `${process.env.REACT_APP_BACKEND_URL}?search=${encodeURIComponent(searchTerm)}`
        : process.env.REACT_APP_BACKEND_URL;

      try {
        const response = await axios.get(url);
        const processedLocations = [];

        for (const comedor of response.data) {
            let coords = null;
            if (comedor.lat && comedor.lng) {
                coords = { lat: parseFloat(comedor.lat), lng: parseFloat(comedor.lng) };
            } 
            else if (comedor.calle) {
                await delay(1100); 
                // Pasamos Localidad y Provincia a la función
                coords = await geocodeAddress(comedor.calle, comedor.altura, comedor.localidad, comedor.provincia);
                if (coords) {
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/${comedor.id}/update-coordinates`, coords)
                         .catch(e => console.error(e));
                }
            }

            if (coords) {
                processedLocations.push({ ...comedor, coordinates: coords });
            }
        }

        setRestaurantLocations(processedLocations);
        if (setFilteredComedores) setFilteredComedores(processedLocations);
        setLoading(false);

      } catch (error) {
        console.error("Error:", error);
        setApiError("Error de conexión.");
        setLoading(false);
      }
    };
    fetchLocations();
  }, [searchTerm, setFilteredComedores]);
  
  // EFECTO: Abrir popup si hay un id en zoomToLocation
  useEffect(() => {
    if (zoomToLocation && zoomToLocation.id) {
      const marker = markerRefs.current[zoomToLocation.id];
      if (marker) marker.openPopup();
    }
  }, [zoomToLocation]);

  if (loading) return <div className="loader"><span style={{fontStyle: 'italic', marginRight: '15px'}}>Cargando el mapa</span></div>;
  if (apiError) return <div className="error-msg">{apiError}</div>;

  const currentCenter = zoomToLocation ? [zoomToLocation.lat, zoomToLocation.lng] : [-31.6333, -60.7000];

  return (
    <section className="map-section" id="mapa">
      <MapContainer style={{ width: '100vw', height: '90vh' }} center={currentCenter} zoom={zoomToLocation ? zoomToLocation.zoom : 13} scrollWheelZoom={false}>
        <ZoomHandler />
        <ChangeView center={currentCenter} zoom={zoomToLocation ? zoomToLocation.zoom : 13} />
        <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

        {restaurantLocations.map((restaurante, index) => (
          <Marker
            key={restaurante.id || index}
            position={restaurante.coordinates}
            icon={customIcon}
            ref={(el) => (markerRefs.current[restaurante.id] = el)}
            eventHandlers={{
              click: () => handleZoomToMarker(restaurante),
              popupclose: () => { if (zoomToLocation && onPopupClose) onPopupClose(); }
            }}
          >
            <Popup className='custom-popup'>
              <h3>{restaurante.nombre}</h3>
              {/* POPUP DINÁMICO */}
              <p>
                <strong>Dirección:</strong> {restaurante.calle} {restaurante.altura}, {restaurante.localidad}
              </p>
              {restaurante.organizacion && (
                <p>
                  <strong>Org:</strong> {restaurante.organizacion}
                </p>
              )}
              {restaurante.telefono && (
                <p>
                  {restaurante.telefono}
                </p>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}

export default MapSection;