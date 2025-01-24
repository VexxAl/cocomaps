import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import './App.css';
import RestaurantCards from './components/RestaurantCards'; // Ruta según tu estructura

import restaurantData from './data/restaurants.json'; // Supongamos que tienes el JSON en este archivo

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <MapSection />
      <RestaurantCards restaurantes={restaurantData.restaurantes} />
      <Footer />
    </div>
  );
}

export default App;
