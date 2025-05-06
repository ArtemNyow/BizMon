import { showNotification } from './notification.js';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: form.querySelector('input[name="name"]').value.trim(),
      email: form.querySelector('input[name="email"]').value.trim(),
      message: form.querySelector('textarea[name="message"]').value.trim(),
    };

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showNotification('✅ Message sent successfully!');
        form.reset();
      } else {
        const data = await res.json();
        showNotification(data.message || '⚠️ Failed to send message. Please try again.');
      }
    } catch (err) {
      showNotification('❌ Server error. Please try again later.');
    }
  });
}
 