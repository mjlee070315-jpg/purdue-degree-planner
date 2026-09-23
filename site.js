// Shared across index.html and planner.html: mobile nav toggle + service
// worker registration. Kept tiny and framework-free on purpose.
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }));
    }
  });

  // ---- Planner tab navigation (Courses / Schedule / 4-Year Plan / Assignments) ----
  document.addEventListener('DOMContentLoaded', () => {
    const tabBar = document.getElementById('plannerTabBar');
    if (!tabBar) return;

    const btns = Array.from(tabBar.querySelectorAll('.tab-btn'));
    const panels = Array.from(document.querySelectorAll('.tab-panel'));
    const STORE_KEY = 'plannerActiveTab';

    function activate(name, persist) {
      let matched = false;
      btns.forEach(b => {
        const on = b.getAttribute('data-tab') === name;
        if (on) matched = true;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (!matched) return;
      panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-tab-panel') === name));
      if (persist) {
        try { localStorage.setItem(STORE_KEY, name); } catch (e) {}
      }
    }

    btns.forEach(b => b.addEventListener('click', () => activate(b.getAttribute('data-tab'), true)));

    let initial = null;
    try {
      const fromHash = (location.hash || '').replace('#', '');
      const fromStore = localStorage.getItem(STORE_KEY);
      if (fromHash && btns.some(b => b.getAttribute('data-tab') === fromHash)) initial = fromHash;
      else if (fromStore && btns.some(b => b.getAttribute('data-tab') === fromStore)) initial = fromStore;
    } catch (e) {}
    if (initial) activate(initial, false);

    // Small "unread" style badge on the Assignments tab, mirroring #assignCount
    // so it's visible at a glance without needing to switch tabs.
    const assignCountEl = document.getElementById('assignCount');
    const badgeEl = document.getElementById('tabBadgeAssign');
    if (assignCountEl && badgeEl && 'MutationObserver' in window) {
      const syncBadge = () => {
        const n = parseInt(assignCountEl.textContent, 10);
        if (Number.isFinite(n) && n > 0) {
          badgeEl.textContent = String(n);
          badgeEl.style.display = '';
        } else {
          badgeEl.style.display = 'none';
        }
      };
      new MutationObserver(syncBadge).observe(assignCountEl, { childList: true, characterData: true, subtree: true });
      syncBadge();
    }
  });

  const isEmbedded = (function () {
    try { return new URLSearchParams(location.search).get('embed') === '1' || window.self !== window.top; }
    catch (e) { return true; }
  })();

  if (!isEmbedded && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
