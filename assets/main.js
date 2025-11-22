const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
  });
}

const forms = document.querySelectorAll("form[data-validate]");
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.classList.add("was-validated");
    }
  });
});

const yearTarget = document.querySelector("#year");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const heroBrightness = document.querySelector("[data-hero-brightness]");
if (heroBrightness) {
  const darkStart = parseFloat(heroBrightness.dataset.darkStart || "0.8");
  const darkEnd = parseFloat(heroBrightness.dataset.darkEnd || "0.1");

  const updateBrightness = () => {
    const heroHeight = heroBrightness.offsetHeight || window.innerHeight;
    const scrollTop = window.scrollY;
    // Use a smaller threshold so brightness changes start immediately
    // This makes the change noticeable right away when scrolling begins
    const scrollThreshold = heroHeight * 0.3; // Complete brightness change over 30% of hero height
    const rawProgress = Math.min(Math.max(scrollTop / scrollThreshold, 0), 1);
    // Use ease-in (power < 1) for immediate, noticeable change at the start
    // Lower power = faster initial change (0.3 = very responsive)
    const easedProgress = Math.pow(rawProgress, 0.3);
    const darkness = darkStart + (darkEnd - darkStart) * easedProgress;
    heroBrightness.style.setProperty("--hero-darkness", darkness.toFixed(3));
  };

  window.addEventListener("scroll", updateBrightness, { passive: true });
  window.addEventListener("resize", updateBrightness);
  updateBrightness();
}
