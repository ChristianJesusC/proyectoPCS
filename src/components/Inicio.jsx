import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer } from './componentes/FooterWB';

const Inicio = () => {
  const redireccional = () => {
    window.location.href = '/short';
  };

  return (
    <div>
      <Button type="button" class="btn btn-primary" onClick={redireccional}>Shortpoling</Button>
      <Button type="button" class="btn btn-primary btn-lg">Chat Global</Button>
      <Footer/>
    </div>
  );
};

export default Inicio;
