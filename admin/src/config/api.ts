export const REMOTE_API = import.meta.env.VITE_REMOTE_API || 'https://api.demoislara.tech';
export const USE_REMOTE_DEFAULT = import.meta.env.VITE_USE_REMOTE === 'true';

export function getApiMode(): 'local' | 'remote' {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('API_MODE') : null;
  if (stored === 'remote' || stored === 'local') return stored as 'local' | 'remote';
  return USE_REMOTE_DEFAULT ? 'remote' : 'local';
}

export function setApiMode(mode: 'local' | 'remote') {
  if (typeof window !== 'undefined') localStorage.setItem('API_MODE', mode);
}

/**
 * Build the full URL for an API endpoint.
 * Pass endpoint without the `/api` prefix, e.g. `/integrated-services` or `/registration?page=1`.
 */
export function apiPath(endpoint: string) {
  const ep = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
  const mode = getApiMode();
  if (mode === 'remote') {
    return REMOTE_API.replace(/\/$/, '') + '/api' + ep;
  }
  // local uses proxied relative /api path (Vite proxy)
  return '/api' + ep;
}

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const url = apiPath(endpoint);
  return fetch(url, options);
}
