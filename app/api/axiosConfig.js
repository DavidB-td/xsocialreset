import axios from 'axios';

// !! SUBSTITUA 'SEU_IP_LOCAL' PELO IP QUE VOCÊ ENCONTROU NO PASSO 0 !!
const API_URL = 'http://192.168.1.10:5000/api';

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;