
document.addEventListener('DOMContentLoaded', () => {
  const modals = {
    user: document.getElementById('modal-user'),
    subscriber: document.getElementById('modal-subscriber'),
    contact: document.getElementById('modal-contact')
  };

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const hash = btn.getAttribute('data-copy-hash');
      if (!hash) return;
      navigator.clipboard.writeText(hash)
        .then(() => {
          btn.textContent = '✅ Copied!';
          setTimeout(() => btn.textContent = '📋 Copy', 1500);
        })
        .catch(() => btn.textContent = '❌ Error');
    });
  });

  document.querySelectorAll(".create-button").forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const modalId = button.dataset.modal;
      const modal = document.getElementById(`modal-${modalId}`);
      if (modal) {
        modal.classList.remove("is-hidden");
        const form = modal.querySelector("form");
        if (form) form.reset();
      }
    });
  });

  document.querySelectorAll(".modal .cancel").forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (modal) {
        modal.classList.add("is-hidden");
      }
    });
  });

  document.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (
        !modal.classList.contains("is-hidden") &&
        !modal.querySelector(".modal-content").contains(e.target)
      ) {
        modal.classList.add("is-hidden");
      }
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const type = btn.dataset.type;
      const id = btn.dataset.id;
      if (!type || !id) return;

      if (confirm(`Delete this ${type}?`)) {
        const res = await fetch(`/api/${type}s/${id}`, { method: 'DELETE' });
        if (res.ok) {
          location.reload();
        } else {
          alert('Error deleting');
        }
      }
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const type = btn.dataset.type;
      const id = btn.dataset.id;
      const modal = modals[type];
      if (!type || !id || !modal) return;

      const res = await fetch(`/api/${type}s/${id}`);
      const data = await res.json();
      const form = modal.querySelector('form');

      modal.classList.remove('is-hidden');
      form.querySelector('input[name="id"]').value = data._id || '';

      if (type === 'user') {
        form['name'].value = data.name || '';
        form['email'].value = data.email || '';
        form['role'].value = data.role || 'user';
        form['password'].value = '';
      } else if (type === 'subscriber') {
        form['email'].value = data.email || '';
      } else if (type === 'contact') {
        form['name'].value = data.name || '';
        form['email'].value = data.email || '';
        form['message'].value = data.message || '';
      }
    });
  });

  const forms = {
    user: document.getElementById('userForm'),
    subscriber: document.getElementById('subscriberForm'),
    contact: document.getElementById('contactForm')
  };

  Object.entries(forms).forEach(([type, form]) => {
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = form.querySelector('input[name="id"]').value;
      let payload = {};

      if (type === 'user') {
        payload = {
          name: form['name'].value,
          email: form['email'].value,
          password: form['password'].value,
          role: form['role'].value,
        };
      } else if (type === 'subscriber') {
        payload = { email: form['email'].value };
      } else if (type === 'contact') {
        payload = {
          name: form['name'].value,
          email: form['email'].value,
          message: form['message'].value
        };
      }

      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/${type}s/${id}` : `/api/${type}s`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} ${id ? 'updated' : 'created'} successfully`);
        location.reload();
      } else {
        alert(`Error ${id ? 'updating' : 'creating'} ${type}`);
      }
    });
  });
});
