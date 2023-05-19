import { API_URL } from "../config/apiConfig";

const ENDPONT = '/tokens'

export const getToken = async (crendenciales) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(crendenciales),
  };

  const res = await fetch(API_URL + ENDPONT, options);
  const json = await res.json();

  if (!res.ok) {
    throw new Error('Algo Falló')
  }

  return json.token;
};