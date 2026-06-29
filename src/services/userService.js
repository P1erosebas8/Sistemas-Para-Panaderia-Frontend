import api from './api';

export const userService = {
  // Admin endpoints (Since there isn't an explicit /admin/users in the controllers listed previously, we might need a fallback or verify if we have it)
  // Let's assume we can fetch them or we just mock activeStaff if not available. 
  // Wait, I saw a UserController but maybe no admin all users? Let's add a placeholder that we can adjust.
  getAllUsers: async () => {
    // If backend doesn't have it, we might catch the error in the component.
    const response = await api.get('/admin/users'); 
    return response.data;
  }
};
