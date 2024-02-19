import React, { useState, useEffect } from "react";
import "../../css/tablaPuntaje.css";
import Header from "./HeaderWB";

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
        const res = await fetch("http://localhost:3300/puntaje/visualizar");
        const data = await res.json();
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
    <div>
      <Header />
      <div className="center-container">
        <table className="score-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {puntajes.map((puntaje, index) => (
              <tr key={index}>
                <td>{puntaje.nombre}</td>
                <td>{puntaje.puntaje}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LongPollingExample;