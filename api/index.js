import axios from 'axios';

const baseUrl = 'http://127.0.0.1:4000/api/';

export default axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
