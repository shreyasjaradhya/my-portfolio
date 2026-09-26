import api from './api';

const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  if (response.data.token) {
    localStorage.setItem('adminToken', response.data.token);
    localStorage.setItem('adminUser', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

const getToken = () => {
  return localStorage.getItem('adminToken');
};

const isAuthenticated = () => {
  return !!getToken();
};

const authService = {
  login,
  logout,
  getToken,
  isAuthenticated,
};

export default authService;
