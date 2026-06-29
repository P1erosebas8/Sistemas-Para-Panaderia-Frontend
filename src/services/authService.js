import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  verifyOtp: async (data) => {
    const response = await api.post('/auth/verifyOtp', data);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgotPassword', { email });
    return response.data;
  },

  resetPassword: async (data) => {
    // data expected: { email, otp, newPassword }
    const response = await api.post('/auth/resetPassword', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  }
};
