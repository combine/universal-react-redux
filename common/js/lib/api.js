import axios from 'axios';

const headers = { 'Content-Type': 'application/json' };
const baseURL = process.env.APPLICATION_BASE_URL || '';
const api = axios.create({ baseURL, headers, timeout: 200000 });

api.interceptors.response.use(
  (response) => Promise.resolve(response.data)  ,
  (err) => Promise.reject(err.response.data)
);

module.exports = api;
