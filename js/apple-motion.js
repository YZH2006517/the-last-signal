/* ═══════════════════════════════════════════════
   APPLE MOTION — Smooth interactive effects
   Magnetic hover, 3D tilt, parallax, gallery zoom
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  try {
    // ── Shared RAF loop ──
    var rafId = null;
    var activeAnimations = { magnetic: false, tilt: false, parallax: false, zoom: false };

    var magnetEls = [];
    var tiltEls = [];
    var parallaxEls = [];
    var zoomEls = [];

    // ── 1. MAGNETIC HOVER ──
    var MAGNETIC_RADIUS = 120;

    function initMagnetic() {
      magnetEls = document.querySelectorAll(
        '.tech-card, .pipe-node, .gal-tab, .char-card'
      );
      magnetEls.forEach(function(el) {
        el.addEventListener('mouseenter', function(e) { activeAnimations.magnetic = true; startLoop(); });
        el.addEventListener('mousemove', function(e) {
          var rect = el.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;
          var dist = Math.sqrt(x*x + y*y);
          if (dist > MAGNETIC_RADIUS) { el.dataset.mx = '0'; el.dataset.my = '0'; return; }
          var pull = 1 - dist / MAGNETIC_RADIUS;
          el.dataset.mx = String(x * pull * 0.25);
          el.dataset.my = String(y * pull * 0.25);
        });
        el.addEventListener('mouseleave', function() {
          el.dataset.mx = '0'; el.dataset.my = '0';
        });
      });
    }

    function applyMagnetic() {
      var any = false;
      magnetEls.forEach(function(el) {
        var mx = parseFloat(el.dataset.mx) || 0;
        var my = parseFloat(el.dataset.my) || 0;
        if (Math.abs(mx) > 0.1 || Math.abs(my) > 0.1) any = true;
        var current = el.style.transform || '';
        // Preserve any existing transform (like hover) and add magnetic shift
        if (mx || my) {
          el.style.setProperty('--mx', mx + 'px');
          el.style.setProperty('--my', my + 'px');
          el.style.transform = 'translate(' + mx.toFixed(1) + 'px, ' + my.toFixed(1) + 'px)';
        } else {
          el.style.transform = '';
        }
      });
      if (!any) activeAnimations.magnetic = false;
    }

    // ── 2. 3D TILT on Setting cards ──
    function initTilt() {
      tiltEls = document.querySelectorAll('.char-card');
      tiltEls.forEach(function(el) {
        el.addEventListener('mousemove', function(e) {
          var rect = el.getBoundingClientRect();
          var x = (e.clientX - rect.left) / rect.width - 0.5;
          var y = (e.clientY - rect.top) / rect.height - 0.5;
          el.dataset.tx = String(-y * 6);
          el.dataset.ty = String(x * 6);
          activeAnimations.tilt = true;
          startLoop();
        });
        el.addEventListener('mouseleave', function() {
          el.dataset.tx = '0'; el.dataset.ty = '0';
        });
      });
    }

    function applyTilt() {
      var any = false;
      tiltEls.forEach(function(el) {
        var tx = parseFloat(el.dataset.tx) || 0;
        var ty = parseFloat(el.dataset.ty) || 0;
        if (Math.abs(tx) > 0.5 || Math.abs(ty) > 0.5) any = true;
        el.style.setProperty('--tx', tx + 'deg');
        el.style.setProperty('--ty', ty + 'deg');
        if (tx || ty) {
          el.style.transform = 'perspective(900px) rotateX(' + tx.toFixed(1) + 'deg) rotateY(' + ty.toFixed(1) + 'deg)';
        }
      });
      if (!any) activeAnimations.tilt = false;
    }

    // ── 3. PARALLAX ──
    function initParallax() {
      parallaxEls = document.querySelectorAll('[data-parallax]');
    }

    function applyParallax() {
      var viewH = window.innerHeight;
      var scrollY = window.scrollY;
      parallaxEls.forEach(function(el) {
        var speed = parseFloat(el.dataset.parallax) || 0.3;
        var rect = el.getBoundingClientRect();
        var offset = (rect.top + rect.height / 2 - viewH / 2) * speed * 0.3;
        el.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
      });
      activeAnimations.parallax = false; // One-shot per frame
    }

    // ── 4. GALLERY ZOOM ──
    function initZoom() {
      zoomEls = document.querySelectorAll('.gal-item');
      zoomEls.forEach(function(el) {
        el.addEventListener('mousemove', function(e) {
          var rect = el.getBoundingClientRect();
          var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(0);
          var y = ((e.clientY - rect.top) / rect.height * 100).toFixed(0);
          var img = el.querySelector('.gal-item-img');
          if (img) {
            img.style.transformOrigin = x + '% ' + y + '%';
          }
        });
      });
    }

    // ── RAF Loop ──
    function tick() {
      applyParallax();
      applyMagnetic();
      applyTilt();
      // Check if any animation still active
      var stillActive = activeAnimations.magnetic || activeAnimations.tilt || activeAnimations.parallax;
      if (stillActive) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function startLoop() {
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    }

    // ── Init ──
    initMagnetic();
    initTilt();
    initParallax();
    initZoom();

    // Parallax runs on scroll via the existing handler + RAF
    window.addEventListener('scroll', function() {
      activeAnimations.parallax = true;
      startLoop();
    });

    // Gallery re-init on filter change via MutationObserver
    var galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
      var observer = new MutationObserver(function() {
        setTimeout(function() {
          initMagnetic();
          initZoom();
        }, 50);
      });
      observer.observe(galleryGrid, { childList: true });
    }

    // Initial parallax
    activeAnimations.parallax = true;
    startLoop();

    console.log('[motion] Magnetic hover, 3D tilt, parallax, zoom — loaded');
  } catch(e) {
    console.warn('[motion] Error:', e.message);
  }
})();
