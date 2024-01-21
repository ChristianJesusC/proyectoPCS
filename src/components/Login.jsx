import React, { useState } from "react";
import estiloLogin from "../css/login.css";
import { Footer } from "./componentes/FooterWB";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (email === "jesuschiu@gmail.com" && password === "hola123") {
      window.location.href = "/inicio";

    } else {
      alert("error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-titulo">Inicio de sesión</h1>
        <div className="login-input-container">
          <input
            type="text"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="login-input-container">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login-boton" onClick={handleSubmit}>
          Iniciar sesión
        </button>
        <p className="login-link">
          ¿No tienes una cuenta? <a href="registro">Registrarse</a>
        </p>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
