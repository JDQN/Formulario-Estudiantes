import { useState } from "react";
import { Toast } from "react-bootstrap";

function Notificacion({ notificacion }) {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);
  console.log(notificacion);
  return (
    <Toast
      show={show}
      onClose={toggleShow}
      className="position-fixed left-0 bottom-0 mb-3"
    >
      <Toast.Header>
        <strong className="me-auto">{notificacion.title}</strong>
      </Toast.Header>
      <Toast.Body>{notificacion.message}</Toast.Body>
    </Toast>
  );
}

export { Notificacion };
