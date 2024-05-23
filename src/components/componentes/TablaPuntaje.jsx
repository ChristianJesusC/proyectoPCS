import React, { useState } from "react";
import "../../css/tablaPuntaje.css";
import Header from "./HeaderWB";

const LongPollingExample = () => {
  const [puntajes, setPuntajes] = useState([]);
  
  const socket = new WebSocket("ws://localhost:3300");

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        action: "getPuntajes",
      })
    );
  };

  socket.onmessage = (key) => {
    const dataJson = JSON.parse(key.data);
    switch (dataJson.key) {
      case "puntajes":
        setPuntajes([])
        setPuntajes(dataJson.data)
        break;
      case "newPuntaje":
        setPuntajes([])
        setPuntajes(dataJson.data)
        break;
      default:
        console.log("ERROR");
        break;
    }
  };

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
