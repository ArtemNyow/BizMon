export function setupDesktopUserUI() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || localStorage.getItem("token");
  const name = params.get('name') || localStorage.getItem("userName");
  const avatar = params.get('avatar') || localStorage.getItem("userAvatar");
  const role = params.get('role') || localStorage.getItem("userRole");

if (params.get('token')) {
  localStorage.setItem("token", token);
  localStorage.setItem("userName", name);
  if (avatar) localStorage.setItem("userAvatar", avatar);
  if (role) localStorage.setItem("userRole", role); 
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
}


  const authButtons = document.getElementById("desktop-auth-buttons");
  const userInfo = document.getElementById("user-info");
  const userNameEl = document.getElementById("user-name");
  const userAvatar = document.getElementById("user-avatar");
  const userDropdown = document.getElementById("user-dropdown");
  const logoutBtn = document.getElementById("logout-btn");
  const dashboardBtn = document.getElementById("dashboard-btn");

  if (!token || !name) {
    authButtons?.classList.remove("is-hidden");
    userInfo?.classList.add("is-hidden");
    userDropdown?.classList.add("is-hidden");
  } else {
    authButtons?.classList.add("is-hidden");
    userInfo?.classList.remove("is-hidden");
    userNameEl.textContent = name;

    if (avatar?.startsWith("http")) {
      userAvatar.style.backgroundImage = `url(${avatar})`;
      userAvatar.style.backgroundSize = "cover";
      userAvatar.style.backgroundPosition = "center";
      userAvatar.textContent = "";
    } else {
      userAvatar.style.backgroundImage = "";
      userAvatar.textContent = name.charAt(0).toUpperCase();
      const colors = ['#02897a', '#ec5f67', '#f6c344', '#4a90e2', '#8e44ad'];
      const colorIndex = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
      userAvatar.style.backgroundColor = colors[colorIndex];
    }

    if (role === "admin") {
      dashboardBtn?.classList.remove("is-hidden");
    } else {
      dashboardBtn?.classList.add("is-hidden");
    }
  }

  if (!userInfo.dataset.bound) {
    userInfo.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = userDropdown.classList.contains("open");
      if (isOpen) {
        userDropdown.classList.remove("open");
        userDropdown.addEventListener("transitionend", () => {
          userDropdown.classList.add("is-hidden");
        }, { once: true });
      } else {
        userDropdown.classList.remove("is-hidden");
        requestAnimationFrame(() => {
          userDropdown.classList.add("open");
        });
      }
    });
    userInfo.dataset.bound = "true";
  }

  if (!document.body.dataset.dropdownListener) {
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#user-info") && !e.target.closest("#user-dropdown")) {
        if (userDropdown.classList.contains("open")) {
          userDropdown.classList.remove("open");
          userDropdown.addEventListener("transitionend", () => {
            userDropdown.classList.add("is-hidden");
          }, { once: true });
        }
      }
    });
    document.body.dataset.dropdownListener = "true";
  }

  logoutBtn?.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });

  dashboardBtn?.addEventListener("click", () => {
    window.location.href = "/admin/dashboard";
  });

  // 🎯 Обробка обох Google Sign-In кнопок
  const googleLoginBtn = document.getElementById("google-login-btn");
  const googleRegisterBtn = document.getElementById("google-register-btn");
  const redirectToGoogle = () => window.location.href = "/api/auth/google";

  googleLoginBtn?.addEventListener("click", redirectToGoogle);
  googleRegisterBtn?.addEventListener("click", redirectToGoogle);
}
