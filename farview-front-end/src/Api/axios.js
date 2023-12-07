import axios from 'axios';
let BASE_URL;
if (window.location.origin === 'http://localhost:3000') {
  BASE_URL = '/api';
} else {
  BASE_URL = `${window.location.origin}/farview-app/v1`;
}

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});
