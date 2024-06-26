import React, { useState, useEffect } from "react";
import "../../css/tablaPuntaje.css";
import Header from "./HeaderWB";
import { jwtDecode } from "jwt-decode";

const LongPollingExample = () => {
  const [puntajes, setPuntajes] = useState([]);
  const [socket,setSockets] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || expiracionToken(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("nombre");
      window.location.href = "/";
    }

    function setNewWebsockets(message) {
      console.log(message);
      const newSocket = new WebSocket("ws://localhost:3300");
      newSocket.onopen = () => {
        console.log('conexion a websockets inicializada');
        setSockets(socket);
        newSocket.send(
          JSON.stringify({
            action: "getPuntajes",
          })
        );
      };
    
      newSocket.onmessage = (key) => {
        const dataJson = JSON.parse(key.data);
        switch (dataJson.key) {
          case "puntajes":
            setPuntajes([]);
            setPuntajes(dataJson.data);
            break;
          case "newPuntaje":
            setPuntajes([]);
            setPuntajes(dataJson.data);
            break;
          default:
            console.log("ERROR");
            break;
        }
      };

      newSocket.onclose = () => {
        setTimeout(() => setNewWebsockets('la conexion a websockets ha sido cerrada, intentando reconectar'), 1500);
      }

      newSocket.onerror = () => {
        console.log('error en la conexion con websockets');
        newSocket.close();
      }
    }

    if (!socket) {
      setNewWebsockets('iniciando la conexion con websockets');
    }

    return () => {
      if (socket) {
        socket.close();
      }
    }

  });

  function expiracionToken(token) {
    try {
      const decodedToken = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000;
      return expirationDate < new Date().getTime();
    } catch {
      return true;
    }
  }

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
            {puntajes ? puntajes.map((puntaje, index) => (
              <tr key={index}>
                <td>{puntaje.nombre}</td>
                <td>{puntaje.puntaje}</td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LongPollingExample;
