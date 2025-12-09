import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import RestaurantCards from './components/RestaurantCards';
import SearchBar from './components/SearchBar';
import ScrollToTop from './components/ScrollToTop';

import './App.css';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); 
  const [zoomToLocation, setZoomToLocation] = useState(null); 
  const [filteredComedores, setFilteredComedores] = useState([]); // Resultados filtrados

  // Cada vez que cambia la ruta, subimos arriba de todo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // Función de búsqueda (usamos useCallback para optimizar con el Debounce)
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Función para hacer zoom en un marcador (usada al clickear en el dropdown)
  const handleZoomToMarker = useCallback((coordinates) => {
    setZoomToLocation({ lat: coordinates.lat, lng: coordinates.lng, zoom: 15 });
    
    // Si no estamos en la página principal, navegamos a ella antes de hacer zoom
    if (location.pathname !== '/') {
        navigate('/');
    }
  }, [navigate, location.pathname]);


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <MainContent />
            {/* 1. Pasamos los resultados filtrados al SearchBar */}
            {/* 2. Pasamos handleZoomToMarker como onSelect para que el dropdown haga zoom */}
            <SearchBar 
                onSearch={handleSearch} 
                filteredResults={filteredComedores}
                onSelect={handleZoomToMarker}
            /> 
            {/* 1. Pasamos la función para que el MapSection devuelva los resultados */}
            {/* 2. El MapSection sigue recibiendo el zoom para mover el mapa */}
            <MapSection 
                searchTerm={searchTerm} 
                zoomToLocation={zoomToLocation} 
                handleZoomToMarker={handleZoomToMarker} 
                setFilteredComedores={setFilteredComedores} // <-- NUEVO PROP
            /> 
          </>
        } />
        
        {/* ... (ruta /comedores se mantiene) */}
        <Route path="/comedores" element={
          <div style={{ backgroundColor: 'var(--color-fondo)', padding: '30px', height: '100%'  }}>
            <h1 style={{ textAlign: 'center', color: 'var(--color-primario)' }}>Listado de Comedores</h1>
            <RestaurantCards />
          </div>
        } />
      </Routes>
      <Footer />
      
      <ScrollToTop />
    </div>
  );
}

export default App;