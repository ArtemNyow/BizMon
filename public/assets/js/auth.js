import { setupDesktopUserUI  } from './header.js';

export function setupAuthHandlers(modals) {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const registerModal = document.getElementById("register-backdrop");
  const loginModal = document.getElementById("login-backdrop");

  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        registerModal.classList.add("is-hidden");
        e.target.reset();
        localStorage.setItem('token', data.token);
          localStorage.setItem('userName', name);
       

        setupDesktopUserUI (name);
      } else {
        alert("⚠️ " + (data.message || 'Registration failed'));
      }
    } catch (err) {
      console.error('❌ Error registering user:', err);
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

      const data = await res.json();
      console.log(data);

      if (res.ok && data.token) {
        loginModal.classList.add("is-hidden");
        e.target.reset();
        localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.name); 
             localStorage.setItem('userRole', data.role); 
        setupDesktopUserUI (data.name);
      } else {
        alert("⚠️ " + (data.message || 'Login failed'));
      }
    } catch (err) {
      console.error('❌ Error logging in:', err);
    }
  });
}
