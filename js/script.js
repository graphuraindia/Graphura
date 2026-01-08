document.addEventListener("DOMContentLoaded", function () {

  /* ======================================================
     PORTFOLIO FUNCTIONALITY (FIXED & OPTIMIZED)
  ====================================================== */

  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const viewMoreBtn = document.querySelector('.view-more-btn');
  const enlargeButtons = document.querySelectorAll('.enlarge-btn');

  const modal = document.querySelector('.image-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalImage = document.querySelector('.modal-image');
  const modalTitle = document.querySelector('.modal-title');
  const modalDesc = document.querySelector('.modal-desc');

  let visibleItems = 6;
  let currentFilter = 'all';

  // Reset scroll on reload
  window.scrollTo(0, 0);

  // Activate All Projects by default
  filterButtons.forEach(btn => btn.classList.remove('active'));
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.classList.add('active');

  applyFilter();

  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      currentFilter = button.dataset.filter;
      visibleItems = 6;
      applyFilter();
    });
  });

  // View More button
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      visibleItems += 6;
      applyFilter();
    });
  }

  function applyFilter() {
    const filteredItems = Array.from(portfolioItems).filter(item => {
      return currentFilter === 'all' || item.dataset.category === currentFilter;
    });

    // Hide all items first
    portfolioItems.forEach(item => {
      item.style.display = 'none';
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });

    // Show limited items
    filteredItems.slice(0, visibleItems).forEach((item, index) => {
      item.style.display = 'block';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      }, index * 80);
    });

    // Toggle View More
    if (viewMoreBtn) {
      viewMoreBtn.style.display =
        visibleItems < filteredItems.length ? 'inline-block' : 'none';
    }
  }

  /* ---------------- IMAGE MODAL ---------------- */

  if (enlargeButtons.length && modal) {
    enlargeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.portfolio-card');
        modalImage.src = card.querySelector('img').src;
        modalTitle.textContent = card.querySelector('.card-title')?.textContent || '';
        modalDesc.textContent = card.querySelector('.card-desc')?.textContent || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => e.target === modal && closeModal());
  document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());

});

  /* ------------------------ Hero Section Animations ------------------------ */

  // Counter Animation for Hero Stats
  const statNumbers = document.querySelectorAll(".hero-stats .stat-number");
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute("data-target"));
          const suffix = target.getAttribute("data-suffix") || "";
          let currentValue = 0;
          const increment = finalValue / 50;

          const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
              currentValue = finalValue;
              clearInterval(counter);
            }
            target.textContent = Math.floor(currentValue) + suffix;
          }, 30);

          statsObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => statsObserver.observe(stat));
  // ////////////////////////////////////////////
  // image slider script for who we are section
  const slider = document.querySelector(".slider");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const slides = document.querySelectorAll(".slider img");

  let index = 0;
  const totalSlides = slides.length;

  function showSlide(i) {
    slider.style.transform = `translateX(-${i * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % totalSlides;
    showSlide(index);
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide(index);
  });
  // Typing Effect for Hero Subtitle
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    const phrases = [
      "SEO Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "Brand Development",
      "Digital Advertising",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = 100;

      if (isDeleting) {
        typeSpeed /= 2;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before next phrase
      }

      setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 2000);
  }

  // Floating Elements Parallax Effect
  const floatingIcons = document.querySelectorAll(".floating-icon");
  window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingIcons.forEach((icon) => {
      const speed = parseFloat(icon.getAttribute("data-speed")) || 1;
      const x = (mouseX - 0.5) * speed * 20;
      const y = (mouseY - 0.5) * speed * 20;

      icon.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Floating Cards Interaction (if any floating cards present)
  const floatingCards = document.querySelectorAll(".floating-card");
  floatingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-25px) scale(1.1)";
      this.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  // Hero Image Hover Effect
  const heroImage = document.querySelector(".hero-image img");
  if (heroImage) {
    heroImage.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-30px) rotate(5deg) scale(1.05)";
      this.style.boxShadow = "0 30px 80px rgba(0, 0, 0, 0.4)";
    });

    heroImage.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  }

  // Scroll Indicator Click (if any scroll indicator)
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const servicesSection = document.querySelector(".services-preview");
      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Particle Animation Enhancement for particles
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle) => {
    particle.addEventListener("mouseenter", function () {
      this.style.background = "#FFD700";
      this.style.boxShadow = "0 0 20px #FFD700";
      this.style.transform = "scale(2)";
    });

    particle.addEventListener("mouseleave", function () {
      this.style.background = "";
      this.style.boxShadow = "";
      this.style.transform = "";
    });
  });

  /* ------------------------ Mobile Menu Toggle ------------------------ */



 document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.querySelector(".navbar-toggle");
  const menu = document.querySelector(".navbar-nav");
  const cont = document.querySelector(".navbar .container");
  const dropdownToggles = document.querySelectorAll(".nav-dropdown > .dropdown-toggle");
  const overlay = document.querySelector(".mobile-overlay");
  const serviceToggle = document.querySelector(".nav-mega .dropdown-toggle");
  const megaMenu = document.querySelector(".mega-menu");

  let isOpen = false;

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menu.classList.remove("active");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    cont.style.flexWrap = "nowrap";

    // Close Service Mega Menu
    if (megaMenu) megaMenu.classList.remove("active");

    // Close all dropdown menus
    dropdownToggles.forEach((btn) => {
      const dropdownMenu = btn.nextElementSibling;
      if (dropdownMenu) dropdownMenu.classList.remove("active");
      btn.setAttribute("aria-expanded", "false");
    });

    isOpen = false;
  };

  // Mobile menu toggle
  toggle.addEventListener("click", () => {
    isOpen = !isOpen;

    document.body.classList.toggle("menu-open", isOpen);
    menu.classList.toggle("active", isOpen);
    toggle.classList.toggle("active", isOpen);
    cont.style.flexWrap = isOpen ? "wrap" : "nowrap";

    toggle.setAttribute("aria-expanded", isOpen.toString());

    // 🔥 CLOSE SERVICE DROPDOWN when hamburger is clicked
    if (megaMenu) megaMenu.classList.remove("active");

    // 🔥 CLOSE ALL DROPDOWNS when hamburger is clicked
    dropdownToggles.forEach((btn) => {
      const dropdownMenu = btn.nextElementSibling;
      if (dropdownMenu) dropdownMenu.classList.remove("active");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  // SERVICE mega menu toggle (mobile)
  if (serviceToggle && megaMenu) {
    serviceToggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        megaMenu.classList.toggle("active");
      }
    });
  }

  // Dropdown toggle inside mobile menu
  dropdownToggles.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const dropdownMenu = btn.nextElementSibling;
        dropdownMenu.classList.toggle("active");

        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", (!expanded).toString());
      }
    });
  });

  // Close menu on desktop resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  // Overlay click closes everything
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

});



  /* ------------------------ Testimonial Slider ------------------------ */

  let currentTestimonialIndex = 0;
  let testimonialInterval;
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");

  // Function to show specific testimonial
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) =>
      testimonial.classList.remove("active")
    );
    dots.forEach((dot) => dot.classList.remove("active"));

    // Update current index
    currentTestimonialIndex = index;

    // Show selected testimonial
    testimonials[index].classList.add("active");
    dots[index].classList.add("active");

    // Reset the auto-advance timer
    resetTestimonialInterval();
  }

  // Function to change testimonial (next/previous)
  function changeTestimonial(direction) {
    let newIndex = currentTestimonialIndex + direction;

    // Handle wrap-around
    if (newIndex < 0) {
      newIndex = testimonials.length - 1;
    } else if (newIndex >= testimonials.length) {
      newIndex = 0;
    }

    showTestimonial(newIndex);
  }

  // Function to auto-advance testimonials
  function autoAdvanceTestimonials() {
    changeTestimonial(1);
  }

  // Function to reset the auto-advance interval
  function resetTestimonialInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(autoAdvanceTestimonials, 5000); // Change every 5 seconds
  }

  // Initialize the testimonial slider
  if (testimonials.length > 0) {
    // Start auto-advancing
    resetTestimonialInterval();

    // Pause auto-advancement when user interacts with controls
    const controls = document.querySelectorAll(".prev, .next, .dot");
    controls.forEach((control) => {
      control.addEventListener("click", function () {
        resetTestimonialInterval();
      });
    });

    // Pause auto-advancement when hovering over testimonial
    const testimonialContainer = document.querySelector(".testimonial-slider");
    if (testimonialContainer) {
      testimonialContainer.addEventListener("mouseenter", function () {
        clearInterval(testimonialInterval);
      });

      // Resume auto-advancement when mouse leaves testimonial
      testimonialContainer.addEventListener("mouseleave", function () {
        resetTestimonialInterval();
      });
    }
  }

  /* ------------------------ FAQ Accordion Functionality ------------------------ */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.setAttribute("aria-expanded", "false");
    answer.setAttribute("hidden", "");

    question.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      // Toggle current
      this.setAttribute("aria-expanded", String(!isExpanded));
      if (isExpanded) {
        answer.setAttribute("hidden", "");
        item.classList.remove("active");
      } else {
        answer.removeAttribute("hidden");
        item.classList.add("active");
      }

      // Close others
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherQuestion = otherItem.querySelector(".faq-question");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          if (otherQuestion && otherAnswer) {
            otherQuestion.setAttribute("aria-expanded", "false");
            otherAnswer.setAttribute("hidden", "");
            otherItem.classList.remove("active");
          }
        }
      });
    });
  });

  /* ------------------------ Smooth Scroll for Anchor Links ------------------------ */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  /* ------------------------ Contact Form Submission ------------------------ */

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = contactForm.querySelector("#name").value.trim();
      const email = contactForm.querySelector("#email").value.trim();
      const message = contactForm.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill out all required fields.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // TODO: here you would implement AJAX or other submission logic
      alert(
        `Thank you, ${name}! Your message has been received. We'll contact you soon at ${email}.`
      );

      contactForm.reset();
    });
  }

  // Helper function to validate email format
  function validateEmail(email) {
    // Simple regex for basic validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  /* ------------------------ Live Chat Button ------------------------ */

  const chatBtn = document.querySelector(".chat-btn");
  if (chatBtn) {
    chatBtn.addEventListener("click", () => {
      alert(
        "Our customer support team will be with you shortly. Thank you for your patience!"
      );
    });
  }

  /* ------------------------ Scroll-triggered Animation on Elements ------------------------ */

  const animatedElements = document.querySelectorAll(
    ".package-card, .benefit-item, .stat-item, .faq-item, .service-card, .process-step, .testimonial, .portfolio-item"
  );

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          animationObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    animationObserver.observe(el);
  });

/* ------------------------ Privacy Policy Scroll ------------------------ */

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".policy-sidebar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (scrollY >= top) current = sec.getAttribute("id");
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});