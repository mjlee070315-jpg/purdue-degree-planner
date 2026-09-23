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
