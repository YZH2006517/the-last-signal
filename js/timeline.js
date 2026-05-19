/* ═══════════════════════════════════════════════
   TIMELINE — Horizontal scroll with click-drag + wheel + touch
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  const container = document.querySelector('.timeline-container');
  const track = document.getElementById('timeline-track');
  const hint = document.querySelector('.timeline-hint');
  if (!container || !track) return;

  // ── Helper: check if timeline is scrollable ──
  function canScroll() { return track.scrollWidth > container.clientWidth; }

  // ── Wheel scroll (only when hovering the container) ──
  container.addEventListener('wheel', (e) => {
    if (!canScroll()) return;
    e.preventDefault();
    container.scrollLeft += e.deltaY * 0.8;
  }, { passive: false });

  // ── Click-and-drag scroll ──
  let isDown = false, startX = 0, scrollStart = 0;

  container.addEventListener('mousedown', (e) => {
    if (!canScroll()) return;
    isDown = true;
    startX = e.clientX;
    scrollStart = container.scrollLeft;
    container.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const dx = startX - e.clientX;
    container.scrollLeft = scrollStart + dx;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    container.style.cursor = '';
  });

  // ── Touch drag for mobile ──
  let touchStartX = 0, touchScrollStart = 0, isTouching = false;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchScrollStart = container.scrollLeft;
    isTouching = true;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    const dx = touchStartX - e.touches[0].clientX;
    container.scrollLeft = touchScrollStart + dx;
  }, { passive: true });

  container.addEventListener('touchend', () => { isTouching = false; });

  // ── Keyboard support ──
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      container.scrollLeft += 300; e.preventDefault();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      container.scrollLeft -= 300; e.preventDefault();
    }
  });
  container.setAttribute('tabindex', '0');

  // ── Scroll hint auto-dismiss ──
  if (hint) {
    const hideHint = () => {
      if (container.scrollLeft > 10) hint.classList.add('hint-hidden');
    };
    container.addEventListener('scroll', hideHint);
    setTimeout(() => {
      if (!hint.classList.contains('hint-hidden')) hint.classList.add('hint-hidden');
    }, 5000);
  }

  // ── Node reveal on scroll ──
  const tlNodes = document.querySelectorAll('.tl-node');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('tl-visible');
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  tlNodes.forEach(node => {
    node.classList.add('tl-hidden');
    tlObserver.observe(node);
  });

  // ── Click node to snap-scroll to it ──
  tlNodes.forEach(node => {
    node.addEventListener('click', () => {
      const offset = node.offsetLeft - container.offsetLeft - 40;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    });
  });

})();
