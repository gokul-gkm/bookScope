import api from './api';

export const login = (credentials) => api.post('/users/login', credentials);
export const register = (userData) => api.post('/users/register', userData);
export const getProfile = () => api.get('/users/profile');