import React, { useState, useEffect } from "react";
import tablaPuntaje from "../../css/tablaPuntaje.css"

const LongPollingExample = () => {
  const [puntajes, setPuntajes] = useState([]);

  const obtenerPuntajes = async () => {
    try {
      const res = await fetch("http://localhost:3000/puntaje");
      const data = await res.json();
      setPuntajes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerPuntajes();
  }, []);

  useEffect(() => {
    const obtenerNotificacionNueva = async () => {
      try {
        const res = await fetch("http://localhost:3300/puntaje");
        const data = await res.json();

        // Comprueba si hay nuevos puntajes
        if (data.length > puntajes.length) {
          const nuevosPuntajes = data.slice(puntajes.length);
          setPuntajes((prevPuntajes) => [...prevPuntajes, ...nuevosPuntajes]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(obtenerNotificacionNueva, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [puntajes]);

  return (
    <div className="center-container">
      <h2>Notificaciones</h2>
      <ul>
        {puntajes.map((puntaje) => (
          <li key={puntaje.id}>
            {puntaje.nombre} - {puntaje.puntaje}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LongPollingExample;