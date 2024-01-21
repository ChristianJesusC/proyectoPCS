import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './componentes/FooterWB';
import estilos from "../css/estilos.css"

const Inicio = () => {
  const redireccional = () => {
    window.location.href = '/chat';
  };

  return (
    <div>
      <p/>
      <Button type="button" class="btn btn-primary btn-lg" onClick={redireccional}>Chat Global</Button>
      <Footer/>
    </div>
  );
};

export default Inicio;
