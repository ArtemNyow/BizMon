import { setupDesktopUserUI } from './header.js';


export function setupAuthHandlers(modals) {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const registerModal = document.getElementById("register-backdrop");
  const loginModal = document.getElementById("login-backdrop");

  const passwordToggles = [
    {
      inputId: "register-password",
      buttonId: "toggle-register-password",
    },
    {
      inputId: "login-password",
      buttonId: "toggle-login-password",
    }
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
        iconUse.setAttribute(
          "href",
          isHidden ? "/assets/icons.svg#icon-eye" : "/assets/icons.svg#icon-eye-off"
        );
      }
    });
  });

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

         setTimeout(() => {
    setupDesktopUserUI(data.name);
  }, 0);
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
       setTimeout(() => {
    setupDesktopUserUI(data.name);
  }, 0);
      } else {
        alert("⚠️ " + (data.message || 'Login failed'));
      }
    } catch (err) {
      console.error('❌ Error logging in:', err);
    }
  });
}
