
export function initSubscriptionForms() {
  const forms = [
    document.getElementById("email-subscribe-footer"),
    document.getElementById("email-subscribe-main")
  ];

  forms.forEach(form => {
    if (!form) return; // Перевірка на наявність форми

    const emailInput = form.querySelector("input[name='email']");
    if (!emailInput) {
      console.warn("Email input not found in form", form);
      return;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!email) {
        alert("Please enter a valid email");
        return;
      }

      try {
        const res = await fetch("/api/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });

        if (res.ok) {
          alert("✅ Subscribed successfully!");
          form.reset();
        } else {
          const { error } = await res.json();
          alert("❌ Error: " + (error || "Unable to subscribe"));
        }
      } catch (err) {
        console.error(err);
        alert("❌ Network error");
      }
    });
  });
}
