import axios from 'axios';
const PRODUCTION_BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = PRODUCTION_BASE_URL || '/api';

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});
