import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://sistemas-para-panaderia-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('briselli_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Manejo global de errores (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar errores globales, como redireccionar al login si hay un 401
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('briselli_token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
