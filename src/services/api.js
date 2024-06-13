import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_VENDO_API,
});

axiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent
  config.headers.Authorization = `bearer ${vendoData.token}`;
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

export default axiosInstance;
