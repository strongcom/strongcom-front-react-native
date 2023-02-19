import axios from 'axios';

const baseUrl = 'http://10.0.2.2:4000/api/';

export default axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
