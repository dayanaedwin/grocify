import axios, { InternalAxiosRequestConfig } from 'axios';
import { APIS } from '../constants';
import { useNavigate } from 'react-router-dom';

// Create axios instance with default settings
export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
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
        if ([401, 403].includes(error.response.status)) {
            localStorage.removeItem('token');
            const navigate = useNavigate();
            navigate('/login');
        }
        return Promise.reject(error);
    }
);