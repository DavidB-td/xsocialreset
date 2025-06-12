import axios from 'axios';

// Usaremos localhost porque o app web e a api rodam na mesma máquina
const API_URL = 'http://localhost:5000/api'; 

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;