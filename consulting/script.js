/* ============================================
   RAYJAY CONSULTING COMPANY - JavaScript
   ============================================ */

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = scrollY;
});

// ---- Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- Active Nav Link ----
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// ---- Intersection Observer for Animations ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((el, i) => {
  observer.observe(el);
});

// ---- Staggered Children Animations ----
function staggerChildren(containerSelector, childSelector, baseDelay = 100) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.querySelectorAll(childSelector).forEach((el, i) => {
    el.classList.add('fade-in');
    el.dataset.delay = i * baseDelay;
  });
}

staggerChildren('.services-grid', '.service-card', 80);
staggerChildren('.testimonials-grid', '.testimonial-card', 100);
staggerChildren('.blog-grid', '.blog-card', 100);
staggerChildren('.stats-grid', '.stat-item', 80);
staggerChildren('.why-features', '.why-feature', 100);
staggerChildren('.values-grid', '.value-card', 80);
staggerChildren('.team-grid', '.team-card', 100);

// Re-observe after staggering
document.querySelectorAll('.fade-in[data-delay]').forEach(el => {
  observer.observe(el);
});

// ---- FAQ Accordion ----
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-a.open').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-q.active').forEach(b => b.classList.remove('active'));

    if (!isOpen) {
      answer.classList.add('open');
      btn.classList.add('active');
    }
  });
});

// ---- Contact Form Validation ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
    fields.forEach(field => {
      const errEl = field.parentElement.querySelector('.error-msg');
      if (!field.value.trim()) {
        field.classList.add('error');
        if (errEl) errEl.textContent = 'This field is required.';
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.classList.add('error');
        if (errEl) errEl.textContent = 'Please enter a valid email.';
        valid = false;
      } else {
        field.classList.remove('error');
        if (errEl) errEl.textContent = '';
      }
    });

    if (valid) {
      showToast('✓ Message sent! We\'ll be in touch within 24 hours.');
      contactForm.reset();
    }
  });

  // Live validation
  contactForm.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const errEl = field.parentElement.querySelector('.error-msg');
      if (errEl) errEl.textContent = '';
    });
  });
}

// ---- Newsletter Form ----
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]');
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showToast('✓ Subscribed! Welcome to Nexus Insights.');
      email.value = '';
    } else if (email) {
      email.classList.add('error');
      setTimeout(() => email.classList.remove('error'), 2000);
    }
  });
}

// ---- Toast Notification ----
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ---- Counter Animation ----
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const start = performance.now();
  const startVal = 0;

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(startVal + (target - startVal) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => {
  counterObserver.observe(el);
});

// ---- Smooth Scroll for Anchor Links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Progress bar fill animation ----
const progObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.prog-fill').forEach(fill => {
        const width = fill.dataset.width;
        fill.style.width = width;
      });
      progObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-bars').forEach(el => {
  progObserver.observe(el);
});

document.querySelector('.js-btn-submit-prim').addEventListener('click',()=>{
  window.location.href= "/rayja/contact.html"
})

