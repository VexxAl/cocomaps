import React, { useEffect } from 'react'; // Importar useEffect
import { Routes, Route, useLocation } from 'react-router-dom'; // Importar useLocation
import Header from './components/Header';
import MainContent from './components/MainContent';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import RestaurantCards from './components/RestaurantCards';
import SearchBar from './components/SearchBar'; // Importar el nuevo componente
import './App.css';

function App() {
  const { pathname } = useLocation();

  // Cada vez que cambia la ruta, subimos arriba de todo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Ruta Home: Landing + Mapa + Buscador */}
        <Route path="/" element={
          <>
            <MainContent />
            <SearchBar onSearch={(val) => console.log("Buscando:", val)} /> 
            <MapSection />
          </>
        } />
        
        

        {/* Ruta Lista: Solo el listado de comedores */}
        <Route path="/comedores" element={
          <div style={{ backgroundColor: 'var(--color-fondo)', padding: '30px', height: '100%'  }}>
            <h1 style={{ textAlign: 'center', color: 'var(--color-primario)' }}>Listado de Comedores</h1>
            <RestaurantCards />
          </div>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;