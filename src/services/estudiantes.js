import { API_URL } from "../config/apiConfig";

const ENDPONT = "/estudiantes";

export const getEstudiantes = async (token) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(API_URL + ENDPONT, options);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json);
  }

  return json.data;
};


//Esta funcio crea un estudiante
export const createEstudiante = async (token, estudiante) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(estudiante),
  };

  const res = await fetch(API_URL + ENDPONT, options);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
};