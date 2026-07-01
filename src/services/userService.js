import api from './api';

export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/admin/users'); 
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/users/me', data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await api.patch('/users/me/password', data);
    return response.data;
  }
};
