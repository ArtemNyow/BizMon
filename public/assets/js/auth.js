import { setupDesktopUserUI } from './header.js';
import { showNotification } from './notification.js';

export function setupAuthHandlers(modals) {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const verifyForm = document.getElementById("verify-2fa-form");

  const registerModal = document.getElementById("register-backdrop");
  const loginModal = document.getElementById("login-backdrop");
  const verifyModal = document.getElementById("verify-2fa-backdrop");

  const passwordToggles = [
    { inputId: "register-password", buttonId: "toggle-register-password" },
    { inputId: "login-password", buttonId: "toggle-login-password" }
  ];

  passwordToggles.forEach(({ inputId, buttonId }) => {
    const input = document.getElementById(inputId);
    const toggleBtn = document.getElementById(buttonId);
    if (!input || !toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      const iconUse = toggleBtn.querySelector("use");
      if (iconUse) {
        iconUse.setAttribute("href", isHidden ? "/assets/icons.svg#icon-eye" : "/assets/icons.svg#icon-eye-off");
      }
    });
  });

  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const passwordInput = e.target.password;
    const password = passwordInput.value;
    const errorMessageEl = document.getElementById("register-password-error");

    const hasUpper = /[A-Z]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isLongEnough = password.length >= 6;

    if (!(hasUpper && hasLetter && hasDigit && isLongEnough)) {
      errorMessageEl.classList.remove("is-hidden");
      passwordInput.classList.add("input-error");
      return;
    } else {
      errorMessageEl.classList.add("is-hidden");
      passwordInput.classList.remove("input-error");
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.status === 400) {
        if (data.message === 'User already exists') {
          showNotification('⚠️ An account with this email already exists.');
        } else if (data.message === 'Invalid email format') {
          showNotification('⚠️ Please enter a valid email address.');
        } else if (data.message?.includes('Password')) {
          showNotification('⚠️ Password must be at least 6 characters, contain an uppercase letter and a digit.');
        } else {
          showNotification(data.message || '⚠️ Registration failed');
        }
        return;
      }

      if (res.status === 202) {
        localStorage.setItem('pendingRegistrationEmail', email);
        registerModal.classList.add("is-hidden");
        verifyModal.classList.remove("is-hidden");
      }
    } catch (err) {
      showNotification('❌ Server error during registration');
    }
  });

  loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const password = e.target.password.value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    let data;
    try {
      data = await res.json();
    } catch (jsonErr) {
      showNotification('❌ Unexpected server response');
      return;
    }

    if (!res.ok) {
      if (data.message === 'User not found') {
        showNotification('⚠️ No account found with this email.');
      } else if (data.message === 'Invalid credentials') {
        showNotification('⚠️ Incorrect password.');
      } else {
        showNotification(data.message || '⚠️ Login failed');
      }
      return;
    }

    if (data.need2FA) {
      localStorage.setItem('pendingLoginEmail', email);
      loginModal.classList.add("is-hidden");
      verifyModal.classList.remove("is-hidden");
    } else if (data.token) {
      loginModal.classList.add("is-hidden");
      e.target.reset();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userRole', data.role);
      if (data.avatar) localStorage.setItem('avatar', data.avatar);
      setupDesktopUserUI(data.name);
    }
  } catch (err) {
    showNotification('❌ Server error during login');
  }
});

  verifyForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const code = e.target.code.value.trim();
    const email = localStorage.getItem('pendingRegistrationEmail') || localStorage.getItem('pendingLoginEmail');
    const isRegistration = !!localStorage.getItem('pendingRegistrationEmail');

    if (!email) {
      showNotification('⚠️ Session expired. Please try again.');
      return;
    }

    const endpoint = isRegistration ? '/api/auth/verify-registration' : '/api/auth/verify-login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userRole', data.role);
        if (data.avatar) localStorage.setItem('avatar', data.avatar);

        localStorage.removeItem('pendingRegistrationEmail');
        localStorage.removeItem('pendingLoginEmail');

        verifyModal.classList.add("is-hidden");
        setupDesktopUserUI(data.name);
        showNotification(`✅ Welcome, ${data.name}`);
      } else {
        showNotification(data.message || '⚠️ Invalid or expired verification code.');
      }
    } catch (err) {
      showNotification('❌ Server error during verification');
    }
  });
}
