import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Contacto = () => {

  const [formState, setFormState] = useState({
    nombre: '',
    identificacion: '',
    correo: '',
    celular: ''
  });

  const [errors, setErrors] = useState({
    nombre: null,
    identificacion: null,
    correo: null,
    celular: null
  });

  const cambiarImput = (e) => {
    e.preventDefault();
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }


  const enviarFormulario = (e) => {
    e.preventDefault();
    const nuevosErrores = validarFormulario(e);
    if (Object.keys(nuevosErrores).length === 0) {
      setErrors({});
      alert('Formulario enviado correctamente');
      limpiarFormulario();
    } else {
      setErrors(nuevosErrores);
    }
  };

  const validarFormulario = (e) => {
    const nuevosErrores = {};

    if (!formState.nombre.trim() || formState.nombre === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!formState.identificacion.trim() || formState.identificacion === '') {
      nuevosErrores.identificacion = 'La identificacion es obligatoria';
    }

    if (!formState.correo.trim() || !formState.correo.includes('@')) {
      nuevosErrores.correo = 'El correo es inválido';
    }

    if (!formState.celular.trim() ||
      !/^\d+$/.test(formState.celular) ||
      formState.celular.length !== 10) {
      nuevosErrores.celular = 'El celular es inválido';
    }
    return nuevosErrores;
  }

  const limpiarFormulario = () => {
    setFormState({
      nombre: '',
      identificacion: '',
      correo: '',
      celular: ''
    });
  };

  return (

    <Form onSubmit={enviarFormulario}>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor='nombreInput'>Nombre:</Form.Label>
        <Form.Control
          type='text'
          name='nombre'
          id='nombreInput'
          value={formState.nombre}
          placeholder='Ingrese su nombre'
          onChange={cambiarImput}
          isInvalid={errors.nombre}
        />
        <Form.Control.Feedback type='invalid'>{errors.nombre}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor='identificacionInput'>Identificacion:</Form.Label>
        <Form.Control
          type='text'
          name='identificacion'
          id='identificacionInput'
          value={formState.identificacion}
          placeholder='Ingrese su identificacion'
          onChange={cambiarImput}
          isInvalid={errors.identificacion}
        />
        <Form.Control.Feedback type='invalid'>{errors.identificacion}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor='correoInput'>Correo:</Form.Label>
        <Form.Control
          type='email'
          name='correo'
          id='correoInput'
          value={formState.correo}
          placeholder='Ingrese su correo'
          onChange={cambiarImput}
          isInvalid={errors.correo}
        />
        <Form.Control.Feedback type='invalid'>{errors.correo}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor='celularInput'>Celular:</Form.Label>
        <Form.Control
          type='text'
          name='celular'
          id='celularInput'
          value={formState.celular}
          placeholder='Ingrese su celular'
          onChange={cambiarImput}
          isInvalid={errors.celular}
        />
        <Form.Control.Feedback type='invalid'>{errors.celular}</Form.Control.Feedback>
      </Form.Group>

      <Button
        type='submit'
        variant="outline-primary"
      >
        Enviar
      </Button>
    </Form>

  )
}

export { Contacto }
