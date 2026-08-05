export function showLogoutNotice(callback, message = 'Logged out') {
  try {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_profile');
    window.dispatchEvent(new Event('customer_profile_updated'));
  } catch (e) {}

  const el = document.createElement('div');
  el.textContent = message;
  Object.assign(el.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%) translateY(-10px)',
    background: 'rgba(0,0,0,0.85)',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '6px',
    zIndex: 10000,
    opacity: '0',
    transition: 'opacity 0.25s ease, transform 0.25s ease'
  });
  document.body.appendChild(el);
  // show
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
  });
  // hide after short delay
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(-10px)';
    setTimeout(() => {
      try { document.body.removeChild(el); } catch (e) {}
      if (typeof callback === 'function') callback();
    }, 250);
  }, 900);
}
