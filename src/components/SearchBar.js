import React, { useState, useEffect } from 'react';
import './MapSection.css'; 
import './SearchBar.css';

// Hook para aplicar Debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Setea el debouncedValue después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpieza: Cancela el timeout si value cambia (evitando llamadas innecesarias)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SearchBar({ onSearch, filteredResults, onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  // 1. Efecto: Llama al prop onSearch del padre (App.js) solo cuando el valor se "estabiliza"
  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    } else {
      onSearch(''); // Limpiar búsqueda si el campo está vacío
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSelect = (result) => {
    setInputValue(result.nombre); // Seteamos el nombre del comedor en el input
    onSelect(result.coordenadas); // Disparamos el zoom
  };

  // LOGICA DE FILTRADO LOCAL
  // Filtramos lo que ya tenemos en memoria mientras esperamos a la API
  const localResults = filteredResults ? filteredResults.filter(item => {
    const searchStr = inputValue.toLowerCase();
    return (
      item.nombre.toLowerCase().includes(searchStr) || 
      item.calle.toLowerCase().includes(searchStr)
    );
  }) : [];

  return (
    <div id='buscador'>
      <div className="search-wrapper"> {/* div para contener input y dropdown */}
        <input 
          id="search-input"
          name="search"
          className="search-input"
          type="text" 
          placeholder="Buscar comedor o dirección..." 
          autoComplete="on"
          value={inputValue}
          onChange={handleInputChange} 
        />
        
        {/* Renderizamos localResults en lugar de filteredResults directos */}
        {(inputValue.length > 0 && localResults.length > 0) && (
          <div className="search-dropdown">
            {localResults.map((result) => (
              <div 
                key={result.id} 
                className="dropdown-item" 
                onClick={() => handleSelect(result)}
              >
                <span style={{fontWeight: '800', fontSize: '1.1rem'}}>{result.nombre}</span>
                <span style={{fontSize: '0.9rem', opacity: 0.8}}>📍 {result.calle}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;