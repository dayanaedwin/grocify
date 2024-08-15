import axios, { InternalAxiosRequestConfig } from 'axios';
import { APIS } from '../constants';

// Create axios instance with default settings
export const axiosInstance = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && ![APIS.LOGIN, APIS.REGISTER].includes(config.url)) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);