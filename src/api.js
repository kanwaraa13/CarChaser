import axios from 'axios';

const api = axios.create({
  baseURL: 'https://topdevit.com/clients/carchaser/public/api', 
});

export default api;