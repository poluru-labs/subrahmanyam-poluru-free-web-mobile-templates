// Liberty Air — interactions: navbar shadow, from/to swap, back-to-top
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("laNavbar");
  const backToTop = document.getElementById("laBackToTop");

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 10;
    navbar?.classList.toggle("la-scrolled", scrolled);
    backToTop?.classList.toggle("show", window.scrollY > 400);
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll(".la-swap-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const form = btn.closest("form");
      const [from, to] = form.querySelectorAll('input[type="text"]');
      if (from && to) {
        [from.value, to.value] = [to.value, from.value];
      }
    });
  });
});
