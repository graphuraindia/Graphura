// =============================================
// FRESH & CLEAN – CONTACT PAGE JAVASCRIPT
// =============================================

// ------------------ HERO SLIDER -----------------
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

setInterval(nextSlide, 5000);
showSlide(currentSlideIndex);

// ------------------ MOBILE MENU -----------------
document.getElementById("mobile-menu-button")?.addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

// ------------------ SCROLL TOP -----------------
const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  scrollTopBtn?.classList.toggle("show", window.scrollY > 500);
});

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

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

// ------------------ CONTACT FORM → GOOGLE SHEETS -----------------
document
  .getElementById("contact-form")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = {
      name: this.name.value.trim(),
      email: this.email.value.trim(),
      phone: this.phone.value.trim(),
      subject: this.inquiry_subject.value,
      message: this.message.value.trim(),
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyFX4cWdM3eezflqqy0c7mNu3tzPgr0EmLDm8m3vbqvL7jrEqXeN_2MwIpU-3Pz0U8e/exec",
        {
          method: "POST",
          mode: "no-cors", // ⭐ IMPORTANT FIX
          headers: {
            "Content-Type": "application/json", // ⭐ MUST be here
          },
          body: JSON.stringify(formData),
        }
      );

      // Success popup
      alert("Your message has been submitted successfully! 🎉");
      this.reset();
    } catch (error) {
      alert("❌ Something went wrong while submitting. Please try again.");
      console.error("Form Error:", error);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message 📤";
  });

// ------------------ STATS COUNTER -----------------
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute("data-target"));
    const duration = 5000;
    const isDecimal = target % 1 !== 0;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      let value = target * progress;

      el.textContent = isDecimal
        ? value.toFixed(1)
        : Math.floor(value).toLocaleString();

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

// ------------------ MIN DATE FOR BOOKING -----------------
const today = new Date().toISOString().split("T")[0];
document.getElementById("booking-date")?.setAttribute("min", today);

console.log("🚀 Fresh & Clean Contact Page Fully Loaded!");
