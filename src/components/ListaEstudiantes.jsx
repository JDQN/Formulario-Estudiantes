import React from "react";
import { Table } from "react-bootstrap";

function ListaEstudiantes({ estudiantes }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Celular</th>
          <th>Correo</th>
          <th>LinkedIn</th>
          <th>GitHub</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((estudiante) => (
          <tr key={estudiante.estudiante_id}>
            <td>{estudiante.estudiante_id}</td>
            <td>{estudiante.estudiante_nombres}</td>
            <td>{estudiante.estudiante_apellidos}</td>
            <td>{estudiante.estudiante_celular}</td>
            <td>{estudiante.estudiante_correo}</td>
            <td>{estudiante.estudiante_linkedin}</td>
            <td>{estudiante.estudiante_github}</td>
            <td>{estudiante.estudiante_estado}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export { ListaEstudiantes };