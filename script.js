/* Accessible JS for navigation, theme, modals, and form enhancements */
(function () {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('nav-menu');
  const themeToggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;

  // Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.getAttribute('data-open') === 'true';
      navMenu.setAttribute('data-open', String(!open));
      navToggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // Theme toggle (persists in localStorage)
  const THEME_KEY = 'theme';
  const applyTheme = (theme) => {
    if (theme === 'dark' || (theme === 'auto' && prefersDark.matches)) {
      root.style.colorScheme = 'dark';
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      root.style.colorScheme = 'light';
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };
  const saved = localStorage.getItem(THEME_KEY) || 'auto';
  applyTheme(saved);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = localStorage.getItem(THEME_KEY) || 'auto';
      const next = current === 'dark' ? 'light' : (current === 'light' ? 'auto' : 'dark');
      localStorage.setItem(THEME_KEY, next);
      themeToggle.setAttribute('aria-pressed', next === 'dark');
      applyTheme(next);
      themeToggle.title = `Theme: ${next}`;
    });
  }
  prefersDark.addEventListener('change', () => applyTheme(localStorage.getItem(THEME_KEY) || 'auto'));

  // Accessible modals
  function setupModal(buttonSelector, dialogId) {
    const buttons = document.querySelectorAll(`[data-modal="${dialogId}"]`);
    const dialog = document.getElementById(`modal-${dialogId}`);
    if (!dialog || !buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => dialog.showModal());
    });
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      dialog.close();
    });
  }
  // Map data-modal values to dialog IDs
  ['cs1','cs2','cs3'].forEach(id => {
    const dialog = document.getElementById(`modal-${id}`);
    if (!dialog) return;
    const triggers = document.querySelectorAll(`[data-modal="${id}"]`);
    triggers.forEach(t => t.addEventListener('click', () => dialog.showModal()));
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const inDialog = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
      if (!inDialog) dialog.close();
    });
  });

  // Contact form client-side validation (progressive enhancement)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const msg = document.getElementById('message');
      let valid = true;
      [name, email, msg].forEach(field => {
        if (!field.value.trim()) {
          field.setAttribute('aria-invalid', 'true');
          field.focus();
          valid = false;
        } else {
          field.removeAttribute('aria-invalid');
        }
      });
      if (!valid) {
        e.preventDefault();
        alert('Please fill out all fields.');
        return;
      }
      // Build mailto URL with subject/body
      const subject = encodeURIComponent('Portfolio contact from ' + name.value.trim());
      const body = encodeURIComponent(msg.value.trim() + '\n\nFrom: ' + name.value.trim() + ' (' + email.value.trim() + ')');
      form.action = `mailto:someone@example.com?subject=${subject}&body=${body}`;
    });
  }
})();