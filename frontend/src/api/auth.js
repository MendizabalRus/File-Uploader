import { apiFetch } from './api';

export const meRequest = () => apiFetch('/api/auth/me');

export const loginRequest = (credentials) => apiFetch('/api/log-in', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials) });

export const logoutRequest = () => apiFetch("/api/log-out", { method: "POST" });

