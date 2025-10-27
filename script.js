// Basic interactivity: menu toggle, smooth scroll, gallery lightbox, contact form handler
document.addEventListener('DOMContentLoaded', function () {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('primary-menu');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      if (menu.style.display === 'flex') {
        menu.style.display = '';
      } else {
        menu.style.display = 'flex';
      }
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close menu on mobile
        if (window.innerWidth <= 900 && menu.style.display) {
          menu.style.display = '';
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      lbImg.src = src;
      lbImg.alt = btn.getAttribute('aria-label') || 'Ole Sariamu image';
      lightbox.setAttribute('aria-hidden', 'false');
      // lock scroll
      document.body.style.overflow = 'hidden';
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') closeLightbox();
  });

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  // Contact form handler: open mailto as fallback and show friendly message
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const callBtn = document.getElementById('call-btn');

  callBtn.addEventListener('click', () => {
    // change number below to real number
    window.location.href = 'tel:+254700000000';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name || !email) {
      feedback.textContent = 'Please provide your name and email so we can reach you.';
      return;
    }

    // Create a mailto fallback (works without a server). Replace recipient with real address.
    const recipient = 'info@olesariamu.example';
    const subject = encodeURIComponent('Visit request from ' + name);
    let body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    feedback.textContent = 'Opening your email to send the request. If nothing opens, email us at info@olesariamu.example';
  });

});
