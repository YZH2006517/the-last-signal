/* ═══════════════════════════════════════════════
   MAIN — Loader, Navigation, Helmet Toggle, Smooth Scroll
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── LOADER ──
  const loader = document.getElementById('loader');
  document.body.style.overflow = 'hidden';  // Prevent scroll during loader

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2200);
  });

  // ── HELMET ON/OFF SMOOTH TRANSITION (Character Section) ──
  const charVisual = document.getElementById('char-visual-chenwei');
  const toggleContainer = document.getElementById('helmet-toggle');
  const progressFill = document.getElementById('slider-fill');

  if (charVisual && toggleContainer && progressFill) {
    let progress = 0; // 0 = helmet ON, 1 = face revealed
    let targetProgress = 0;
    let animFrame = null;

    // Click to toggle between states with smooth animation
    charVisual.addEventListener('click', () => {
      targetProgress = targetProgress === 0 ? 1 : 0;
      animateTransition();
    });

    // Hover near edges to scrub (left = helmet, right = face)
    charVisual.addEventListener('mousemove', (e) => {
      const rect = charVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      // Map to progress with slight deadzone at center
      targetProgress = Math.max(0, Math.min(1, (x - 0.1) / 0.8));
      if (!animFrame) animateTransition();
    });

    charVisual.addEventListener('mouseleave', () => {
      // Snap back to nearest state
      targetProgress = targetProgress > 0.5 ? 1 : 0;
      if (!animFrame) animateTransition();
    });

    function animateTransition() {
      if (animFrame) cancelAnimationFrame(animFrame);
      const step = () => {
        const diff = targetProgress - progress;
        if (Math.abs(diff) < 0.005) {
          progress = targetProgress;
          animFrame = null;
        } else {
          progress += diff * 0.12;  // eased approach
          animFrame = requestAnimationFrame(step);
        }
        updateHelmetState(progress);
      };
      animFrame = requestAnimationFrame(step);
    }

    function updateHelmetState(p) {
      // p: 0 = full helmet, 1 = full face
      progressFill.style.width = (p * 100) + '%';

      // Helmet state: opacity + scale
      const helmetEl = toggleContainer.querySelector('.char-state-helmet');
      const faceEl = toggleContainer.querySelector('.char-state-face');
      if (!helmetEl || !faceEl) return;

      // Cross-fade with slight scale and blur for silk
      const helmetOpacity = Math.max(0, 1 - p * 1.2);
      const faceOpacity = Math.max(0, (p - 0.1) * 1.2);

      helmetEl.style.opacity = helmetOpacity;
      helmetEl.style.transform = 'scale(' + (1 - p * 0.05) + ')';
      helmetEl.style.filter = 'blur(' + (p * 2) + 'px)';

      faceEl.style.opacity = faceOpacity;
      faceEl.style.transform = 'scale(' + (0.9 + p * 0.1) + ')';
      faceEl.style.filter = 'blur(' + ((1 - p) * 2) + 'px)';
    }

    updateHelmetState(0);
  }

  // ── SMOOTH SCROLL NAVIGATION ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── MARSL PLANET PARALLAX (hero background) ──
  const marsPlanet = document.getElementById('mars-planet');
  if (marsPlanet) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      marsPlanet.style.transform = `translateY(${scrolled * 0.15}px) translateX(${scrolled * -0.05}px)`;
    });
  }

  // ── ACT VISUAL BACKGROUND EFFECTS ──
  const actVisuals = document.querySelectorAll('.act-visual-inner');
  actVisuals.forEach(visual => {
    visual.addEventListener('mouseenter', () => { visual.style.transform = 'scale(1.05)'; });
    visual.addEventListener('mouseleave', () => { visual.style.transform = 'scale(1)'; });
  });

  // ── SCROLL INDICATOR FADE ──
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      scrollIndicator.classList.toggle('faded', window.scrollY > 200);
    });
  }

  // ── FLOATING PARALLAX ON MOUSE MOVE ──
  // Only applies a CSS custom property — doesn't override reveal transforms
  // The visual offset is applied via CSS `translate()` on a child element
  document.addEventListener('mousemove', (e) => {
    const x = ((e.clientX / window.innerWidth) - 0.5) * 2;
    const y = ((e.clientY / window.innerHeight) - 0.5) * 2;
    document.documentElement.style.setProperty('--mouse-x', x.toFixed(2));
    document.documentElement.style.setProperty('--mouse-y', y.toFixed(2));
  });

  // ── AUTO-HIDE NAV ON SCROLL DOWN (CSS class, not inline transform) ──
  let lastScrollY = 0;
  const navEl = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (!navEl) return;
    const current = window.scrollY;
    navEl.classList.toggle('nav-hidden', current > lastScrollY && current > 300);
    lastScrollY = current;
  });

  // ── PIPE NODE CLICK GLOW ──
  document.querySelectorAll('.pipe-node').forEach(node => {
    node.addEventListener('click', () => {
      document.querySelectorAll('.pipe-node').forEach(n => n.classList.remove('pipe-active'));
      node.classList.add('pipe-active');
      setTimeout(() => {
        node.classList.remove('pipe-active');
      }, 1500);
    });
  });

  // ── RESIZE HANDLER ──
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => {}, 250); });

  console.log('The Last Signal - Showcase Website Loaded');
  console.log('SAIA 3583 | AI-Generated Sci-Fi Film');
})();
