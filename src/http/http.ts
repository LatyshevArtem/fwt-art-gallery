import axios from 'axios';
import { BASE_URL } from '../consts/consts';

const http = axios.create({
  baseURL: BASE_URL,
});

export { http };
