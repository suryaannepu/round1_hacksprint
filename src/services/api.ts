import axios from 'axios';
import { AuthResponse, HealthRecord, Reminder, CreateReminderData, CreateRecordData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post<AuthResponse>('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),
  
  me: () => api.get('/auth/me'),
};

export const healthAPI = {
  getRecords: (owner?: string) => 
    api.get<{ records: HealthRecord[] }>('/health', { params: { owner } }),
  
  createRecord: (data: CreateRecordData) =>
    api.post<{ record: HealthRecord }>('/health', data),
  
  updateRecord: (id: string, data: Partial<CreateRecordData>) =>
    api.put<{ record: HealthRecord }>(`/health/${id}`, data),
  
  deleteRecord: (id: string) =>
    api.delete(`/health/${id}`),
};

export const reminderAPI = {
  getReminders: () =>
    api.get<{ reminders: Reminder[] }>('/reminders'),
  
  createReminder: (data: CreateReminderData) =>
    api.post<{ reminder: Reminder }>('/reminders', data),
  
  markDone: (id: string) =>
    api.post(`/reminders/${id}/done`),
};

export const exportAPI = {
  exportPDF: () => {
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/export/pdf`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
  
  exportJSON: () => {
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/export/json`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

export default api;