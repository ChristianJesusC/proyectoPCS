import React from "react";
import "../componentes/css/headerStyle.css";

const Header = () => {
  const nombre = localStorage.getItem("nombre");

  const salirSesion = () => {
    localStorage.removeItem("nombre");
  };

  return (
    <header className="header-container">
      <h1 className="header-title">{nombre}</h1>
      <nav className="header-nav">
        <ul>
          <li>
            <a href="/inicio">Inicio</a>
          </li>
          <li>
            <a href="/juego">Juego</a>
          </li>
          <li>
            <a href="/agenda">Agenda</a>
          </li>
          <li>
            <a href="/wh">WebHooks</a>
          </li>
          <li>
            <a onClick={salirSesion} href="/">
              Salir sesión
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
