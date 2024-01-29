import React from "react";
import { Button, Container } from "react-bootstrap";

function SalaChats() {
  const redireccion1 = () => {
    window.location.href = "/chat1";
  };
  const redireccion2 = () => {
    window.location.href = "/chat2";
  };
  const redireccion3 = () => {
    window.location.href = "/chat3";
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1>Selecciona un chat</h1>
        <Button
          variant="primary"
          size="lg"
          onClick={redireccion1}
          className="mt-4"
        >
          Chat 1
        </Button>
      </div>
    </Container>
  );
}

export default SalaChats;
