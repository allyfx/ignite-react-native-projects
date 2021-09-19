import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.102:3333',
  responseType: 'json',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (typeof err.response === 'undefined') {
      return 'die';
    }
    return err.response;
  },
);

export default api;
