import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: '/api', // Will be proxied in development
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            // Server responded with error
            const { status, data } = error.response;

            if (status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            }

            if (status === 403) {
                // Forbidden
                console.error('Access forbidden:', data.message);
            }

            if (status === 404) {
                // Not found
                console.error('Resource not found:', data.message);
            }

            if (status >= 500) {
                // Server error
                console.error('Server error:', data.message);
            }

            return Promise.reject(data);
        } else if (error.request) {
            // Request made but no response
            console.error('Network error: No response from server');
            return Promise.reject({ message: 'Network error. Please check your connection.' });
        } else {
            // Something else happened
            console.error('Error:', error.message);
            return Promise.reject({ message: error.message });
        }
    }
);

export default api;
