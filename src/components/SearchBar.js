// src/components/SearchBar.js
import React from 'react';
import './MapSection.css'; // Reutilizamos estilos o creamos uno nuevo
import './SearchBar.css';

function SearchBar({ onSearch }) {
  return (
    <div id='buscador'>
      <input 
        id="search-input"
        name="search"
        className="search-input"
        type="text" 
        placeholder="Buscar comedor o dirección..." 
        autoComplete="off"
        onChange={(e) => onSearch(e.target.value)} // Preparamos para lógica futura
      />
    </div>
  );
}

export default SearchBar;