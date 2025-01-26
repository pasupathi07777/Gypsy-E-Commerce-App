import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.5:5000/api',
  withCredentials: true,
});


