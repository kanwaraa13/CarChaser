import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend.carchaser.ca/api', 
});

export default api;