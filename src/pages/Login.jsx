import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { translation } from '../assets/translation';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/slices/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/token';


const Login = () => {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/*');
    }
  }, [token, navigate]);

  const dispatch = useDispatch();
  const { lang } = useSelector(state => state.settings);
  const [email, setEmail] = useState('');
  const [identificacion, setIdentificacion] = useState('');

  const crearSesion = async (e) => {
    e.preventDefault();
    // const token = '123456789';

    const token = await getToken({ identificacion, correo: email });

    dispatch(login({ id: identificacion, correo: email, token }));
    navigate('/*');
  }


  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={12}>
          <Card className="p-4 shadow">
            <Card.Title className="text-center mb-4">Iniciar sesión</Card.Title>
            <Form onSubmit={crearSesion}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{translation[lang].placeHolderId}</Form.Label>
                <Form.Control
                  value={identificacion}
                  onChange={(e) => setIdentificacion(e.target.value)}
                  type="number"
                  placeholder={translation[lang].placeHolderId}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{translation[lang].placeHolderCorreo}</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={translation[lang].placeHolderCorreo}
                />
              </Form.Group>
              <Button className="w-100" variant="primary" type="submit">
                Ingresar
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};
export { Login };