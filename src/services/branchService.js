import api from './api';

export const branchService = {
  // Public endpoints
  getAllBranches: async () => {
    const response = await api.get('/branches');
    return response.data;
  },

  // Admin endpoints
  getAllBranchesAdmin: async () => {
    const response = await api.get('/admin/branches');
    return response.data;
  },

  createBranch: async (branchData) => {
    const response = await api.post('/admin/branches', branchData);
    return response.data;
  },

  toggleBranchStatus: async (id) => {
    const response = await api.patch(`/admin/branches/${id}/toggle-status`);
    return response.data;
  }
};
