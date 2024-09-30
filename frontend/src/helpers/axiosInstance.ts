import axios, { InternalAxiosRequestConfig } from 'axios';
import { APIS } from '../constants';

// Create axios instance with default settings
export const axiosInstance = axios.create({
    baseURL: window.location.host.includes('localhost') ? '' : process.env.REACT_APP_API_URL,
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

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);