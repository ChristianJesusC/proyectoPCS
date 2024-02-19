import React, { useEffect } from 'react';
import axios from 'axios';

const NotificacionesComponent = () => {
  useEffect(() => {
    const notificaciones = document.getElementById("notificaciones");

    const pintarNotificacion = (notificacion) => {
      const li = document.createElement("li");
      li.innerText = `${notificacion.cuerpo}`;

      notificaciones.appendChild(li);
    };

    const pintarNotificaciones = (notificaciones) => {
      for (const notificacion of notificaciones) {
        pintarNotificacion(notificacion);
      }
    };

    const obtenerNotificaciones = async () => {
      try {
        const res = await axios.get("http://localhost:3300/notificaciones");
        const data = res.data;
        const notificaciones = data.notificaciones;
        pintarNotificaciones(notificaciones);
        console.log(notificaciones);
      } catch (error) {
        console.log(error);
      }
    };

    const obtenerNotificacionNueva = async () => {
      try {
        const res = await axios.get("http://localhost:3300/nueva-notificacion");
        const data = res.data;
        pintarNotificacion(data.notificacion);
      } catch (error) {
        console.log(error);
      } finally {
        obtenerNotificacionNueva();
        console.log("nuevo");
      }
    };

    const enviarNotificacion = async (cuerpo) => {
      if (!isNaN(cuerpo)) {
        try {
          const res = await axios.post("http://localhost:3300/notificaciones", { cuerpo });
          const data = res.data;
          console.log(data.message);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Error: El cuerpo de la notificación debe ser un número");
      }
    };

    document.getElementById("nueva-notificacion-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const cuerpo = document.getElementById("cuerpo-input").value;
      enviarNotificacion(cuerpo);
      document.getElementById("cuerpo-input").value = "";
    });

    obtenerNotificaciones();
    obtenerNotificacionNueva();
  }, []);

  return (
    <div>
      <h2>Notificaciones</h2>
      <ul id="notificaciones"></ul>
      <form id="nueva-notificacion-form">
        <input type="text" id="cuerpo-input" placeholder="Cuerpo de la notificación (solo números)" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default NotificacionesComponent;