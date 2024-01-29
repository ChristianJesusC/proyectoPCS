import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./componentes/FooterWB";
import Header from "./componentes/HeaderWB";
import { useEffect, useState } from "react";
import Publicaciones from "./componentes/PublicacionesWB";

const Inicio = () => {
  const nombre = localStorage.getItem("nombre");

  useEffect(() => {
    if (nombre === null) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <Header />
      <Publicaciones/>
    </div>
  );
};

export default Inicio;
