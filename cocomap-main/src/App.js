import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import './App.css';
import RestaurantCards from './components/RestaurantCards'; // Ruta según tu estructura

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <MapSection />
      <RestaurantCards />
      <Footer />
    </div>
  );
}

export default App;
