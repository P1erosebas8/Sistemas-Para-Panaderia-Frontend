import api from './api';

export const productService = {
  // Public endpoints
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (categoryId) => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },

  // Admin endpoints
  getAllProductsAdmin: async () => {
    const response = await api.get('/admin/products/all');
    return response.data;
  },

  getLowStockProducts: async () => {
    const response = await api.get('/admin/products/low-stock');
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  },

  toggleProductStatus: async (id) => {
    const response = await api.patch(`/admin/products/${id}/toggle-status`);
    return response.data;
  }
};
