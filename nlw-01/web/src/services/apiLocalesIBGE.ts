import axios from 'axios';

// https://servicodados.ibge.gov.br/api/v1/localidades/estados/CE/municipios
// https://servicodados.ibge.gov.br/api/v1/localidades/estados

const api = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
});

export default api;
