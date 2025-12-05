import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importamos Routes
import Header from './components/Header';
import MainContent from './components/MainContent';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import RestaurantCards from './components/RestaurantCards';
import SearchBar from './components/SearchBar'; // Importar el nuevo componente
import './App.css';

function App() {
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
          <div style={{ marginTop: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#232d4f' }}>Listado de Comedores</h1>
            <RestaurantCards />
          </div>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;