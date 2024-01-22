import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import estiloChat from "../css/chat.css";
import moment from "moment";
import axios from "axios";

const socket = io("http://localhost:3300");

function Chat() {
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [conectado, setConectado] = useState();
  const nombre = localStorage.getItem("nombre");

  useEffect(() => {
    socket.on("connect", () => setConectado(true));

    socket.on("mensajeChat", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
    });

    return () => {
      socket.off("mensajeChat");
      socket.off("connect");
    };
  }, []);

  const enviarMensaje = () => {
    const fechaHora = new Date();
    const fechaHoraFormateada = moment(fechaHora).format("DD/MM/YYYY HH:mm");

    const mensaje = {
      usuario: nombre,
      mensaje: nuevoMensaje,
      fecha: fechaHoraFormateada,
    };

    socket.emit("mensajeChat", mensaje);
    axios
      .post("http://localhost:3300/mensajes/enviar", mensaje)
      .then((response) => {
        console.log("Mensaje enviado correctamente");
      })
      .catch((error) => {
        console.log("Error al enviar el mensaje");
      });
  };

  return (
    <div>
      <div className="chat">
        {mensajes.map((mensaje) => (
          <p
            className={`mb-2 text-center border-bottom ${
              mensaje.usuario === nombre ? "mensaje-propio" : ""
            }`}
          >
            {mensaje.usuario}:{mensaje.mensaje}:{mensaje.fecha}
          </p>
        ))}
      </div>
      <input type="text" onChange={(e) => setNuevoMensaje(e.target.value)} />
      <Button onClick={enviarMensaje}>Enviar</Button>
    </div>
  );
}

export default Chat;
