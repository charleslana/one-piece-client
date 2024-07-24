import axios, { AxiosError } from 'axios';
import router from '@/router';
import { getAccessToken, removeAccessToken } from '@/utils/local-storage-utils';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const reloadStatusCodes = [401, 403, 422, 429];

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && reloadStatusCodes.includes(error.response.status)) {
      const url = error!.config!.url;
      if (!url || !url.includes('auth/login')) {
        router.push('/login');
        removeAccessToken();
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
