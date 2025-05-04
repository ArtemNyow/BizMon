// document.addEventListener("DOMContentLoaded", () => {
//   // Modal functionality
//   const modals = {
//     init() {
//       this.openButtons = document.querySelectorAll(".open-modal-btn");
//       this.closeButtons = document.querySelectorAll(".close-btn");
//       this.backdrops = document.querySelectorAll(".backdrop");
//       this.loginForm = document.getElementById("login-form");
//       this.registerForm = document.getElementById("register-form");
//       this.loginModal = document.getElementById("login-backdrop");
//       this.registerModal = document.getElementById("register-backdrop");

//       this.setupEventListeners();
//     },

//     setupEventListeners() {
//       this.openButtons.forEach(button => {
//         button.addEventListener("click", () => this.handleOpenModal(button));
//       });

//       this.closeButtons.forEach(button => {
//         button.addEventListener("click", () =>
//           button.closest(".backdrop")?.classList.add("is-hidden"));
//       });


//       document.addEventListener("click", (e) => {
//         if (e.target.id === "switch-to-register") {
//           e.preventDefault();
//           this.toggleModals(this.loginModal, this.registerModal, this.loginForm, this.registerForm);
//         } else if (e.target.id === "switch-to-login") {
//           e.preventDefault();
//           this.toggleModals(this.registerModal, this.loginModal, this.registerForm, this.loginForm);
//         }
//       });

//       // 👇 Обробник для реєстрації
//       this.registerForm?.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const name = e.target.name.value.trim();
//         const email = e.target.email.value.trim();
//         const password = e.target.password.value;

//         try {
//           const res = await fetch('/api/auth/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, email, password })
//           });

//           const data = await res.json();
//           console.log(data); // 🎯 Виводимо відповідь сервера

//           if (res.ok) {
//             alert("✅ Registration successful");
//             this.registerModal.classList.add("is-hidden");
//             e.target.reset(); 
//             localStorage.setItem('token', res.token);
// localStorage.setItem('userName', name); // якщо у відповіді є name

// showUserHeader(name);

//           } else {
//             alert("⚠️ " + (data.message || 'Registration failed'));
//           }
//         } catch (err) {
//           console.error('❌ Error registering user:', err);
//         }
//       });
//       // 👇 Обробник для логіну
// this.loginForm?.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = e.target.email.value.trim();
//   const password = e.target.password.value;

//   try {
//     const res = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();
//     console.log(data); // 🎯 Виводимо токен або помилку

//     if (res.ok && data.token) {
//       alert("✅ Login successful");
//       this.loginModal.classList.add("is-hidden");
//       e.target.reset();
//       // localStorage.setItem('token', data.token); // якщо хочеш зберігати токен
//       localStorage.setItem('token', res.token);
// localStorage.setItem('userName', name); // якщо у відповіді є name

// showUserHeader(name);

//     } else {
//       alert("⚠️ " + (data.message || 'Login failed'));
//     }
//   } catch (err) {
//     console.error('❌ Error logging in:', err);
//   }
// });

//     },

    
//     handleOpenModal(button) {
//       const targetId = button.dataset.target;
//       const type = button.dataset.type;
//       const modal = document.getElementById(targetId);

//       this.backdrops.forEach(b => b.classList.add("is-hidden"));

//       if (modal) {
//         modal.classList.remove("is-hidden");
//         if (type === "login") {
//           this.loginForm?.classList.remove("hidden");
//           this.registerForm?.classList.add("hidden");
//         } else {
//           this.loginForm?.classList.add("hidden");
//           this.registerForm?.classList.remove("hidden");
//         }
//         button.blur();
//       }
//     },

//     toggleModals(hideModal, showModal, hideForm, showForm) {
//       hideModal?.classList.add("is-hidden");
//       showModal?.classList.remove("is-hidden");
//       hideForm?.classList.add("hidden");
//       showForm?.classList.remove("hidden");
//     }
//   };

//   // Mobile menu functionality
//   const mobileMenu = {
//     init() {
//       this.menuToggle = document.querySelector(".menu-link");
//       this.drawer = document.getElementById("mobile-drawer");
//       this.drawerMenu = this.drawer?.querySelector(".mobile-menu");
//       this.drawerClose = document.getElementById("close-mobile-menu");

//       if (this.drawer) this.setupEventListeners();
//     },

//     setupEventListeners() {
//       this.menuToggle?.addEventListener("click", (e) => {
//         e.preventDefault();
//         this.openDrawer();
//       });

//       this.drawerClose?.addEventListener("click", () => this.closeDrawer());

//       this.drawer?.addEventListener("click", (e) => {
//         if (e.target === this.drawer) this.closeDrawer();
//       });

//       this.drawer?.querySelectorAll("a, button").forEach(el => {
//         el.addEventListener("click", () => this.closeDrawer());
//       });
//     },

//     openDrawer() {
//       this.drawer.classList.remove("is-hidden");
//       this.drawerMenu.classList.remove("is-closing");
//       this.drawerMenu.classList.add("slide-in");
//     },

//     closeDrawer() {
//       this.drawerMenu.classList.add("is-closing");
//       setTimeout(() => {
//         this.drawer.classList.add("is-hidden");
//         this.drawerMenu.classList.remove("is-closing");
//       }, 300);
//     }
//   };

//   // Initialize
//   modals.init();
//   mobileMenu.init();
// });function showUserHeader(name) {
//   const userInfo = document.getElementById("user-info");
//   const userName = document.getElementById("user-name");
//   const userAvatar = document.getElementById("user-avatar");

//   userName.textContent = name;

//   const colors = ['#02897a', '#ec5f67', '#f6c344', '#4a90e2', '#8e44ad'];
//   const bgColor = colors[Math.floor(Math.random() * colors.length)];
//   userAvatar.style.backgroundColor = bgColor;

//   userAvatar.textContent = name.charAt(0).toUpperCase();

//   userInfo.classList.remove("is-hidden");
//   document.querySelectorAll(".open-modal-btn").forEach(btn => btn.classList.add("is-hidden"));
// }

