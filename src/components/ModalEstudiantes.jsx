import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { createEstudiante } from '../services/estudiantes';
import { Notificacion } from './Notificacion';

const ModalEstudiantes = () => {
  const [show, setShow] = useState(false);
  const [notificacion, setNotificacion] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;

    if (form.checkValidity()) {
      const formData = new FormData(form);
      const nuevoEstudiante = Object.fromEntries(formData);

      const fixedEstudiante = {
        ...nuevoEstudiante,
        tipoIdentificacion: parseInt(nuevoEstudiante.tipoIdentificacion),
        numeroIdentificacion: parseInt(nuevoEstudiante.numeroIdentificacion),
        celular: parseInt(nuevoEstudiante.celular),
      };
      console.log(fixedEstudiante);

      try {
        const respuesta = await createEstudiante(token, fixedEstudiante);

        if (respuesta) {
          setNotificacion({
            title: "Felicidades",
            message: "El estudiante ha sido creado correctamente",
          });
        }
      } catch (error) {
        console.log("Error", error.message);
        setNotificacion({
          title: "Error",
          message: error.message,
        });
      } finally {
        setShow(false);
      }
    }

    setValidated(true);
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Crear Estudiante
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de documento</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="tipoIdentificacion"
                required
              >
                <option disabled>Seleccionar tipo de documento</option>
                <option value="1">Cédula</option>
                <option value="2">Tarjeta de identidad</option>
                <option value="3">Pasaporte</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Numero de Identificacion</Form.Label>
              <Form.Control
                type="numbre"
                placeholder="Numero de Identificacion"
                name='numeroIdentificacion'
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombres"
                name='nombres'
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name='apellidos'
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom04">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="numbre"
                placeholder="Celular"
                name='celular'
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom05">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name='correo'
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom06">
              <Form.Label>Linkedin</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://linkedin.com/in/"
                name='linkedin'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom07">
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://github.com/"
                name='github'
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type='submit' variant="primary" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal >

      {notificacion ? <Notificacion notificacion={notificacion} /> : null}
    </>
  );
}

export { ModalEstudiantes }