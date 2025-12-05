// src/components/SearchBar.js
import React from 'react';
import './MapSection.css'; // Reutilizamos estilos o creamos uno nuevo

function SearchBar({ onSearch }) {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#232d4f', // Color institucional
      display: 'flex',
      justifyContent: 'center'
    }} id='buscador'>
      <input 
        type="text" 
        placeholder="Buscar comedor o dirección..." 
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '10px 15px',
          borderRadius: '25px',
          border: 'none',
          outline: 'none',
          fontSize: '1rem'
        }}
        onChange={(e) => onSearch(e.target.value)} // Preparamos para lógica futura
      />
    </div>
  );
}

export default SearchBar;