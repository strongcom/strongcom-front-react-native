import axios from 'axios';

const baseUrl = 'http://192.168.0.24:8080';

export default axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
