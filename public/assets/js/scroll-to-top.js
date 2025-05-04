export function initScrollToTop() {
  const scrollBtn = document.getElementById("scrollToTopBtn");

  if (!scrollBtn) return; // додатковий захист

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
