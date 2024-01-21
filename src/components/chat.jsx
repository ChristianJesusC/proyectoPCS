import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";
import estiloChat from "../css/chat.css"

const socket = io("http://localhost:3300");

function Chat() {
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [conectado, setConectado] = useState();

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
    socket.emit("mensajeChat", {
      usuario: socket.id,
      mensaje: nuevoMensaje,
    });
  };
  return (
    <div>
      <div className="chat">
        {mensajes.map((mensaje) => (
          <p className="mb-2 text-center border-bottom">
            {mensaje.usuario}:{mensaje.mensaje}
          </p>
        ))}
      </div>
      <input type="text" onChange={(e) => setNuevoMensaje(e.target.value)} />
      <Button onClick={enviarMensaje}>Enviar</Button>
    </div>
  );
}

export default Chat;
