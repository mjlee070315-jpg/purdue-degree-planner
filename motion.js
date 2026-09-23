// ============================================================
// Lightweight motion layer for the landing page — the "Framer Motion
// feel" (spring-eased scroll reveals, staggered entrances, a live
// hero intro) without shipping React. Pure IntersectionObserver +
// CSS transitions, so the page stays a zero-build static site.
// ============================================================
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    // stagger children inside any [data-reveal-group] before observing
    document.querySelectorAll('[data-reveal-group]').forEach(group => {
      const items = group.querySelectorAll('[data-reveal]');
      items.forEach((el, i) => { el.style.transitionDelay = reduced ? '0ms' : (i * 70) + 'ms'; });
    });

    const targets = document.querySelectorAll('[data-reveal]');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('in-view'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      targets.forEach(el => io.observe(el));
    }

    // hero: reveal immediately on load, slightly staggered
    document.querySelectorAll('[data-reveal-hero]').forEach((el, i) => {
      el.style.transitionDelay = reduced ? '0ms' : (140 + i * 110) + 'ms';
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in-view')));
    });
  });

  // subtle scroll-linked parallax fade on the hero 3D layer + a soft
  // "press" micro-interaction on primary buttons
  if (!reduced) {
    const hero = document.querySelector('.hero');
    const hero3d = document.getElementById('hero3d');
    if (hero && hero3d) {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const progress = Math.min(Math.max(1 - rect.bottom / (rect.height || 1), 0), 1);
          hero3d.style.transform = `translateY(${progress * 40}px)`;
          hero3d.style.opacity = String(Math.max(1 - progress * 1.3, 0));
          ticking = false;
        });
      }, { passive: true });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('pointerdown', () => btn.classList.add('is-pressed'));
      ['pointerup', 'pointerleave'].forEach(ev => btn.addEventListener(ev, () => btn.classList.remove('is-pressed')));
    });
  });
})();
