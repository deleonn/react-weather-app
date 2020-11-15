import axios from 'axios';

/**
 * Create the weather api axios instance. Receives a default env value
 * as REACT_APP_API_URL
 */

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});
