import React, { useEffect, useState } from 'react'
import { ModalEstudiantes } from '../components/ModalEstudiantes'
import { getEstudiantes } from '../services/estudiantes';
import { useSelector } from 'react-redux';
import { ListaEstudiantes } from '../components/ListaEstudiantes';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getEstudiantes(token).then((res) => setEstudiantes(res));
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between py-3 border-bottom">
        <h1>Formulario de Estudiantes</h1>
        <ModalEstudiantes />
      </div>
      <ListaEstudiantes estudiantes={estudiantes} />
    </>
  );
};

export { Estudiantes }
