document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-list-item");

  faqItems.forEach(item => {
    const container = item.querySelector(".faq-list-container");
    const icon = item.querySelector(".faq-icon use");

    container.addEventListener("click", () => {
      // Закриваємо всі інші
      faqItems.forEach(i => {
        if (i !== item) {
          i.classList.remove("active");
          i.querySelector(".faq-icon use").setAttribute("href", "./assets/icons.svg#icon-plus_circle");
        }
      });

      const isActive = item.classList.contains("active");
      item.classList.toggle("active");

      // Змінюємо іконку
      icon.setAttribute("href",
        isActive
          ? "./assets/icons.svg#icon-plus_circle"
          : "./assets/icons.svg#icon-minus_circle"
      );
    });
  });
});
