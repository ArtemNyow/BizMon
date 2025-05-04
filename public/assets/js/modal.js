export const modals = {
  init() {
    this.openButtons = document.querySelectorAll(".open-modal-btn");
    this.closeButtons = document.querySelectorAll(".close-btn");
    this.backdrops = document.querySelectorAll(".backdrop");
    this.loginForm = document.getElementById("login-form");
    this.registerForm = document.getElementById("register-form");
    this.loginModal = document.getElementById("login-backdrop");
    this.registerModal = document.getElementById("register-backdrop");

    this.setupEventListeners();
  },

  setupEventListeners() {
    this.openButtons.forEach(button => {
      button.addEventListener("click", () => this.handleOpenModal(button));
    });

    this.closeButtons.forEach(button => {
      button.addEventListener("click", () =>
        button.closest(".backdrop")?.classList.add("is-hidden"));
    });

    document.addEventListener("click", (e) => {
      if (e.target.id === "switch-to-register") {
        e.preventDefault();
        this.toggleModals(this.loginModal, this.registerModal, this.loginForm, this.registerForm);
      } else if (e.target.id === "switch-to-login") {
        e.preventDefault();
        this.toggleModals(this.registerModal, this.loginModal, this.registerForm, this.loginForm);
      }
    });
  },

  handleOpenModal(button) {
    const targetId = button.dataset.target;
    const type = button.dataset.type;
    const modal = document.getElementById(targetId);

    this.backdrops.forEach(b => b.classList.add("is-hidden"));

    if (modal) {
      modal.classList.remove("is-hidden");
      if (type === "login") {
        this.loginForm?.classList.remove("hidden");
        this.registerForm?.classList.add("hidden");
      } else {
        this.loginForm?.classList.add("hidden");
        this.registerForm?.classList.remove("hidden");
      }
      button.blur();
    }
  },

  toggleModals(hideModal, showModal, hideForm, showForm) {
    hideModal?.classList.add("is-hidden");
    showModal?.classList.remove("is-hidden");
    hideForm?.classList.add("hidden");
    showForm?.classList.remove("hidden");
  }
};
