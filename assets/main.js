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

// Popup functionality
const popup = document.querySelector("[data-popup]");
const popupClose = document.querySelector("[data-popup-close]");
const popupForm = document.querySelector(".popup-form");

if (popup && popupClose) {
  // Show popup after 3 seconds on page load
  setTimeout(() => {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  }, 3000);

  // Close popup
  const closePopup = () => {
    popup.classList.remove("active");
    document.body.style.overflow = "";
  };

  popupClose.addEventListener("click", closePopup);

  // Close on overlay click
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("active")) {
      closePopup();
    }
  });

  // Handle form submission
  if (popupForm) {
    popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = popupForm.querySelector('input[type="email"]').value;
      if (email) {
        // Here you would typically send the email to your backend
        console.log("Email submitted:", email);
        alert("Thank you! We'll send your free samples and quotes shortly.");
        closePopup();
      }
    });
  }
}
