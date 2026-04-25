/* ═══════════════════════════════════════════════
   DR. YOAV SHECHTER — Frontend JS
   - Sticky nav
   - Mobile menu
   - Scroll reveal (Intersection Observer)
   - Smooth scroll (offset for fixed nav)
   - Contact form (fetch → /api/contact)
   - Active nav link highlighting
   - EN / HE language toggle
════════════════════════════════════════════════ */

// ── EN / HE Language Toggle ───────────────────
(function () {
  const btn      = document.getElementById('langToggle');
  const optEN    = btn && btn.querySelector('.lang-en');
  const optHE    = btn && btn.querySelector('.lang-he');
  const html     = document.documentElement;

  // Storage key so the preference survives page refresh
  const LANG_KEY = 'ys-lang';
  let   currentLang = localStorage.getItem(LANG_KEY) || 'en';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);

    if (lang === 'he') {
      html.setAttribute('lang', 'he');
      html.setAttribute('dir',  'rtl');
      if (optEN) optEN.classList.remove('active');
      if (optHE) optHE.classList.add('active');
    } else {
      html.setAttribute('lang', 'en');
      html.setAttribute('dir',  'ltr');
      if (optEN) optEN.classList.add('active');
      if (optHE) optHE.classList.remove('active');
    }

    // Swap text content for all elements carrying data-en / data-he
    document.querySelectorAll('[data-en]').forEach(el => {
      const txt = el.getAttribute(lang === 'he' ? 'data-he' : 'data-en');
      if (txt !== null) el.innerHTML = txt;
    });

    // Swap placeholder attributes
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
      const ph = el.getAttribute(lang === 'he' ? 'data-he-placeholder' : 'data-en-placeholder');
      if (ph !== null) el.setAttribute('placeholder', ph);
    });
  }

  // Initialise on load
  applyLang(currentLang);

  // Button click toggles language
  if (btn) {
    btn.addEventListener('click', () => {
      applyLang(currentLang === 'en' ? 'he' : 'en');
    });
  }
})();

// ── Navbar scroll effect ─────────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  lastScroll = y;
}, { passive: true });

// ── Mobile menu ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

// Close menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ── Smooth scroll with nav offset ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Scroll reveal (Intersection Observer) ────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ─────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

// ── Contact form ──────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic client-side validation
    const name  = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();

    if (!name || !email) {
      showStatus('error', 'Please fill in your name and email address.');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('error', 'Please enter a valid email address.');
      return;
    }

    // Disable & show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = document.documentElement.getAttribute('lang') === 'he' ? 'שולח…' : 'Sending…';
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';

    const payload = {
      name,
      email,
      company:  contactForm.querySelector('#company').value.trim(),
      position: contactForm.querySelector('#position').value.trim(),
      phone:    contactForm.querySelector('#phone').value.trim(),
      message:  contactForm.querySelector('#message').value.trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showStatus('success', '✓ Message sent — I\'ll be in touch soon. Thank you!');
        contactForm.reset();
      } else {
        throw new Error(data.error || 'Unexpected response');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      showStatus(
        'error',
        'Something went wrong. Please email me directly at yoav@dr-yoav-shechter.com'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = document.documentElement.getAttribute('lang') === 'he' ? 'שלח בקשת ייעוץ' : 'Submit Consultation Request';
    }
  });
}

function showStatus(type, message) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.style.display = 'block';
  formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Add active class to nav link CSS ─────────────
// Add minimal CSS for active state via JS (avoids extra stylesheet)
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .nav-links a.active {
    color: var(--text) !important;
    background: rgba(255,255,255,0.04);
  }
`;
document.head.appendChild(activeStyle);

// ── Polite loading: add loaded class to body ──────
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ── Animated stat counters ────────────────────────
(function () {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  let fired = false;

  function runCounters() {
    if (fired) return;
    fired = true;
    counters.forEach(el => {
      const target   = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1800;
      const start    = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target) + '+';
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // Fire when first stat scrolls into view
  const observer = new IntersectionObserver(
    entries => { if (entries.some(e => e.isIntersecting)) runCounters(); },
    { threshold: 0.3 }
  );
  counters.forEach(el => observer.observe(el));
})();

// ── Hero parallax on mouse move (subtle) ─────────
(function () {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  let rAF;
  document.addEventListener('mousemove', e => {
    if (rAF) return;
    rAF = requestAnimationFrame(() => {
      const xPct = (e.clientX / window.innerWidth  - 0.5) * 12;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 8;
      heroBg.style.transform = `scale(1.05) translate(${xPct}px, ${yPct}px)`;
      rAF = null;
    });
  });
  document.querySelector('.hero').addEventListener('mouseleave', () => {
    heroBg.style.transform = 'scale(1.04)';
  });
})();
