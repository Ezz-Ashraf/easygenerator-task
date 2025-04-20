import axios from 'axios';
import { CurrentUser, SignInPayload, SignInResponse, SignUpPayload, SignUpResponse } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export async function signInUser(payload: SignInPayload): Promise<SignInResponse> {
  const { data } = await api.post<SignInResponse>('/auth/login', payload);
  return data;
}

export async function signUpUser(payload: SignUpPayload): Promise<SignUpResponse> {
  const { data } = await api.post<SignUpResponse>('/auth/signup', payload);
  return data;
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const { data } = await api.get<CurrentUser>('/orders');
  return data;
}
