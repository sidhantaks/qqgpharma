const REMOTE_API = process.env.REACT_APP_REMOTE_API || 'https://api.demoislara.tech';
const LOCAL_API = process.env.REACT_APP_LOCAL_API || 'http://localhost:5000';
const USE_REMOTE_DEFAULT = process.env.REACT_APP_USE_REMOTE === 'true';

function getApiMode() {
  try {
    const stored = localStorage.getItem('API_MODE');
    if (stored === 'remote' || stored === 'local') return stored;
  } catch (e) {}
  return USE_REMOTE_DEFAULT ? 'remote' : 'local';
}

function setApiMode(mode) {
  try { localStorage.setItem('API_MODE', mode); } catch (e) {}
}

function apiPath(endpoint) {
  const ep = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
  const mode = getApiMode();
  if (mode === 'remote') return REMOTE_API.replace(/\/$/, '') + '/api' + ep;
  // For the legacy CRA frontend we call the backend directly on localhost:5000
  return LOCAL_API.replace(/\/$/, '') + '/api' + ep;
}

async function apiFetch(endpoint, options) {
  const url = apiPath(endpoint);
  return fetch(url, options);
}

export { apiPath, apiFetch, getApiMode, setApiMode };
