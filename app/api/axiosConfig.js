import axios from 'axios';


const API_URL = 'https://socialreset-api-final.onrender.com/api'; 

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
