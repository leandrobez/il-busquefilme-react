import axios from 'axios';

import { getToken } from './auth';

export const apiUrl = '/busquefilme/api/';

const api = axios.create({
  baseURL: 'http://localhost:' + process.env.REACT_APP_HOST_PORT
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
