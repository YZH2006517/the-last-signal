/* ═══════════════════════════════════════════════
   SCROLL ANIMATIONS — Reveal on scroll + nav + stars
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  try {
    // ── 1. REVEAL ON SCROLL ──
    const revealElements = document.querySelectorAll('[data-reveal]');
    console.log('[debug] data-reveal elements found:', revealElements.length);

    // Immediate reveal: everything visible NOW
    revealElements.forEach(el => {
      el.classList.add('revealed');
      console.log('[debug] revealed:', el.className);
    });

    // Also observe for late-loading / future elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    // ── NAV ──
    const nav = document.getElementById('nav');
    const navProgress = document.getElementById('nav-progress-bar');
    const allSections = document.querySelectorAll('[data-section]');

    function updateNav() {
      if (!nav || !navProgress) return;
      nav.classList.toggle('scrolled', window.scrollY > 100);
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      navProgress.style.width = `${Math.min(window.scrollY / scrollHeight, 1) * 100}%`;
      let currentSection = '';
      const threshold = window.innerHeight * 0.3;
      if (allSections) {
        allSections.forEach(section => {
          if (section.getBoundingClientRect().top <= threshold) {
            currentSection = section.id || section.dataset.section;
          }
        });
      }
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
      });
    }

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateNav);
    });
    updateNav();

    // ── STARS ──
    (function() {
      const starField = document.getElementById('stars');
      if (!starField) return;
      const s = document.createElement('style');
      s.textContent = '@keyframes twinkle{0%,100%{opacity:0;transform:scale(0.5)}50%{opacity:0.8;transform:scale(1)}}';
      document.head.appendChild(s);
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `width:${Math.random()*2+1}px;height:${Math.random()*2+1}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*3}s;animation-duration:${2+Math.random()*4}s;animation-name:twinkle`;
        starField.appendChild(star);
      }
    })();

    // ── HERO TITLE TRIGGER ──
    window.addEventListener('load', () => {
      void document.body.offsetHeight;
    });
    
    console.log('[debug] scroll-animations.js loaded OK');
  } catch(e) {
    console.error('[debug] scroll-animations.js ERROR:', e.message);
  }

})();
