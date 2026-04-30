import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const signup = (name, email, password) =>
  API.post('/auth/signup', { name, email, password });

export const login = (email, password) =>
  API.post('/auth/login', { email, password });

export const getCurrentUser = () =>
  API.get('/auth/me');

// Project APIs
export const createProject = (name, description) =>
  API.post('/projects', { name, description });

export const getProjects = () =>
  API.get('/projects');

export const getProject = (id) =>
  API.get(`/projects/${id}`);

export const updateProject = (id, data) =>
  API.put(`/projects/${id}`, data);

export const addProjectMember = (projectId, memberId) =>
  API.post(`/projects/${projectId}/members`, { memberId });

export const deleteProject = (id) =>
  API.delete(`/projects/${id}`);

// Task APIs
export const createTask = (data) =>
  API.post('/tasks', data);

export const getProjectTasks = (projectId) =>
  API.get(`/tasks/project/${projectId}`);

export const getDashboardTasks = () =>
  API.get('/tasks/user/dashboard');

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export default API;
