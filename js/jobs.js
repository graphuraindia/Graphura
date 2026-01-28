<<<<<<< HEAD
// Internship Cards JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initFilterButtons();
  initViewDetailsButtons();
  initCardHoverEffects();
  initAnimations();
});

// Filter functionality
function initFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const internshipCards = document.querySelectorAll(".internship-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      // Show/hide cards based on filter
      internshipCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// View Details Button functionality
function initViewDetailsButtons() {
  const viewDetailsBtns = document.querySelectorAll(".view-details-btn");

  viewDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const role = this.getAttribute("data-role");

      // Redirect to a new page based on role
      window.location.href = `/internship/${role}.html`;
    });
  });
}

// // Show internship details modal
// function showInternshipDetails(role, title, card) {
//     // Remove existing modal if present
//     const existingModal = document.querySelector('.internship-modal');
//     if (existingModal) {
//         existingModal.remove();
//     }

//     // Get category for styling
//     const category = card.getAttribute('data-category');

//     // Create modal
//     const modal = document.createElement('div');
//     modal.className = 'internship-modal';
//     modal.style.cssText = `
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(15, 23, 42, 0.95);
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         z-index: 1000;
//         backdrop-filter: blur(10px);
//         opacity: 0;
//         transition: opacity 0.3s ease;
//     `;

//     // Get category gradient
//     let gradient;
//     switch(category) {
//         case 'creative':
//             gradient = 'linear-gradient(135deg, #ec4899, #f472b6)';
//             break;
//         case 'technical':
//             gradient = 'linear-gradient(135deg, #10b981, #34d399)';
//             break;
//         case 'marketing':
//             gradient = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
//             break;
//         case 'management':
//             gradient = 'linear-gradient(135deg, #8b5cf6, #a78bfa)';
//             break;
//         default:
//             gradient = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
//     }

//     // Modal content based on role
//     const details = getInternshipDetails(role);

//     modal.innerHTML = `
//         <div class="modal-content" style="
//             background: rgba(30, 41, 59, 0.9);
//             border-radius: 20px;
//             padding: 40px;
//             max-width: 800px;
//             width: 90%;
//             max-height: 80vh;
//             overflow-y: auto;
//             border: 1px solid rgba(255, 255, 255, 0.1);
//             position: relative;
//             transform: translateY(30px);
//             transition: transform 0.3s ease;
//         ">
//             <button class="modal-close" style="
//                 position: absolute;
//                 top: 20px;
//                 right: 20px;
//                 background: none;
//                 border: none;
//                 color: #94a3b8;
//                 font-size: 24px;
//                 cursor: pointer;
//                 transition: color 0.3s ease;
//             ">&times;</button>

//             <div class="modal-header" style="margin-bottom: 30px;">
//                 <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
//                     <div class="modal-icon" style="
//                         width: 70px;
//                         height: 70px;
//                         background: ${gradient};
//                         border-radius: 15px;
//                         display: flex;
//                         align-items: center;
//                         justify-content: center;
//                         color: white;
//                         font-size: 30px;
//                     ">
//                         ${card.querySelector('.card-icon').innerHTML}
//                     </div>
//                     <div>
//                         <h2 style="
//                             color: white;
//                             font-size: 2.2rem;
//                             margin: 0 0 10px 0;
//                             background: ${gradient};
//                             -webkit-background-clip: text;
//                             -webkit-text-fill-color: transparent;
//                         ">${title}</h2>
//                         <div style="display: flex; gap: 15px; flex-wrap: wrap;">
//                             <span style="
//                                 background: rgba(99, 102, 241, 0.15);
//                                 color: #a5b4fc;
//                                 padding: 8px 18px;
//                                 border-radius: 20px;
//                                 font-size: 0.9rem;
//                                 font-weight: 600;
//                                 border: 1px solid rgba(99, 102, 241, 0.3);
//                             ">${details.duration}</span>
//                             <span style="
//                                 background: rgba(99, 102, 241, 0.15);
//                                 color: #a5b4fc;
//                                 padding: 8px 18px;
//                                 border-radius: 20px;
//                                 font-size: 0.9rem;
//                                 font-weight: 600;
//                                 border: 1px solid rgba(99, 102, 241, 0.3);
//                             ">${details.type}</span>
//                         </div>
//                     </div>
//                 </div>
//                 <p style="color: #cbd5e1; line-height: 1.6; font-size: 1.1rem;">
//                     ${details.description}
//                 </p>
//             </div>

//             <div class="modal-body" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
//                 <div class="responsibilities">
//                     <h3 style="color: white; font-size: 1.3rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
//                         <i class="fas fa-tasks" style="color: ${category === 'creative' ? '#ec4899' : category === 'technical' ? '#10b981' : category === 'marketing' ? '#f59e0b' : '#8b5cf6'}"></i>
//                         Key Responsibilities
//                     </h3>
//                     <ul style="color: #94a3b8; list-style: none; padding: 0;">
//                         ${details.responsibilities.map(res => `
//                             <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
//                                 <i class="fas fa-check-circle" style="
//                                     position: absolute;
//                                     left: 0;
//                                     color: ${category === 'creative' ? '#ec4899' : category === 'technical' ? '#10b981' : category === 'marketing' ? '#f59e0b' : '#8b5cf6'};
//                                 "></i>
//                                 ${res}
//                             </li>
//                         `).join('')}
//                     </ul>
//                 </div>

//                 <div class="requirements">
//                     <h3 style="color: white; font-size: 1.3rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
//                         <i class="fas fa-graduation-cap" style="color: ${category === 'creative' ? '#ec4899' : category === 'technical' ? '#10b981' : category === 'marketing' ? '#f59e0b' : '#8b5cf6'}"></i>
//                         Requirements
//                     </h3>
//                     <ul style="color: #94a3b8; list-style: none; padding: 0;">
//                         ${details.requirements.map(req => `
//                             <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
//                                 <i class="fas fa-star" style="
//                                     position: absolute;
//                                     left: 0;
//                                     color: ${category === 'creative' ? '#ec4899' : category === 'technical' ? '#10b981' : category === 'marketing' ? '#f59e0b' : '#8b5cf6'};
//                                 "></i>
//                                 ${req}
//                             </li>
//                         `).join('')}
//                     </ul>
//                 </div>
//             </div>

//             <div class="modal-footer" style="margin-top: 40px; text-align: center;">
//                 <button class="apply-btn" style="
//                     background: ${gradient};
//                     color: white;
//                     border: none;
//                     padding: 18px 40px;
//                     font-size: 1.1rem;
//                     font-weight: 600;
//                     border-radius: 12px;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     display: inline-flex;
//                     align-items: center;
//                     gap: 12px;
//                 ">
//                     <i class="fas fa-paper-plane"></i>
//                     Apply for this Internship
//                 </button>
//                 <p style="color: #94a3b8; margin-top: 20px; font-size: 0.9rem;">
//                     ${details.note}
//                 </p>
//             </div>
//         </div>
//     `;

//     document.body.appendChild(modal);

//     // Show modal with animation
//     setTimeout(() => {
//         modal.style.opacity = '1';
//         modal.querySelector('.modal-content').style.transform = 'translateY(0)';
//     }, 10);

//     // Close modal functionality
//     const closeBtn = modal.querySelector('.modal-close');
//     closeBtn.addEventListener('click', () => {
//         modal.style.opacity = '0';
//         modal.querySelector('.modal-content').style.transform = 'translateY(30px)';
//         setTimeout(() => modal.remove(), 300);
//     });

//     // Close on outside click
//     modal.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             modal.style.opacity = '0';
//             modal.querySelector('.modal-content').style.transform = 'translateY(30px)';
//             setTimeout(() => modal.remove(), 300);
//         }
//     });

//     // Apply button functionality
//     const applyBtn = modal.querySelector('.apply-btn');
//     applyBtn.addEventListener('click', () => {
//         alert(`Application submitted for ${title} internship! We'll contact you soon.`);
//         modal.style.opacity = '0';
//         modal.querySelector('.modal-content').style.transform = 'translateY(30px)';
//         setTimeout(() => modal.remove(), 300);
//     });
// }

// Get detailed information for each internship role
function getInternshipDetails(role) {
  const details = {
    "content-writing": {
      duration: "3-6 Months",
      type: "Remote/On-site",
      description:
        "Master the art of creating compelling content that drives engagement and conversions. Work on real client projects and learn SEO optimization.",
      responsibilities: [
        "Create SEO-optimized blog posts and articles",
        "Develop content for social media platforms",
        "Assist in content strategy planning",
        "Conduct keyword research and analysis",
        "Edit and proofread content from team members",
      ],
      requirements: [
        "Excellent written English skills",
        "Basic understanding of SEO",
        "Creative thinking ability",
        "Attention to detail",
        "Ability to meet deadlines",
      ],
      note: "Portfolio of writing samples is required for application.",
    },
    "graphic-design": {
      duration: "3-6 Months",
      type: "Hybrid",
      description:
        "Create stunning visual designs for digital and print media. Work with experienced designers on real client projects.",
      responsibilities: [
        "Design marketing materials and social media graphics",
        "Create UI/UX mockups for websites and apps",
        "Assist in brand identity development",
        "Prepare print-ready files",
        "Collaborate with the marketing team",
      ],
      requirements: [
        "Proficiency in Adobe Creative Suite",
        "Understanding of design principles",
        "Creative portfolio required",
        "Good communication skills",
        "Ability to take feedback",
      ],
      note: "Please share your design portfolio with your application.",
    },
    "data-analyst": {
      duration: "4-6 Months",
      type: "On-site",
      description:
        "Work with real datasets to derive insights and support data-driven decision making across the organization.",
      responsibilities: [
        "Clean and analyze large datasets",
        "Create interactive dashboards and reports",
        "Develop predictive models",
        "Present findings to stakeholders",
        "Collaborate with cross-functional teams",
      ],
      requirements: [
        "Knowledge of Python/R and SQL",
        "Understanding of statistics",
        "Experience with data visualization tools",
        "Analytical mindset",
        "Problem-solving skills",
      ],
      note: "Prior experience with data projects is preferred.",
    },
    "backend-dev": {
      duration: "4-6 Months",
      type: "Remote",
      description:
        "Build scalable backend systems and APIs. Work with modern technologies and cloud platforms.",
      responsibilities: [
        "Develop RESTful APIs",
        "Design and optimize databases",
        "Implement authentication systems",
        "Write unit and integration tests",
        "Deploy applications to cloud",
      ],
      requirements: [
        "Knowledge of Node.js/Python/Java",
        "Understanding of databases",
        "Basic knowledge of cloud platforms",
        "Understanding of APIs",
        "Problem-solving skills",
      ],
      note: "GitHub profile with projects is required.",
    },
    "digital-marketing": {
      duration: "3-6 Months",
      type: "Hybrid",
      description:
        "Execute digital marketing campaigns and learn to drive business growth through various digital channels.",
      responsibilities: [
        "Manage social media advertising campaigns",
        "Conduct SEO analysis and optimization",
        "Create email marketing campaigns",
        "Analyze campaign performance",
        "Assist in content strategy",
      ],
      requirements: [
        "Understanding of digital marketing concepts",
        "Analytical skills",
        "Creative thinking",
        "Good communication skills",
        "Basic knowledge of analytics tools",
      ],
      note: "Certifications in digital marketing are a plus.",
    },
    hr: {
      duration: "3-4 Months",
      type: "On-site",
      description:
        "Learn the fundamentals of human resources management in a fast-paced tech environment.",
      responsibilities: [
        "Assist in recruitment processes",
        "Help organize employee engagement activities",
        "Maintain HR records and databases",
        "Support onboarding processes",
        "Assist in performance management",
      ],
      requirements: [
        "Good interpersonal skills",
        "Attention to detail",
        "Basic understanding of HR processes",
        "Confidentiality awareness",
        "Good communication skills",
      ],
      note: "HR certification students are encouraged to apply.",
    },
    "sales-marketing": {
      duration: "3-6 Months",
      type: "On-site/Remote",
      description:
        "Develop sales strategies and learn to convert leads into customers through various channels.",
      responsibilities: [
        "Assist in lead generation activities",
        "Participate in sales presentations",
        "Maintain CRM database",
        "Conduct market research",
        "Support client relationship management",
      ],
      requirements: [
        "Good communication skills",
        "Persuasive abilities",
        "Basic understanding of sales",
        "Customer service orientation",
        "Goal-oriented mindset",
      ],
      note: "Previous sales experience is a plus but not required.",
    },
    "ui-ux": {
      duration: "4-6 Months",
      type: "Hybrid",
      description:
        "Design user-centered interfaces and conduct user research to create optimal user experiences.",
      responsibilities: [
        "Create wireframes and prototypes",
        "Conduct user research and testing",
        "Design user interfaces",
        "Collaborate with developers",
        "Create design systems",
      ],
      requirements: [
        "Knowledge of Figma/Adobe XD",
        "Understanding of UX principles",
        "Portfolio of design work",
        "Creative problem-solving",
        "Attention to detail",
      ],
      note: "Design portfolio is mandatory for application.",
    },
    "frontend-dev": {
      duration: "4-6 Months",
      type: "Remote",
      description:
        "Build responsive and interactive web applications using modern frontend technologies.",
      responsibilities: [
        "Convert designs to responsive code",
        "Implement interactive features",
        "Optimize for performance",
        "Write clean, maintainable code",
        "Collaborate with backend team",
      ],
      requirements: [
        "HTML, CSS, JavaScript knowledge",
        "Basic React/Vue/Angular knowledge",
        "Understanding of responsive design",
        "Problem-solving skills",
        "Git version control",
      ],
      note: "GitHub profile with projects is required.",
    },
    "social-media": {
      duration: "3-4 Months",
      type: "Remote",
      description:
        "Manage social media presence and create engaging content across multiple platforms.",
      responsibilities: [
        "Create and schedule social media posts",
        "Engage with online community",
        "Analyze social media metrics",
        "Assist in content creation",
        "Monitor brand mentions",
      ],
      requirements: [
        "Active on social media platforms",
        "Good writing skills",
        "Creative content ideas",
        "Basic analytics understanding",
        "Time management skills",
      ],
      note: "Experience managing personal or club accounts is acceptable.",
    },
    "video-editing": {
      duration: "3-6 Months",
      type: "Hybrid",
      description:
        "Create professional video content for marketing, social media, and internal communications.",
      responsibilities: [
        "Edit raw footage into final videos",
        "Create motion graphics",
        "Add effects and transitions",
        "Color correction and grading",
        "Optimize videos for different platforms",
      ],
      requirements: [
        "Knowledge of Premiere Pro/After Effects",
        "Understanding of video formats",
        "Creative storytelling ability",
        "Attention to detail",
        "Portfolio of work",
      ],
      note: "Showreel or portfolio is required for application.",
    },
    legal: {
      duration: "3-4 Months",
      type: "On-site",
      description:
        "Gain practical experience in corporate law, contracts, and compliance in a tech company environment.",
      responsibilities: [
        "Assist in contract review",
        "Research legal precedents",
        "Help with compliance documentation",
        "Maintain legal databases",
        "Support IP protection processes",
      ],
      requirements: [
        "Law student in final years",
        "Research skills",
        "Attention to detail",
        "Confidentiality understanding",
        "Good writing skills",
      ],
      note: "Only law students in 3rd year or above can apply.",
    },
  };

  return details[role] || details["content-writing"];
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll(".internship-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });
  });
}

// Initialize animations
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  // Observe all internship cards
  document.querySelectorAll(".internship-card").forEach((card) => {
    observer.observe(card);
  });
}

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".internship-modal");
    if (modal) {
      modal.style.opacity = "0";
      setTimeout(() => modal.remove(), 300);
    }
  }
});
=======
// Internship Cards JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initFilterButtons();
  initViewDetailsButtons();
  initCardHoverEffects();
  initAnimations();
});

// Filter functionality
function initFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const internshipCards = document.querySelectorAll(".internship-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      // Show/hide cards based on filter
      internshipCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// View Details Button functionality
function initViewDetailsButtons() {
  const viewDetailsBtns = document.querySelectorAll(".view-details-btn");

  viewDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const role = this.getAttribute("data-role");

      // Redirect to a new page based on role
      window.location.href = `/internship/${role}.html`;
    });
  });
}

// // Show internship details modal
// function showInternshipDetails(role, title, card) {
//     // Remove existing modal if present
//     const existingModal = document.querySelector('.internship-modal');
//     if (existingModal) {
//         existingModal.remove();
//     }

//     // Get category for styling
//     const category = card.getAttribute('data-category');

//     // Create modal
//     const modal = document.createElement('div');
//     modal.className = 'internship-modal';
//     modal.style.cssText = `
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(15, 23, 42, 0.95);
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         z-index: 1000;
//         backdrop-filter: blur(10px);
//         opacity: 0;
//         transition: opacity 0.3s ease;
//     `;

//     // Get category gradient
//     let gradient;
//     switch(category) {
//         case 'creative':
//             gradient = 'linear-gradient(135deg, #ec4899, #f472b6)';
//             break;
//         case 'technical':
//             gradient = 'linear-gradient(135deg, #10b981, #34d399)';
//             break;
//         case 'marketing':
//             gradient = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
//             break;
//         case 'management':
//             gradient = 'linear-gradient(135deg, #8b5cf6, #a78bfa)';
//             break;
//         default:
//             gradient = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
//     }

//     // Modal content based on role
//     const details = getInternshipDetails(role);

//     modal.innerHTML = `
//         <div class="modal-content" style="
//             background: rgba(30, 41, 59, 0.9);
//             border-radius: 20px;
//             padding: 40px;
//             max-width: 800px;
//             width: 90%;
//             max-height: 80vh;
//             overflow-y: auto;
//             border: 1px solid rgba(255, 255, 255, 0.1);
//             position: relative;
//             transform: translateY(30px);
//             transition: transform 0.3s ease;
//         ">
//             <button class="modal-close" style="
//                 position: absolute;
//                 top: 20px;
//                 right: 20px;
//                 background: none;
//                 border: none;
//                 color: #94a3b8;
//                 font-size: 24px;
//                 cursor: pointer;
//                 transition: color 0.3s ease;
//             ">&times;</button>

//             <div class="modal-header" style="margin-bottom: 30px;">
//                 <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
//                     <div class="modal-icon" style="
//                         width: 70px;
//                         height: 70px;
//                         background: ${gradient};
//                         border-radius: 15px;
//                         display: flex;
//                         align-items: center;
//                         justify-content: center;
//                         color: white;
//                         font-size: 30px;
//                     ">
//                         ${card.querySelector('.card-icon').innerHTML}
//                     </div>
//                     <div>
//                         <h2 style="
//                             color: white;
//                             font-size: 2.2rem;
//                             margin: 0 0 10px 0;
//                             background: ${gradient};
//                             -webkit-background-clip: text;
//                             -webkit-text-fill-color: transparent;
//                         ">${title}</h2>
//                         <div style="display: flex; gap: 15px; flex-wrap: wrap;">
//                             <span style="
//                                 background: rgba(99, 102, 241, 0.15);
//                                 color: #a5b4fc;
//                                 padding: 8px 18px;
//                                 border-radius: 20px;
//                                 font-size: 0.9rem;
//                                 font-weight: 600;
//                                 border: 1px solid rgba(99, 102, 241, 0.3);
//                             ">${details.duration}</span>
//                             <span style="
//                                 background: rgba(99, 102, 241, 0.15);
//                                 color: #a5b4fc;
//                                 padding: 8px 18px;
//                                 border-radius: 20px;
//                                 font-size: 0.9rem;
//                                 font-weight: 600;
//                                 border: 1px solid rgba(99, 102, 241, 0.3);
//                             ">${details.type}</span>
//                         </div>
//                     </div>
//                 </div>
//                 <p style="color: #cbd5e1; line-height: 1.6; font-size: 1.1rem;">
//                     ${details.description}
//                 </p>
//             </div>

//             <div class="modal-body" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
//                 <div class="responsibilities">
//                     <h3 style="color: white; font-size: 1.3rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
//                         <i class="fas fa-tasks" style="color: ${category === 'creative' ? '#ec4899' : category === 'technical' ? '#10b981' : category === 'marketing' ? '#f59e0b' : '#8b5cf6'}"></i>
//                         Key Responsibilities
//                     </h3>
//                     <ul style="color: #94a3b8; list-style: none; padding: 0;">
//                         ${details.responsibilities.map(res => `
//                             <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
//                                 <i class="fas fa-check-circle" style="
//                                     position: absolute;
//                                     left: 0;
//                                     color: ${category === 'creative' ? '#ec4899' : category === 'technical' ? '#10b981' : category === 'marketing' ? '#f59e0b' : '#8b5cf6'};
//                                 "></i>
//                                 ${res}
//                             </li>
//                         `).join('')}
//                     </ul>
//                 </div>

//                 <div class="requirements">
//                     <h3 style="color: white; font-size: 1.3rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
//                         <i class="fas fa-graduation-cap" style="color: ${category === 'creative' ? '#ec4899' : category === 'technical' ? '#10b981' : category === 'marketing' ? '#f59e0b' : '#8b5cf6'}"></i>
//                         Requirements
//                     </h3>
//                     <ul style="color: #94a3b8; list-style: none; padding: 0;">
//                         ${details.requirements.map(req => `
//                             <li style="margin-bottom: 12px; padding-left: 25px; position: relative;">
//                                 <i class="fas fa-star" style="
//                                     position: absolute;
//                                     left: 0;
//                                     color: ${category === 'creative' ? '#ec4899' : category === 'technical' ? '#10b981' : category === 'marketing' ? '#f59e0b' : '#8b5cf6'};
//                                 "></i>
//                                 ${req}
//                             </li>
//                         `).join('')}
//                     </ul>
//                 </div>
//             </div>

//             <div class="modal-footer" style="margin-top: 40px; text-align: center;">
//                 <button class="apply-btn" style="
//                     background: ${gradient};
//                     color: white;
//                     border: none;
//                     padding: 18px 40px;
//                     font-size: 1.1rem;
//                     font-weight: 600;
//                     border-radius: 12px;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     display: inline-flex;
//                     align-items: center;
//                     gap: 12px;
//                 ">
//                     <i class="fas fa-paper-plane"></i>
//                     Apply for this Internship
//                 </button>
//                 <p style="color: #94a3b8; margin-top: 20px; font-size: 0.9rem;">
//                     ${details.note}
//                 </p>
//             </div>
//         </div>
//     `;

//     document.body.appendChild(modal);

//     // Show modal with animation
//     setTimeout(() => {
//         modal.style.opacity = '1';
//         modal.querySelector('.modal-content').style.transform = 'translateY(0)';
//     }, 10);

//     // Close modal functionality
//     const closeBtn = modal.querySelector('.modal-close');
//     closeBtn.addEventListener('click', () => {
//         modal.style.opacity = '0';
//         modal.querySelector('.modal-content').style.transform = 'translateY(30px)';
//         setTimeout(() => modal.remove(), 300);
//     });

//     // Close on outside click
//     modal.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             modal.style.opacity = '0';
//             modal.querySelector('.modal-content').style.transform = 'translateY(30px)';
//             setTimeout(() => modal.remove(), 300);
//         }
//     });

//     // Apply button functionality
//     const applyBtn = modal.querySelector('.apply-btn');
//     applyBtn.addEventListener('click', () => {
//         alert(`Application submitted for ${title} internship! We'll contact you soon.`);
//         modal.style.opacity = '0';
//         modal.querySelector('.modal-content').style.transform = 'translateY(30px)';
//         setTimeout(() => modal.remove(), 300);
//     });
// }

// Get detailed information for each internship role
function getInternshipDetails(role) {
  const details = {
    "content-writing": {
      duration: "3-6 Months",
      type: "Remote/On-site",
      description:
        "Master the art of creating compelling content that drives engagement and conversions. Work on real client projects and learn SEO optimization.",
      responsibilities: [
        "Create SEO-optimized blog posts and articles",
        "Develop content for social media platforms",
        "Assist in content strategy planning",
        "Conduct keyword research and analysis",
        "Edit and proofread content from team members",
      ],
      requirements: [
        "Excellent written English skills",
        "Basic understanding of SEO",
        "Creative thinking ability",
        "Attention to detail",
        "Ability to meet deadlines",
      ],
      note: "Portfolio of writing samples is required for application.",
    },
    "graphic-design": {
      duration: "3-6 Months",
      type: "Hybrid",
      description:
        "Create stunning visual designs for digital and print media. Work with experienced designers on real client projects.",
      responsibilities: [
        "Design marketing materials and social media graphics",
        "Create UI/UX mockups for websites and apps",
        "Assist in brand identity development",
        "Prepare print-ready files",
        "Collaborate with the marketing team",
      ],
      requirements: [
        "Proficiency in Adobe Creative Suite",
        "Understanding of design principles",
        "Creative portfolio required",
        "Good communication skills",
        "Ability to take feedback",
      ],
      note: "Please share your design portfolio with your application.",
    },
    "data-analyst": {
      duration: "4-6 Months",
      type: "On-site",
      description:
        "Work with real datasets to derive insights and support data-driven decision making across the organization.",
      responsibilities: [
        "Clean and analyze large datasets",
        "Create interactive dashboards and reports",
        "Develop predictive models",
        "Present findings to stakeholders",
        "Collaborate with cross-functional teams",
      ],
      requirements: [
        "Knowledge of Python/R and SQL",
        "Understanding of statistics",
        "Experience with data visualization tools",
        "Analytical mindset",
        "Problem-solving skills",
      ],
      note: "Prior experience with data projects is preferred.",
    },
    "backend-dev": {
      duration: "4-6 Months",
      type: "Remote",
      description:
        "Build scalable backend systems and APIs. Work with modern technologies and cloud platforms.",
      responsibilities: [
        "Develop RESTful APIs",
        "Design and optimize databases",
        "Implement authentication systems",
        "Write unit and integration tests",
        "Deploy applications to cloud",
      ],
      requirements: [
        "Knowledge of Node.js/Python/Java",
        "Understanding of databases",
        "Basic knowledge of cloud platforms",
        "Understanding of APIs",
        "Problem-solving skills",
      ],
      note: "GitHub profile with projects is required.",
    },
    "digital-marketing": {
      duration: "3-6 Months",
      type: "Hybrid",
      description:
        "Execute digital marketing campaigns and learn to drive business growth through various digital channels.",
      responsibilities: [
        "Manage social media advertising campaigns",
        "Conduct SEO analysis and optimization",
        "Create email marketing campaigns",
        "Analyze campaign performance",
        "Assist in content strategy",
      ],
      requirements: [
        "Understanding of digital marketing concepts",
        "Analytical skills",
        "Creative thinking",
        "Good communication skills",
        "Basic knowledge of analytics tools",
      ],
      note: "Certifications in digital marketing are a plus.",
    },
    hr: {
      duration: "3-4 Months",
      type: "On-site",
      description:
        "Learn the fundamentals of human resources management in a fast-paced tech environment.",
      responsibilities: [
        "Assist in recruitment processes",
        "Help organize employee engagement activities",
        "Maintain HR records and databases",
        "Support onboarding processes",
        "Assist in performance management",
      ],
      requirements: [
        "Good interpersonal skills",
        "Attention to detail",
        "Basic understanding of HR processes",
        "Confidentiality awareness",
        "Good communication skills",
      ],
      note: "HR certification students are encouraged to apply.",
    },
    "sales-marketing": {
      duration: "3-6 Months",
      type: "On-site/Remote",
      description:
        "Develop sales strategies and learn to convert leads into customers through various channels.",
      responsibilities: [
        "Assist in lead generation activities",
        "Participate in sales presentations",
        "Maintain CRM database",
        "Conduct market research",
        "Support client relationship management",
      ],
      requirements: [
        "Good communication skills",
        "Persuasive abilities",
        "Basic understanding of sales",
        "Customer service orientation",
        "Goal-oriented mindset",
      ],
      note: "Previous sales experience is a plus but not required.",
    },
    "ui-ux": {
      duration: "4-6 Months",
      type: "Hybrid",
      description:
        "Design user-centered interfaces and conduct user research to create optimal user experiences.",
      responsibilities: [
        "Create wireframes and prototypes",
        "Conduct user research and testing",
        "Design user interfaces",
        "Collaborate with developers",
        "Create design systems",
      ],
      requirements: [
        "Knowledge of Figma/Adobe XD",
        "Understanding of UX principles",
        "Portfolio of design work",
        "Creative problem-solving",
        "Attention to detail",
      ],
      note: "Design portfolio is mandatory for application.",
    },
    "frontend-dev": {
      duration: "4-6 Months",
      type: "Remote",
      description:
        "Build responsive and interactive web applications using modern frontend technologies.",
      responsibilities: [
        "Convert designs to responsive code",
        "Implement interactive features",
        "Optimize for performance",
        "Write clean, maintainable code",
        "Collaborate with backend team",
      ],
      requirements: [
        "HTML, CSS, JavaScript knowledge",
        "Basic React/Vue/Angular knowledge",
        "Understanding of responsive design",
        "Problem-solving skills",
        "Git version control",
      ],
      note: "GitHub profile with projects is required.",
    },
    "social-media": {
      duration: "3-4 Months",
      type: "Remote",
      description:
        "Manage social media presence and create engaging content across multiple platforms.",
      responsibilities: [
        "Create and schedule social media posts",
        "Engage with online community",
        "Analyze social media metrics",
        "Assist in content creation",
        "Monitor brand mentions",
      ],
      requirements: [
        "Active on social media platforms",
        "Good writing skills",
        "Creative content ideas",
        "Basic analytics understanding",
        "Time management skills",
      ],
      note: "Experience managing personal or club accounts is acceptable.",
    },
    "video-editing": {
      duration: "3-6 Months",
      type: "Hybrid",
      description:
        "Create professional video content for marketing, social media, and internal communications.",
      responsibilities: [
        "Edit raw footage into final videos",
        "Create motion graphics",
        "Add effects and transitions",
        "Color correction and grading",
        "Optimize videos for different platforms",
      ],
      requirements: [
        "Knowledge of Premiere Pro/After Effects",
        "Understanding of video formats",
        "Creative storytelling ability",
        "Attention to detail",
        "Portfolio of work",
      ],
      note: "Showreel or portfolio is required for application.",
    },
    legal: {
      duration: "3-4 Months",
      type: "On-site",
      description:
        "Gain practical experience in corporate law, contracts, and compliance in a tech company environment.",
      responsibilities: [
        "Assist in contract review",
        "Research legal precedents",
        "Help with compliance documentation",
        "Maintain legal databases",
        "Support IP protection processes",
      ],
      requirements: [
        "Law student in final years",
        "Research skills",
        "Attention to detail",
        "Confidentiality understanding",
        "Good writing skills",
      ],
      note: "Only law students in 3rd year or above can apply.",
    },
  };

  return details[role] || details["content-writing"];
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll(".internship-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });
  });
}

// Initialize animations
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  // Observe all internship cards
  document.querySelectorAll(".internship-card").forEach((card) => {
    observer.observe(card);
  });
}

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".internship-modal");
    if (modal) {
      modal.style.opacity = "0";
      setTimeout(() => modal.remove(), 300);
    }
  }
});
>>>>>>> f6db8c877eb33a842c6b13394562786458e183da
