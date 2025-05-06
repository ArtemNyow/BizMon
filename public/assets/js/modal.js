import { showNotification } from './notification.js';

export const modals = {
  init() {
    try {
      this.openButtons = document.querySelectorAll(".open-modal-btn");
      this.closeButtons = document.querySelectorAll(".close-btn");
      this.backdrops = document.querySelectorAll(".backdrop");
      this.loginForm = document.getElementById("login-form");
      this.registerForm = document.getElementById("register-form");
      this.loginModal = document.getElementById("login-backdrop");
      this.registerModal = document.getElementById("register-backdrop");

      this.setupEventListeners();
    } catch (err) {
      showNotification("❌ Error initializing modals: " + err.message);
    }
  },

  setupEventListeners() {
    try {
      this.openButtons.forEach(button => {
        button.addEventListener("click", () => this.handleOpenModal(button));
      });

      this.closeButtons.forEach(button => {
        button.addEventListener("click", () =>
          button.closest(".backdrop")?.classList.add("is-hidden"));
      });

      document.addEventListener("click", (e) => {
        try {
          if (e.target.id === "switch-to-register") {
            e.preventDefault();
            this.toggleModals(this.loginModal, this.registerModal, this.loginForm, this.registerForm);
          } else if (e.target.id === "switch-to-login") {
            e.preventDefault();
            this.toggleModals(this.registerModal, this.loginModal, this.registerForm, this.loginForm);
          }
        } catch (error) {
          showNotification("⚠️ Modal switching error: " + error.message);
        }
      });
    } catch (err) {
      showNotification("❌ Error setting up modal event listeners: " + err.message);
    }
  },

  handleOpenModal(button) {
    try {
      const targetId = button.dataset.target;
      const type = button.dataset.type;
      const modal = document.getElementById(targetId);

      this.backdrops.forEach(b => b.classList.add("is-hidden"));

      if (!modal) {
        showNotification("⚠️ Modal target not found");
        return;
      }

      modal.classList.remove("is-hidden");

      if (type === "login") {
        this.loginForm?.classList.remove("hidden");
        this.registerForm?.classList.add("hidden");
      } else {
        this.loginForm?.classList.add("hidden");
        this.registerForm?.classList.remove("hidden");
      }

      button.blur();
    } catch (err) {
      showNotification("❌ Error opening modal: " + err.message);
    }
  },

  toggleModals(hideModal, showModal, hideForm, showForm) {
    try {
      hideModal?.classList.add("is-hidden");
      showModal?.classList.remove("is-hidden");
      hideForm?.classList.add("hidden");
      showForm?.classList.remove("hidden");
    } catch (err) {
      showNotification("❌ Error toggling modals: " + err.message);
    }
  }
};
