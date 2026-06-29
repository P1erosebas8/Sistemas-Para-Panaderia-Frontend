import api from './api';

export const analyticsService = {
  getSales: async () => {
    const response = await api.get('/admin/analytics/sales');
    return response.data;
  },
  
  getTopProducts: async () => {
    const response = await api.get('/admin/analytics/top-products');
    return response.data;
  },

  getLowStock: async () => {
    const response = await api.get('/admin/analytics/low-stock');
    return response.data;
  }
};
