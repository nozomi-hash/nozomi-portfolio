/* ==========================================
   NOZOMI Portfolio — script.js
   ========================================== */

(function () {
  'use strict';

  /* ------------------------------------------
     Scroll-aware Navigation
     ------------------------------------------ */
  const header = document.getElementById('site-header');

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  /* ------------------------------------------
     Mobile Navigation Toggle
     ------------------------------------------ */
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
      });
    });
  }


  /* ------------------------------------------
     Scroll Reveal Animations
     ------------------------------------------ */
  const revealTargets = document.querySelectorAll(
    '.section-title, .about-text, .about-tags, .work-card, .contact-box'
  );

  // Add reveal class to all targets
  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  // Stagger work cards
  document.querySelectorAll('.work-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 80) + 'ms';
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ------------------------------------------
     Smooth Scroll for Anchor Links
     ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ------------------------------------------
     Active Nav Link Highlight on Scroll
     ------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navItems.forEach(function (link) {
            link.removeAttribute('aria-current');
          });
          const activeLink = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
          if (activeLink) {
            activeLink.setAttribute('aria-current', 'page');
          }
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

})();
