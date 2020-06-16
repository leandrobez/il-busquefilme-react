import axios from 'axios';
export const apiURL = '/busquefilme/api/';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE + process.env.REACT_APP_HOST_PORT,
});

api.interceptors.request.use(async (config) => {
  return config;
});

export const registerUser = async (data) => {
  const endPointRegister = 'user/register';
  return await api.post(apiURL + endPointRegister, data);
};

export const registerNewCustomer = async (data) => {
  const endPointRegister = 'customer/register';
  return await api.post(apiURL + endPointRegister, data);
};
