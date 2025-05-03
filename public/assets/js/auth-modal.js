document.addEventListener("DOMContentLoaded", () => {
  // Modal functionality
  const modals = {
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

      this.backdrops.forEach(backdrop => {
        backdrop.addEventListener("click", (e) => {
          if (e.target === backdrop) backdrop.classList.add("is-hidden");
        });
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

  // Mobile menu functionality
  const mobileMenu = {
    init() {
      this.menuToggle = document.querySelector(".menu-link");
      this.drawer = document.getElementById("mobile-drawer");
      this.drawerMenu = this.drawer?.querySelector(".mobile-menu");
      this.drawerClose = document.getElementById("close-mobile-menu");
      
      if (this.drawer) this.setupEventListeners();
    },
    
    setupEventListeners() {
      this.menuToggle?.addEventListener("click", (e) => {
        e.preventDefault();
        this.openDrawer();
      });

      this.drawerClose?.addEventListener("click", () => this.closeDrawer());
      
      this.drawer?.addEventListener("click", (e) => {
        if (e.target === this.drawer) this.closeDrawer();
      });

      this.drawer?.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("click", () => this.closeDrawer());
      });
    },
    
    openDrawer() {
      this.drawer.classList.remove("is-hidden");
      this.drawerMenu.classList.remove("is-closing");
      this.drawerMenu.classList.add("slide-in");
    },
    
    closeDrawer() {
      this.drawerMenu.classList.add("is-closing");
      setTimeout(() => {
        this.drawer.classList.add("is-hidden");
        this.drawerMenu.classList.remove("is-closing");
      }, 300);
    }
  };

  // Initialize both functionalities
  modals.init();
  mobileMenu.init();
});