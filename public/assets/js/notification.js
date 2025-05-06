export function showNotification(message, duration = 4000) {
  const toast = document.getElementById('notification-toast');
  const messageEl = document.getElementById('notification-message');
  const closeBtn = document.getElementById('notification-close-btn');

  messageEl.textContent = message;
  toast.classList.remove('is-hidden');

  const hide = () => toast.classList.add('is-hidden');
  closeBtn.onclick = hide;

  setTimeout(() => {
    if (!toast.classList.contains('is-hidden')) {
      hide();
    }
  }, duration);
}
