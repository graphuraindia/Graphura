// Stain Removal javascript//
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

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// Page Loader
window.addEventListener("load", () => {
  setTimeout(() => $("#page-loader").classList.add("hidden"), 1800);
  animateStats();
  startSlider();
});

// Mobile menu
document
  .getElementById("mobile-menu-button")
  ?.addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("hidden");
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

// Modal
// const bookingModal = document.getElementById("booking-modal");

// function openBookingModal(service = "") {
//   if (service) {
//     document.getElementById("booking-service").value = service;
//     document.getElementById("hidden-service").value = service;
//   }
//   bookingModal.classList.add("active");
//   document.body.style.overflow = "hidden";
// }

// function closeModal() {
//   bookingModal.classList.remove("active");
//   document.body.style.overflow = "auto";
// }

// document.getElementById("close-modal")?.addEventListener("click", closeModal);
// window.addEventListener("click", (e) => {
//   if (e.target === bookingModal) closeModal();
// });

// document
//   .getElementById("book-now-btn")
//   ?.addEventListener("click", () => openBookingModal());
// document.getElementById("mobile-book-now")?.addEventListener("click", () => {
//   openBookingModal();
//   document.getElementById("mobile-menu").classList.add("hidden");
// });

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

// Set min date
const today = new Date().toISOString().split("T")[0];
document.getElementById("booking-date")?.setAttribute("min", today);

console.log("🚀 Fresh & Clean Dry Cleaning Service Page Loaded!");

// ------------------ BOOKING MODAL LOGIC -----------------
// ------------------ BOOKING MODAL LOGIC -----------------

const bookingModal = document.getElementById("booking-modal");

// Open Modal
function openBookingModal(service = "") {
  if (service) {
    const serviceInput = document.getElementById("booking-service");
    if (serviceInput) serviceInput.value = service;
  }

  bookingModal?.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Close Modal
function closeModal() {
  bookingModal?.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close Button
document.getElementById("close-modal")?.addEventListener("click", closeModal);

// Close Modal on Background Click
window.addEventListener("click", (e) => {
  if (e.target === bookingModal) closeModal();
});

// Desktop Book Now Button
document
  .getElementById("book-now-btn")
  ?.addEventListener("click", () => openBookingModal());

// Mobile Book Now Button
document.getElementById("mobile-book-now")?.addEventListener("click", () => {
  openBookingModal();
  document.getElementById("mobile-menu")?.classList.add("hidden");
});

// ------------------ BOOKING FORM → GOOGLE SHEETS -----------------

document
  .getElementById("booking-form")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Booking...";

    const bookingData = {
      service: this.service.value,
      date: this.date.value,
      time: this.time.value,
      name: this.name.value.trim(),
      phone: this.phone.value.trim(),
      email: this.email.value.trim(),
      address: this.address.value.trim(),
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyFX4cWdM3eezflqqy0c7mNu3tzPgr0EmLDm8m3vbqvL7jrEqXeN_2MwIpU-3Pz0U8e/exec",
        {
          method: "POST",
          mode: "no-cors", // ⭐ REQUIRED for Google Sheets
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      alert("🎉 Your booking has been confirmed!");
      this.reset();
      closeModal();
    } catch (error) {
      alert("❌ Something went wrong while booking. Please try again.");
      console.error("Booking Error:", error);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Confirm Booking 🎉";
  });
