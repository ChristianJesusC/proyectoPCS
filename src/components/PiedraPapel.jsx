import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/juego.css";
import Header from "./componentes/HeaderWB";

const PiedraPapelTijeras = () => {
  const opciones = ["piedra", "papel", "tijeras"];
  const [jugador, setJugador] = useState(null);
  const [computadora, setComputadora] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [bloquearBotones, setBloquearBotones] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [perdio, setPerdio] = useState(false);
  const nombreUsuario = localStorage.getItem("nombre");
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (puntaje > 0) {
      guardarPuntajeEnBD();
    }
    window.location.href = "/tabla";
  };

  useEffect(() => {
    if (nombreUsuario === null) {
      window.location.href = "/";
    }
  }, []);

  const guardarPuntajeEnBD = (nombre) => {
    const datosJugador = {
      nombre: nombreUsuario,
      puntaje: puntaje,
    };
    axios
      .post("http://localhost:3300/puntaje/guardar", datosJugador)
      .then((response) => {
        console.log("Puntaje guardado en la base de datos");
      })
      .catch((error) => {
        console.log("Error al guardar el puntaje en la base de datos:", error);
      });
  };

  const jugar = (opcion) => {
    if (perdio) return;
    setJugador(opcion);
    setBloquearBotones(true);

    setTimeout(() => {
      const indiceComputadora = Math.floor(Math.random() * 3);
      const opcionComputadora = opciones[indiceComputadora];
      setComputadora(opcionComputadora);

      if (opcion === opcionComputadora) {
        setResultado("Empate");
        setBloquearBotones(false);
      } else if (
        (opcion === "piedra" && opcionComputadora === "tijeras") ||
        (opcion === "papel" && opcionComputadora === "piedra") ||
        (opcion === "tijeras" && opcionComputadora === "papel")
      ) {
        setResultado("Ganaste");
        setPuntaje((prevPuntaje) => prevPuntaje + 100);
        setBloquearBotones(false);
      } else {
        setResultado("Perdiste");
        setPerdio(true);
      }
    }, 1000);
  };

  const reiniciarJuego = () => {
    if (puntaje > 0) {
      guardarPuntajeEnBD();
    }
    setJugador(null);
    setComputadora(null);
    setResultado(null);
    setBloquearBotones(false);
    setPuntaje(0);
    setPerdio(false);
  };
  const redireccionarMarcador = () => {};
  useEffect(() => {
    if (resultado !== null) {
      setTimeout(() => {
        setBloquearBotones(false);
      }, 2000);
    }
  }, [resultado]);

  return (
    <div>
      <Header />
      <div className="game-container">
        <h1 className="title">Piedra, Papel, Tijeras</h1>
        <div className="buttons-container">
          {opciones.map((opcion) => (
            <button
              key={opcion}
              className="button"
              onClick={() => jugar(opcion)}
              disabled={bloquearBotones}
            >
              {opcion}
            </button>
          ))}
        </div>
        {jugador && computadora && (
          <div className="result-container">
            <p>Tu elección: {jugador}</p>
            <p>Elección de la computadora: {computadora}</p>
            <p>Resultado: {resultado}</p>
            <p>Puntaje: {puntaje}</p>
            {perdio && (
              <div>
                <button className="button" onClick={reiniciarJuego}>
                  Reiniciar
                </button>
                <button className="button" onClick={handleClick}>
                  Tabla de puntaje
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PiedraPapelTijeras;
