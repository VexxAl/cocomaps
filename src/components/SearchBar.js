// src/components/SearchBar.js
import React from 'react';
import './MapSection.css'; // Reutilizamos estilos o creamos uno nuevo
import './SearchBar.css';

function SearchBar({ onSearch }) {
  return (
    <div id='buscador'>
      <input 
        className="search-input"
        type="text" 
        placeholder="Buscar comedor o dirección..." 
        onChange={(e) => onSearch(e.target.value)} // Preparamos para lógica futura
      />
    </div>
  );
}

export default SearchBar;