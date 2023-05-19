import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { translation } from '../assets/translation';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/slices/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/token';
import { useFormik } from 'formik';
import * as Yup from 'yup';





const LoginFormik = () => {

  const { lang } = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const validationLogin = Yup.object({
    identificacion: Yup.number().required(translation[lang].campoRequerido),
    email: Yup.string().email(translation[lang].emailInvalido).required(translation[lang].campoRequerido),
    accetaTerminos: Yup.boolean().oneOf([true], translation[lang].acceptarTerminos)
  })

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/*');
    }
  }, [token, navigate]);



  const formik = useFormik({
    initialValues: {
      identificacion: '',
      email: '',
      accetaTerminos: false
    },
    validationSchema: validationLogin,
    onSubmit: async (values) => {
      const token = await getToken({ identificacion: values.identificacion, correo: values.email });
      dispatch(login({ id: values.identificacion, correo: values.email, token }));
      navigate('/*');
    }
  });

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={12}>
          <Card className="p-4 shadow">
            <Card.Title className="text-center mb-4">Iniciar sesión con Formik</Card.Title>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{translation[lang].placeHolderId}</Form.Label>

                <Form.Control
                  name="identificacion"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.identificacion}
                  placeholder={translation[lang].placeHolderId}
                  isInvalid={formik.errors.identificacion && formik.touched.identificacion}
                  onBlur={formik.handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.identificacion}
                </Form.Control.Feedback>

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{translation[lang].placeHolderCorreo}</Form.Label>

                <Form.Control
                  name='email'
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder={translation[lang].placeHolderCorreo}
                  isInvalid={formik.errors.email && formik.touched.email}
                  onBlur={formik.handleBlur}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>

                <Form.Group controlId='terminos'>
                  <Form.Check
                    name='accetaTerminos'
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.accetaTerminos}
                    placeholder='Acepta terminos y condiciones'
                    isInvalid={formik.errors.accetaTerminos && formik.touched.accetaTerminos}
                    onBlur={formik.handleBlur}
                    feedback={formik.errors.accetaTerminos}
                    feedbackType='invalid'
                  />
                </Form.Group>

              </Form.Group>
              <Button className="w-100" variant="primary" type="submit">
                {translation[lang].ingresar}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};
export { LoginFormik };