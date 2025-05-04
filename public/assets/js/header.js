export function setupDesktopUserUI() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");

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
    return;
  }

  // Виводимо імʼя та аватар
  authButtons?.classList.add("is-hidden");
  userInfo?.classList.remove("is-hidden");

  userNameEl.textContent = name;
  userAvatar.textContent = name.charAt(0).toUpperCase();

  const colors = ['#02897a', '#ec5f67', '#f6c344', '#4a90e2', '#8e44ad'];
  const colorIndex = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  userAvatar.style.backgroundColor = colors[colorIndex];

  if (role === "admin") {
    dashboardBtn?.classList.remove("is-hidden");
  } else {
    dashboardBtn?.classList.add("is-hidden");
  }

  // --- Обробники (один раз)
  if (!userAvatar.dataset.bound) {
    userAvatar.addEventListener("click", (e) => {
      e.stopPropagation();
      userDropdown?.classList.toggle("is-hidden");
    });
    userAvatar.dataset.bound = true;
  }

  if (!document.body.dataset.dropdownListener) {
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#user-info")) {
        userDropdown?.classList.add("is-hidden");
      }
    });
    document.body.dataset.dropdownListener = true;
  }

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    location.reload();
  });

  dashboardBtn?.addEventListener("click", () => {
    window.location.href = "/admin/dashboard";
  });
}
