export const mobileMenu = {
  init() {
    this.menuToggle = document.querySelector(".menu-link");
    this.drawer = document.getElementById("mobile-drawer");
    this.drawerMenu = this.drawer?.querySelector(".mobile-menu");
    this.drawerClose = document.getElementById("close-mobile-menu");

    // Користувацькі елементи
    this.authButtons = document.getElementById("mobile-auth-buttons");
    this.userInfo = document.getElementById("mobile-user-info");
    this.userName = document.getElementById("mobile-user-name");
    this.userAvatar = document.getElementById("mobile-user-avatar");
    this.userDropdown = document.getElementById("mobile-user-dropdown");
    this.logoutBtn = document.getElementById("mobile-logout-btn");
    this.dashboardBtn = document.getElementById("mobile-dashboard-btn");

    if (this.menuToggle && this.drawer && this.drawerMenu && this.drawerClose) {
      this.setupEventListeners();
      this.renderUserInfo();
    } else {
      console.warn("📦 Mobile menu: elements not found.");
    }
  },

  setupEventListeners() {
    this.menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      this.openDrawer();
    });

    this.drawerClose.addEventListener("click", () => this.closeDrawer());

    this.drawer.addEventListener("click", (e) => {
      if (e.target === this.drawer) this.closeDrawer();
    });

    this.drawer.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("click", () => this.closeDrawer());
    });

    // Клік по аватару — відкриття меню
    this.userAvatar?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.userDropdown.classList.toggle("is-hidden");
    });

    // Закриття меню по кліку поза ним
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#mobile-user-info")) {
        this.userDropdown.classList.add("is-hidden");
      }
    });

   // Вихід
this.logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");

  this.userInfo?.classList.add("is-hidden");

    // this.authButtons?.classList.remove("is-hidden");
    
  this.userDropdown?.classList.add("is-hidden");

  this.closeDrawer();
});

  },

  renderUserInfo() {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");

    if (!token || !name) {
      this.authButtons?.classList.remove("is-hidden");
      this.userInfo?.classList.add("is-hidden");
      return;
    }

    this.authButtons?.classList.add("is-hidden");
    this.userInfo?.classList.remove("is-hidden");

    this.userName.textContent = name;
    this.userAvatar.textContent = name.charAt(0).toUpperCase();

    const colors = ['#02897a', '#ec5f67', '#f6c344', '#4a90e2', '#8e44ad'];
    const colorIndex = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
    this.userAvatar.style.backgroundColor = colors[colorIndex];

    if (role === "admin") {
      this.dashboardBtn?.classList.remove("is-hidden");
    } else {
      this.dashboardBtn?.classList.add("is-hidden");
    }
  },

  openDrawer() {
    this.drawer.classList.remove("is-hidden");
    this.drawerMenu.classList.remove("is-closing");
    this.drawerMenu.classList.add("slide-in");

    // 👇 Додатково оновлюємо user info при відкритті
    this.renderUserInfo();
  },

  closeDrawer() {
    this.drawerMenu.classList.remove("slide-in");
    this.drawerMenu.classList.add("is-closing");

    setTimeout(() => {
      this.drawer.classList.add("is-hidden");
      this.drawerMenu.classList.remove("is-closing");
    }, 300);
  }
};
