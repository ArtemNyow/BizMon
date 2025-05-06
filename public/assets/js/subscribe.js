import { showNotification } from './notification.js';

export function initSubscriptionForms() {
  const forms = [
    document.getElementById("email-subscribe-footer"),
    document.getElementById("email-subscribe-main")
  ];

  forms.forEach(form => {
    if (!form) return;

    const emailInput = form.querySelector("input[name='email']");
    const submitButton = form.querySelector("button[type='submit']");

    if (!emailInput || !submitButton) return;

    // НЕ вимикаємо дефолтну валідацію
    // form.setAttribute("novalidate", "true"); <-- прибрано

    const handleSuccess = () => {
      emailInput.disabled = true;
      submitButton.disabled = true;
      submitButton.textContent = "Subscribed";
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      if (!email) return;

      try {
        const res = await fetch("/api/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (res.status === 201) {
          handleSuccess();
        } else {
          showNotification("📬 This email is already subscribed. Please wait for updates.");
  
        } 
      } catch (err) {
        showNotification('❌ Server error. Please try again later.');
      }
    });
  });
}
