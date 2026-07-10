(function () {
  'use strict';

  function initProgressBar() {
    var bar = document.getElementById('psps-progress');
    var article = document.getElementById('post-content');
    if (!bar || !article) return;

    function update() {
      var rect = article.getBoundingClientRect();
      var articleHeight = article.offsetHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(-rect.top, 0), articleHeight);
      var pct = articleHeight > 0 ? (scrolled / articleHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initScrollReveal() {
    var targets = document.querySelectorAll('.psps-reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('psps-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('psps-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  function initCategoryFilter() {
    var bar = document.querySelector('[data-psps-filters]');
    var list = document.querySelector('[data-psps-post-list]');
    if (!bar || !list) return;

    bar.addEventListener('click', function (e) {
      var pill = e.target.closest('.psps-filter-pill');
      if (!pill) return;

      bar.querySelectorAll('.psps-filter-pill').forEach(function (p) {
        p.classList.remove('active');
      });
      pill.classList.add('active');

      var cat = pill.getAttribute('data-cat');
      list.querySelectorAll('[data-cat]').forEach(function (card) {
        var show = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initProgressBar();
    initScrollReveal();
    initCategoryFilter();
  });
})();
