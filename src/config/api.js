// Centralized API configuration
// In production or local single-server hosting, API_BASE_URL is empty string ('')
// If frontend and backend are hosted on separate domains, set VITE_API_URL in .env
export const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
