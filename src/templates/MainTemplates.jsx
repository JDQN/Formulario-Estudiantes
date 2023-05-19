import React, { useEffect } from 'react'
import { Container, Nav, Navbar, Badge } from 'react-bootstrap';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { Nosotros } from '../pages/Nosotros';
import { Inicio } from '../pages/Inicio';
import { Contacto } from '../pages/Contacto';
import { Estudiantes } from '../pages/Estudiantes';
import { useSelector, useDispatch } from 'react-redux';
import { setLang, setTheme } from '../store/slices/setting/SettingsSlice';
import { translation } from '../assets/translation';
import { useNavigate } from 'react-router-dom';
import { logout } from "../store/slices/auth/AuthSlice";



const MainTemplates = () => {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const dispatch = useDispatch();
  const { theme, lang } = useSelector((state) => state.settings);

  const changeLanguage = () => {
    lang === "es" ? dispatch(setLang("en")) : dispatch(setLang("es"));
  }

  const changeTheme = () => {
    theme === "light" ? dispatch(setTheme("dark")) : dispatch(setTheme("light"));
  }



  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Grupo FrontEnd</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/pag-inicio">{translation[lang].inicio}</Nav.Link>
              <Nav.Link as={Link} to="/pag-nosotros">{translation[lang].nosotros}</Nav.Link>
              <Nav.Link as={Link} to="/pag-contacto">{translation[lang].contacto}</Nav.Link>
              <Nav.Link as={Link} to="/pag-estudiantes">{translation[lang].estudiantes}</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={changeLanguage}>
                <Badge bg="danger">
                  {lang}
                </Badge>
              </Nav.Link>
              <Nav.Link onClick={changeTheme}>
                <Badge bg="success">
                  {theme}
                </Badge>
              </Nav.Link>
              <Nav.Link onClick={() => dispatch(logout())}>
                {translation[lang].textLogout}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/pag-inicio" element={<Inicio />} />
          <Route path="/pag-nosotros" element={<Nosotros />} />
          <Route path="/pag-contacto" element={<Contacto />} />
          <Route path="/pag-estudiantes" element={<Estudiantes />} />
        </Routes>
      </Container>
    </>
  );
};


export { MainTemplates }
