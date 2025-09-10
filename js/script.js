document.addEventListener('DOMContentLoaded', function () {
    /* ------------------------ Hero Section Animations ------------------------ */

    // Counter Animation for Hero Stats
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-target'));
                    let currentValue = 0;
                    const increment = finalValue / 50;

                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            currentValue = finalValue;
                            clearInterval(counter);
                        }
                        target.textContent = Math.floor(currentValue);
                    }, 30);

                    statsObserver.unobserve(target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach((stat) => statsObserver.observe(stat));

    // Typing Effect for Hero Subtitle
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const phrases = [
            'SEO Optimization',
            'Social Media Marketing',
            'Content Strategy',
            'Brand Development',
            'Digital Advertising',
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
    const floatingIcons = document.querySelectorAll('.floating-icon');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        floatingIcons.forEach((icon) => {
            const speed = parseFloat(icon.getAttribute('data-speed')) || 1;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;

            icon.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Floating Cards Interaction (if any floating cards present)
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card) => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-25px) scale(1.1)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Hero Image Hover Effect
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-30px) rotate(5deg) scale(1.05)';
            this.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.4)';
        });

        heroImage.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    }

    // Scroll Indicator Click (if any scroll indicator)
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function () {
            const servicesSection = document.querySelector('.services-preview');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    }

    // Particle Animation Enhancement for particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle) => {
        particle.addEventListener('mouseenter', function () {
            this.style.background = '#FFD700';
            this.style.boxShadow = '0 0 20px #FFD700';
            this.style.transform = 'scale(2)';
        });

        particle.addEventListener('mouseleave', function () {
            this.style.background = '';
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });

    /* ------------------------ Mobile Menu Toggle ------------------------ */

    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            navbarMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a menu link (if mobile menu active)
    const mobileLinks = navbarMenu ? navbarMenu.querySelectorAll('a') : [];
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                if (navbarToggle) navbarToggle.setAttribute('aria-expanded', false);
                // Also close open dropdown menus, if any
                closeAllDropdownMenus();
            }
        });
    });

    // Navbar scroll effect: add "scrolled" class on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* -------------------- Smooth Dropdown for "Services" Menu -------------------- */

    const dropdownToggles = document.querySelectorAll('.nav-dropdown > .dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        // Allow keyboard accessibility too
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown(toggle);
            }
        });

        // Toggle dropdown on click
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDropdown(toggle);
        });

        // Optional: show dropdown on hover (desktop)
        toggle.parentElement.addEventListener('mouseenter', () => {
            if (window.innerWidth > 992) {
                openDropdown(toggle);
            }
        });
        toggle.parentElement.addEventListener('mouseleave', () => {
            if (window.innerWidth > 992) {
                closeDropdown(toggle);
            }
        });
    });

    function toggleDropdown(toggle) {
        const dropdownMenu = toggle.nextElementSibling;
        const expanded = toggle.getAttribute('aria-expanded') === 'true';

        if (expanded) {
            closeDropdown(toggle);
        } else {
            // Close other open dropdowns
            closeAllDropdownMenus();
            openDropdown(toggle);
        }
    }

    function openDropdown(toggle) {
        const dropdownMenu = toggle.nextElementSibling;
        if (!dropdownMenu) return;
        dropdownMenu.style.display = 'block';
        dropdownMenu.style.opacity = 0;
        dropdownMenu.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            dropdownMenu.style.opacity = 1;
        }, 10);

        toggle.setAttribute('aria-expanded', 'true');
        toggle.querySelector('i').style.transform = 'rotate(180deg)';
    }

    function closeDropdown(toggle) {
        const dropdownMenu = toggle.nextElementSibling;
        if (!dropdownMenu) return;
        dropdownMenu.style.opacity = 0;
        dropdownMenu.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            dropdownMenu.style.display = 'none';
        }, 300);

        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('i').style.transform = '';
    }

    function closeAllDropdownMenus() {
        dropdownToggles.forEach(toggle => {
            closeDropdown(toggle);
        });
    }

    // Close dropdowns if click occurs outside of them
    document.addEventListener('click', (e) => {
        let clickedInsideDropdown = false;
        dropdownToggles.forEach(toggle => {
            if (toggle.contains(e.target) || (toggle.nextElementSibling && toggle.nextElementSibling.contains(e.target))) {
                clickedInsideDropdown = true;
            }
        });

        if (!clickedInsideDropdown) {
            closeAllDropdownMenus();
        }
    });

    /* ------------------------ Testimonial Slider ------------------------ */

    let currentTestimonialIndex = 0;
    let testimonialInterval;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');

    // Function to show specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Update current index
        currentTestimonialIndex = index;
        
        // Show selected testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
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
        const controls = document.querySelectorAll('.prev, .next, .dot');
        controls.forEach(control => {
            control.addEventListener('click', function() {
                resetTestimonialInterval();
            });
        });
        
        // Pause auto-advancement when hovering over testimonial
        const testimonialContainer = document.querySelector('.testimonial-slider');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('mouseenter', function() {
                clearInterval(testimonialInterval);
            });
            
            // Resume auto-advancement when mouse leaves testimonial
            testimonialContainer.addEventListener('mouseleave', function() {
                resetTestimonialInterval();
            });
        }
    }

    /* ------------------------ FAQ Accordion Functionality ------------------------ */

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('hidden', '');

        question.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            // Toggle current
            this.setAttribute('aria-expanded', String(!isExpanded));
            if (isExpanded) {
                answer.setAttribute('hidden', '');
                item.classList.remove('active');
            } else {
                answer.removeAttribute('hidden');
                item.classList.add('active');
            }

            // Close others
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherQuestion && otherAnswer) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.setAttribute('hidden', '');
                        otherItem.classList.remove('active');
                    }
                }
            });
        });
    });

    /* ------------------------ Smooth Scroll for Anchor Links ------------------------ */

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth',
                    });
                }
            }
        });
    });

    /* ------------------------ Contact Form Submission ------------------------ */

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // TODO: here you would implement AJAX or other submission logic
            alert(`Thank you, ${name}! Your message has been received. We'll contact you soon at ${email}.`);

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

    const chatBtn = document.querySelector('.chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            alert('Our customer support team will be with you shortly. Thank you for your patience!');
        });
    }

    /* ------------------------ Scroll-triggered Animation on Elements ------------------------ */

    const animatedElements = document.querySelectorAll(
        '.package-card, .benefit-item, .stat-item, .faq-item, .service-card, .process-step, .testimonial, .portfolio-item'
    );

    const animationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    animationObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
});