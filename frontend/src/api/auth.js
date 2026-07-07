import { apiFetch } from './api';

export const meRequest = () => apiFetch('/api/auth/me');

export const loginRequest = (credentials) => apiFetch('/api/auth/log-in', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials) });

export const logoutRequest = () => apiFetch("/api/auth/log-out", { method: "POST" });

