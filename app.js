// Mobile navigation toggle
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Close mobile menu on link click
const navLinks = navbarMenu.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarMenu.classList.contains('open')) {
      navbarMenu.classList.remove('open');
    }
  });
});

// Smooth scroll for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll animations for sections
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

// Add scroll-fade-in class to sections
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
  section.classList.add('scroll-fade-in');
  scrollObserver.observe(section);
});

// Parallax effect for hero images
let ticking = false;
function handleParallax() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const heroImages = document.querySelectorAll('.hero-img');
      heroImages.forEach((img, index) => {
        const speed = 0.15 + (index * 0.08);
        const yPos = -(scrolled * speed);
        img.style.transform = `translateY(${yPos}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}

if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('scroll', handleParallax, { passive: true });
}

// Skills chart using Chart.js
const skillsData = {
  technical: ['C++', 'SQL', 'Python', 'CSS', 'Java', 'Visual Studio']
};

const allSkills = [...skillsData.technical];
const skillLevels = [
  85, 75, 80, 90, 70, 65
];

const ctx = document.getElementById('skillsChart');
if (ctx) {
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allSkills,
      datasets: [{
        label: 'Skill Proficiency (%)',
        data: skillLevels,
        backgroundColor: [
          '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545',
          '#D2BA4C', '#964325', '#944454', '#13343B'
        ],
        borderColor: 'rgba(33, 128, 141, 0.8)',
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: '#32B8C6'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
            font: {
              size: 14,
              weight: '600'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(19, 52, 59, 0.9)',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 12,
          cornerRadius: 8,
          displayColors: true
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
            callback: function(value) {
              return value + '%';
            }
          },
          grid: {
            color: 'rgba(167, 169, 169, 0.1)'
          }
        },
        x: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
            maxRotation: 45,
            minRotation: 45
          },
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart'
      }
    }
  });
}

// Contact form handling (in-memory state)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

let submittedMessages = [];

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value,
    timestamp: new Date().toISOString()
  };
  
  // Store in memory (as localStorage is not available)
  submittedMessages.push(formData);
  
  // Display success message
  formStatus.textContent = 'Thank you! Your message has been sent successfully.';
  formStatus.style.color = 'var(--color-success)';
  
  // Reset form
  contactForm.reset();
  
  // Clear status after 5 seconds
  setTimeout(() => {
    formStatus.textContent = '';
  }, 5000);
  
  console.log('Message stored:', formData);
  console.log('Total messages:', submittedMessages.length);
});

// Add dynamic hover effects to skill items
const skillItems = document.querySelectorAll('.skills__item');
skillItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.05}s`;
  
  item.addEventListener('mouseenter', () => {
    const skillName = item.getAttribute('data-skill');
    item.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  });
});



// Timeline items animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  item.style.transitionDelay = `${index * 0.2}s`;
});

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.timeline-item');
      items.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const timelineSection = document.querySelector('.timeline');
if (timelineSection) {
  timelineObserver.observe(timelineSection);
}

// Certification cards stagger animation
const certCards = document.querySelectorAll('.certification-card');
certCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'scale(0.8) rotate(-5deg)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  card.style.transitionDelay = `${index * 0.15}s`;
});

const certObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.certification-card');
      cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1) rotate(0deg)';
      });
      certObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const certSection = document.querySelector('.certifications__list');
if (certSection) {
  certObserver.observe(certSection);
}

// Active navigation highlight on scroll
const sectionIds = ['home', 'about', 'education', 'certifications', 'skills', 'experience', 'contact'];

function updateActiveNav() {
  const scrollPos = window.pageYOffset + 100;
  
  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.style.borderBottomColor = 'transparent';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.borderBottomColor = 'var(--color-primary)';
          }
        });
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Initial load animations
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

console.log('Portfolio loaded successfully!');
console.log('Current theme:', getComputedStyle(document.documentElement).getPropertyValue('--color-background'));
