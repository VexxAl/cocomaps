import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Trial() {
  const [comedores, setComedores] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/comedores")
      .then((response) => setComedores(response.data))
      .catch((error) => console.error("Error al obtener los comedores:", error));
  }, []);

  return (
    <div>
      <h4>Lista de Comedores</h4>
      <ul>
        {comedores.map((comedor) => (
          <li key={comedor.id}>{comedor.nombre} - {comedor.telefono}</li>
        ))}
      </ul>
    </div>
  );
}

export default Trial;