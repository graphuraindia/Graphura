// Service Page  javascript//
// Hero Slider
let currentSlideIndex = 0;
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const totalSlides = heroSlides.length;

function showSlide(n) {
  if (n >= totalSlides) currentSlideIndex = 0;
  if (n < 0) currentSlideIndex = totalSlides - 1;

  heroSlides.forEach((slide) => slide.classList.remove("active"));
  heroDots.forEach((dot) => dot.classList.remove("active"));

  heroSlides[currentSlideIndex].classList.add("active");
  heroDots[currentSlideIndex].classList.add("active");
}

function currentSlide(n) {
  currentSlideIndex = n;
  showSlide(currentSlideIndex);
}

function nextSlide() {
  currentSlideIndex++;
  showSlide(currentSlideIndex);
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Initialize slider
showSlide(currentSlideIndex);

// Mobile menu
document
  .getElementById("mobile-menu-button")
  ?.addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  });
// Stats Counter
function animateStats() {
  $$(".stat-number").forEach((stat) => {
    const target = parseFloat(stat.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target % 1 === 0 ? target : target.toFixed(1);
        clearInterval(timer);
      } else {
        stat.textContent =
          current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
      }
    }, 20);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute("data-target"));
    const isDecimal = target % 1 !== 0;
    let count = 0;
    const duration = 5000; // total time in ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      count = target * progress;

      el.textContent = isDecimal
        ? count.toFixed(1)
        : Math.floor(count).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = isDecimal
          ? target.toFixed(1)
          : target.toLocaleString() + "+";
      }
    };

    requestAnimationFrame(updateCount);
  };

  // Animate when visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));
});

// Scroll to top
const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});
scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Modal functionality
const bookingModal = document.getElementById("booking-modal");

function openBookingModal(service = "") {
  if (service) {
    document.getElementById("booking-service").value = service;
    document.getElementById("hidden-service").value = service;
  }
  bookingModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  bookingModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Modal close button
document.getElementById("close-modal")?.addEventListener("click", closeModal);

// Click outside modal to close
window.addEventListener("click", (e) => {
  if (e.target === bookingModal) closeModal();
});

// Header Book Now button
document
  .getElementById("book-now-btn")
  ?.addEventListener("click", () => openBookingModal());

// Mobile Book Now button
document.getElementById("mobile-book-now")?.addEventListener("click", () => {
  openBookingModal();
  document.getElementById("mobile-menu").classList.add("hidden");
});

// Scroll to Services
document
  .getElementById("scroll-services-btn")
  ?.addEventListener("click", () => {
    document
      .getElementById("services-section")
      .scrollIntoView({ behavior: "smooth" });
  });

// Set minimum date (today)
const today = new Date().toISOString().split("T")[0];
document.getElementById("booking-date")?.setAttribute("min", today);

console.log("🚀 Fresh & Clean Services Page - Complete with Hero Slider!");
