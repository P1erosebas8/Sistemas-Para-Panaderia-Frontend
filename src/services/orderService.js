import api from './api';

export const orderService = {
  // Public
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  // Admin
  getAllOrdersAdmin: async () => {
    const response = await api.get('/admin/orders/all');
    return response.data;
  },

  updateOrderStatus: async (id, statusData) => {
    const response = await api.patch(`/admin/orders/${id}/status`, statusData);
    return response.data;
  }
};
