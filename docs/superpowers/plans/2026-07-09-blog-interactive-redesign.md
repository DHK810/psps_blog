# PSPS 블로그 인터랙티브 팝아트 리디자인 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the PSPS blog's home/post/category/list pages into an interactive pop-art design system (new fonts, colors, card motion, scroll progress bar, scroll-reveal, category filter pills, and SEO hardening) while leaving the guitar-tools section and vendor libraries untouched.

**Architecture:** Two new standalone asset files (`assets/css/psps-interactive.css`, `assets/js/psps-interactive.js`) are loaded after the existing theme CSS/JS, so all new styling is additive/override-only. Liquid templates are edited to add the minimum markup hooks (data attributes, classes, breadcrumb, JSON-LD) needed to drive the new CSS/JS. No local Jekyll build is available, so every task is verified with `grep`-based structural checks instead of a build/test run; final visual/SEO confirmation happens after the branch is pushed and reviewed (Task 10).

**Tech Stack:** Jekyll 3.8.5 (Liquid templates), vanilla CSS, vanilla JS (no framework, no jQuery dependency for new code), Bootstrap 4 (existing, untouched).

## Global Constraints

- Do not modify `assets/vendor/`, `assets/scss/clean-blog.scss` or its imports, or any file under `category/chord-viewer.html`, `category/patterns.html`, `category/harmony.html`, `category/songs.html`, `category/tools.html`, `assets/css/guitar-tools.css`, `assets/js/guitar-chords.js`.
- Do not run `npm install`, `npm run`, or `bundle exec jekyll serve` (broken in this environment per repo `CLAUDE.md`).
- Use Edit/Write tools only — no `sed`/`awk` on repo files.
- All work happens on branch `redesign/interactive-pop`. Never push to `master` without explicit separate user approval (repo `CLAUDE.md` rule).
- Colors: bg `#FFF8EC`, ink `#1A1A1A`, pink `#FF4D6D`, yellow `#FFD23F`, blue `#3D5AFE`, mint `#2EC4B6`. Category → color: `marketing`→pink, `foreign_issue`→blue, `knowledge`→mint.
- Fonts: display = `Cafe24Ssurround` (CDN: `https://cdn.jsdelivr.net/npm/@noonnu/cafe24-ssurround@0.1.0/fonts/cafe24ssurround-normal.woff`, weight 400 only, verified reachable), body = `Pretendard` (CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/dist/web/static/pretendard.css`).
- Commit after every task (separate commits), never amend.

---

### Task 1: Create the interactive pop-art stylesheet

**Files:**
- Create: `assets/css/psps-interactive.css`

**Interfaces:**
- Produces CSS classes/IDs consumed by later tasks: `.js` (html hook), `.psps-display`, `.psps-breadcrumb` (+ `.sep`), `.psps-filters`, `.psps-filter-pill` (+ `[data-cat]`, `.active`), `.post-preview.cat-marketing|cat-foreign_issue|cat-knowledge`, `.psps-cat-badge`, `#psps-progress`, `.psps-reveal` (+ `.psps-visible`).

- [ ] **Step 1: Write the stylesheet**

```css
/* PSPS Blog — Interactive Pop Art Design System (redesign/interactive-pop)
   Loaded after /assets/main.css — override-only, does not touch clean-blog.scss */

@font-face{
  font-family: 'Cafe24Ssurround';
  src: url('https://cdn.jsdelivr.net/npm/@noonnu/cafe24-ssurround@0.1.0/fonts/cafe24ssurround-normal.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

:root{
  --psps-bg: #FFF8EC;
  --psps-ink: #1A1A1A;
  --psps-pink: #FF4D6D;
  --psps-yellow: #FFD23F;
  --psps-blue: #3D5AFE;
  --psps-mint: #2EC4B6;
  --psps-shadow-sm: 4px 4px 0 var(--psps-ink);
  --psps-shadow-md: 6px 6px 0 var(--psps-ink);
  --psps-shadow-lg: 10px 10px 0 var(--psps-ink);
  --psps-radius: 14px;
}

/* ---------- Base ---------- */
body{
  background: var(--psps-bg) !important;
  color: var(--psps-ink) !important;
  font-family: 'Pretendard', -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif !important;
}

.psps-display{
  font-family: 'Cafe24Ssurround', 'Pretendard', sans-serif;
  font-weight: 400;
  letter-spacing: -0.02em;
}

/* ---------- Navbar (markup unchanged — style existing classes) ---------- */
#mainNav{
  background: var(--psps-bg) !important;
  border-bottom: 3px solid var(--psps-ink);
  box-shadow: none !important;
}
#mainNav .navbar-brand{
  font-family: 'Cafe24Ssurround', sans-serif;
  font-size: 24px;
  color: var(--psps-ink) !important;
}
#mainNav .nav-link{
  font-weight: 700;
  color: var(--psps-ink) !important;
  border: 2px solid transparent;
  border-radius: 999px;
  padding: 8px 16px !important;
  margin: 0 2px;
  transition: transform .15s ease, background .15s ease, color .15s ease, border-color .15s ease;
}
#mainNav .nav-link:hover{
  background: var(--psps-pink);
  color: #fff !important;
  border-color: var(--psps-ink);
  transform: translateY(-2px);
}

/* ---------- Masthead / Hero (markup unchanged) ---------- */
.masthead{
  background-color: var(--psps-bg) !important;
  background-image: radial-gradient(var(--psps-ink) 1.5px, transparent 1.5px) !important;
  background-size: 18px 18px !important;
  background-position: -9px -9px !important;
  min-height: auto !important;
  padding: 110px 0 60px !important;
}
.masthead .overlay{
  background: var(--psps-bg) !important;
  opacity: .88;
}
.masthead .page-heading, .masthead .post-heading{ position: relative; }
.masthead h1{
  font-family: 'Cafe24Ssurround', sans-serif;
  color: var(--psps-ink) !important;
  transform: rotate(-2deg);
  display: inline-block;
}
.masthead .subheading, .masthead .meta{
  color: var(--psps-ink) !important;
  font-weight: 700;
}
.masthead .subheading{
  display: inline-block;
  background: var(--psps-yellow);
  border: 3px solid var(--psps-ink);
  border-radius: 999px;
  padding: 6px 20px;
  box-shadow: var(--psps-shadow-sm);
  transform: rotate(1deg);
  font-size: 16px !important;
}

/* ---------- Breadcrumb ---------- */
.psps-breadcrumb{
  max-width: 700px;
  margin: 0 auto 20px;
  padding: 0 15px;
  font-weight: 700;
  font-size: 13px;
}
.psps-breadcrumb a{
  color: var(--psps-ink);
  text-decoration: none;
  border-bottom: 2px solid var(--psps-yellow);
}
.psps-breadcrumb .sep{ margin: 0 6px; opacity: .5; }

/* ---------- Filter pills ---------- */
.psps-filters{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  max-width: 700px;
  margin: 0 auto 30px;
  padding: 0 15px;
}
.psps-filter-pill{
  cursor: pointer;
  border: 2.5px solid var(--psps-ink);
  border-radius: 999px;
  padding: 7px 18px;
  font-weight: 700;
  font-size: 13px;
  background: #fff;
  transition: transform .15s ease, background .15s ease, color .15s ease;
  user-select: none;
}
.psps-filter-pill:hover{ transform: translateY(-2px); }
.psps-filter-pill.active[data-cat="all"]{ background: var(--psps-ink); color: #fff; }
.psps-filter-pill.active[data-cat="marketing"]{ background: var(--psps-pink); color: #fff; }
.psps-filter-pill.active[data-cat="foreign_issue"]{ background: var(--psps-blue); color: #fff; }
.psps-filter-pill.active[data-cat="knowledge"]{ background: var(--psps-mint); color: #fff; }

/* ---------- Post cards ---------- */
.post-preview{
  background: #fff;
  border: 3px solid var(--psps-ink);
  border-radius: var(--psps-radius);
  box-shadow: var(--psps-shadow-md);
  padding: 20px;
  margin-bottom: 26px;
  transition: transform .18s ease, box-shadow .18s ease;
}
.post-preview:hover{
  transform: translate(-3px,-6px) rotate(-1deg);
  box-shadow: var(--psps-shadow-lg);
}
.post-preview a{ text-decoration: none; color: inherit; }
.post-preview .post-feature{
  width: 100%;
  border: 3px solid var(--psps-ink);
  border-radius: 10px;
  margin-bottom: 14px;
}
.post-preview .post-title{
  font-family: 'Cafe24Ssurround', sans-serif;
  color: var(--psps-ink) !important;
  font-size: 20px;
}
.post-preview .post-subtitle{
  color: #555 !important;
  font-size: 14px;
  font-weight: 400;
}
.post-preview .post-meta{
  font-size: 12px;
  font-weight: 700;
  color: var(--psps-ink) !important;
  opacity: .7;
}
.psps-cat-badge{
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 999px;
  border: 2px solid var(--psps-ink);
  margin-bottom: 8px;
  color: #fff;
}
.post-preview.cat-marketing .psps-cat-badge{ background: var(--psps-pink); }
.post-preview.cat-foreign_issue .psps-cat-badge{ background: var(--psps-blue); }
.post-preview.cat-knowledge .psps-cat-badge{ background: var(--psps-mint); }

/* ---------- Buttons ---------- */
.btn-primary{
  background: var(--psps-yellow) !important;
  border: 3px solid var(--psps-ink) !important;
  color: var(--psps-ink) !important;
  font-weight: 800 !important;
  border-radius: 10px !important;
  box-shadow: var(--psps-shadow-sm) !important;
  transition: transform .1s ease, box-shadow .1s ease !important;
}
.btn-primary:hover{ background: var(--psps-yellow) !important; color: var(--psps-ink) !important; }
.btn-primary:active{ transform: translate(4px,4px); box-shadow: 0 0 0 var(--psps-ink) !important; }

/* ---------- Forms (contact, shares .form-control across pages) ---------- */
.form-control{
  border: 2.5px solid var(--psps-ink) !important;
  border-radius: 8px !important;
  box-shadow: none !important;
}
.form-control:focus{
  border-color: var(--psps-pink) !important;
  box-shadow: 3px 3px 0 var(--psps-ink) !important;
}

/* ---------- Scroll progress bar (post detail only) ---------- */
#psps-progress{
  position: fixed;
  top: 0;
  left: 0;
  height: 5px;
  width: 0%;
  background: linear-gradient(90deg, var(--psps-pink), var(--psps-blue));
  z-index: 1050;
  transition: width .1s ease-out;
}

/* ---------- Scroll reveal (progressive enhancement) ---------- */
/* Default: fully visible (no-JS / .js class absent) */
.psps-reveal{ opacity: 1; transform: none; }
/* Only animate when JS confirmed running (see head.html html.js hook) */
.js .psps-reveal{
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .5s ease, transform .5s ease;
}
.js .psps-reveal.psps-visible{ opacity: 1; transform: translateY(0); }

/* ---------- Footer (markup unchanged) ---------- */
footer{ border-top: 3px solid var(--psps-ink); background: var(--psps-bg); }
footer .fa-stack .fa-circle{ color: var(--psps-ink) !important; }
footer .copyright{ font-weight: 700; }

/* ---------- Responsive ---------- */
@media (max-width: 768px){
  .masthead h1{ font-size: 32px; }
  .psps-filters{ gap: 8px; }
}
```

- [ ] **Step 2: Verify the file was created with all required selectors**

Run: `grep -c "psps-reveal\|psps-progress\|psps-filter-pill\|psps-cat-badge\|Cafe24Ssurround" assets/css/psps-interactive.css`
Expected: a number > 5 (all key selectors present)

- [ ] **Step 3: Commit**

```bash
git add assets/css/psps-interactive.css
git commit -m "Add pop-art interactive design system stylesheet"
```

---

### Task 2: Create the interactive behavior script

**Files:**
- Create: `assets/js/psps-interactive.js`

**Interfaces:**
- Consumes: DOM elements produced by later tasks — `#psps-progress`, `#post-content` (existing element ID already used in `_layouts/post.html`), `.psps-reveal`, `[data-psps-filters]` containing `.psps-filter-pill[data-cat]`, `[data-psps-post-list]` containing children with `[data-cat]`.
- Produces: no exports (IIFE), runs on `DOMContentLoaded`.

- [ ] **Step 1: Write the script**

```javascript
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
```

- [ ] **Step 2: Verify the file was created with all required functions**

Run: `grep -c "initProgressBar\|initScrollReveal\|initCategoryFilter" assets/js/psps-interactive.js`
Expected: `6` (each function name appears twice — declaration + call)

- [ ] **Step 3: Commit**

```bash
git add assets/js/psps-interactive.js
git commit -m "Add scroll progress, scroll-reveal, and category filter script"
```

---

### Task 3: Wire up fonts, new CSS/JS, and site-wide JSON-LD in `head.html`

**Files:**
- Modify: `_includes/head.html`

**Interfaces:**
- Produces: `<html class="js">` hook (consumed by Task 1's CSS `.js .psps-reveal` rule), loads `psps-interactive.css`.

- [ ] **Step 1: Add the `.js` class hook as the first line inside `<head>`**

Old string:
```html
<head>
  <!-- Google Tag Manager -->
```

New string:
```html
<head>
  <script>document.documentElement.className += ' js';</script>
  <!-- Google Tag Manager -->
```

- [ ] **Step 2: Add webfont links after the existing Google Fonts links**

Old string:
```html
  <link href='https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

  <link rel="stylesheet" href="{{"/assets/vendor/bootstrap/css/bootstrap.min.css" | relative_url }}">
```

New string:
```html
  <link href='https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

  <!-- PSPS Interactive Redesign webfonts -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/dist/web/static/pretendard.css">

  <link rel="stylesheet" href="{{"/assets/vendor/bootstrap/css/bootstrap.min.css" | relative_url }}">
```

(Cafe24 Ssurround is loaded via `@font-face` inside `psps-interactive.css` from Task 1, not a separate `<link>`, since the npm CDN only ships a font file, not a ready CSS file with correct relative paths.)

- [ ] **Step 3: Add the new CSS file link after `main.css`, and a `WebSite` JSON-LD block before `</head>`**

Old string:
```html
  <link rel="stylesheet" href="{{"/assets/main.css" | relative_url }}">
  <link rel="alternate" type="application/rss+xml" title="{{ site.title | escape }}" href="{{ "/feed.xml" | relative_url }}">
```

New string:
```html
  <link rel="stylesheet" href="{{"/assets/main.css" | relative_url }}">
  <link rel="stylesheet" href="{{"/assets/css/psps-interactive.css" | relative_url }}">
  <link rel="alternate" type="application/rss+xml" title="{{ site.title | escape }}" href="{{ "/feed.xml" | relative_url }}">

  <!-- WebSite JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": {{ site.title | jsonify }},
    "url": {{ site.url | jsonify }},
    "description": {{ site.description | jsonify }}
  }
  </script>
```

- [ ] **Step 4: Verify all three additions are present**

Run: `grep -c "documentElement.className\|psps-interactive.css\|pretendard.css\|WebSite" _includes/head.html`
Expected: `4` or higher

- [ ] **Step 5: Commit**

```bash
git add _includes/head.html
git commit -m "Load pop-art fonts/CSS and add WebSite JSON-LD to head"
```

---

### Task 4: Load the new interactive script

**Files:**
- Modify: `_includes/scripts.html`

- [ ] **Step 1: Add the script tag after the existing theme scripts**

Old string:
```html
<script src="{{"/assets/vendor/startbootstrap-clean-blog/js/clean-blog.min.js" | relative_url }}"></script>

<script src="{{"/assets/scripts.js" | relative_url }}"></script>
```

New string:
```html
<script src="{{"/assets/vendor/startbootstrap-clean-blog/js/clean-blog.min.js" | relative_url }}"></script>

<script src="{{"/assets/scripts.js" | relative_url }}"></script>
<script src="{{"/assets/js/psps-interactive.js" | relative_url }}"></script>
```

- [ ] **Step 2: Verify**

Run: `grep -c "psps-interactive.js" _includes/scripts.html`
Expected: `1`

- [ ] **Step 3: Commit**

```bash
git add _includes/scripts.html
git commit -m "Load psps-interactive.js site-wide"
```

---

### Task 5: Add shared breadcrumb + reveal wrap to `_layouts/page.html`

This layout is shared by `about.html`, `contact.html`, `posts/index.html`, and all three `category/*.html` pages — implementing the breadcrumb once here covers all of them without touching those files.

**Files:**
- Modify: `_layouts/page.html`

**Interfaces:**
- Produces: visible breadcrumb nav + `BreadcrumbList` JSON-LD for every `layout: page` page; wraps `{{ content }}` in `.psps-reveal`.

- [ ] **Step 1: Add breadcrumb markup + JSON-LD after `</header>`, and wrap content**

Old string:
```html
  </header>

  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">

        {{ content }}

      </div>
    </div>
  </div>
```

New string:
```html
  </header>

  <nav class="psps-breadcrumb" aria-label="breadcrumb">
    <a href="{{ "/" | relative_url }}">Home</a>
    <span class="sep">/</span>
    <span>{{ page.title }}</span>
  </nav>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": {{ site.title | jsonify }}, "item": {{ site.url | jsonify }} },
      { "@type": "ListItem", "position": 2, "name": {{ page.title | jsonify }}, "item": {{ page.url | prepend: site.url | jsonify }} }
    ]
  }
  </script>

  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">

        <div class="psps-reveal">
        {{ content }}
        </div>

      </div>
    </div>
  </div>
```

- [ ] **Step 2: Verify**

Run: `grep -c "psps-breadcrumb\|BreadcrumbList\|psps-reveal" _layouts/page.html`
Expected: `3` or higher

- [ ] **Step 3: Commit**

```bash
git add _layouts/page.html
git commit -m "Add shared breadcrumb, BreadcrumbList JSON-LD, and reveal wrap to page layout"
```

---

### Task 6: Update home post cards (`_layouts/home.html`)

**Files:**
- Modify: `_layouts/home.html`

**Interfaces:**
- Consumes: `.post-preview`, `.psps-cat-badge`, `.cat-marketing|cat-foreign_issue|cat-knowledge`, `.psps-reveal` (from Task 1 CSS).

- [ ] **Step 1: Replace the post loop with category-aware, accessible, lazy-loaded markup**

Old string:
```html
        {% for post in site.posts limit : 5 %}

        <article class="post-preview">
          <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
            {% if post.feature %}
              <img class="post-feature" src="{{ post.feature }}" alt="">
            {% endif %}
            <h2 class="post-title">{{ post.title }}</h2>
            {% if post.description %}
            <h4 class="post-subtitle">{{ post.description }}</h4>
            {% else %}
            <h4 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h4>
            {% endif %}
          </a>
          <p class="post-meta">
            {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
          </p>
        </article>

        <hr>

        {% endfor %}
```

New string:
```html
        {% for post in site.posts limit : 5 %}
        {% assign cat = post.categories | first %}

        <article class="post-preview cat-{{ cat }} psps-reveal" data-cat="{{ cat }}">
          <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
            <span class="psps-cat-badge">{% case cat %}{% when 'marketing' %}마케팅{% when 'foreign_issue' %}해외 이슈{% when 'knowledge' %}지식{% else %}{{ cat }}{% endcase %}</span>
            {% if post.feature %}
              <img class="post-feature" src="{{ post.feature }}" alt="{{ post.title | escape }}" {% unless forloop.first %}loading="lazy"{% endunless %}>
            {% endif %}
            <h2 class="post-title">{{ post.title }}</h2>
            {% if post.description %}
            <h4 class="post-subtitle">{{ post.description }}</h4>
            {% else %}
            <h4 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h4>
            {% endif %}
          </a>
          <p class="post-meta">
            {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
          </p>
        </article>

        <hr>

        {% endfor %}
```

- [ ] **Step 2: Verify**

Run: `grep -c "psps-cat-badge\|psps-reveal\|data-cat\|alt=\"{{ post.title" _layouts/home.html`
Expected: `4` or higher

- [ ] **Step 3: Commit**

```bash
git add _layouts/home.html
git commit -m "Restyle home post cards with category badge, alt text, lazy-load, reveal"
```

---

### Task 7: Post detail page — progress bar, breadcrumb, `BlogPosting` JSON-LD (`_layouts/post.html`)

**Files:**
- Modify: `_layouts/post.html`

**Interfaces:**
- Consumes: `#psps-progress`/`#post-content` (Task 2's JS binds to these IDs).
- Produces: `BlogPosting` JSON-LD, post-specific 3-level breadcrumb.

- [ ] **Step 1: Add the progress bar div as the first line of the file**

Old string:
```html
---
layout: default
---

<!-- Page Header -->
{% if page.background %}
```

New string:
```html
---
layout: default
---

<div id="psps-progress"></div>

<!-- Page Header -->
{% if page.background %}
```

- [ ] **Step 2: Add breadcrumb + `BlogPosting` JSON-LD after `</header>`, and wrap the content in reveal**

Old string:
```html
  </header>

  <article id="post-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">

          {{ content }}

          <hr>
```

New string:
```html
  </header>

  {% assign cat = page.categories | first %}
  <nav class="psps-breadcrumb" aria-label="breadcrumb">
    <a href="{{ "/" | relative_url }}">Home</a>
    <span class="sep">/</span>
    {% if cat %}
      <a href="{{ "/category/" | append: cat | relative_url }}">{% case cat %}{% when 'marketing' %}마케팅{% when 'foreign_issue' %}해외 이슈{% when 'knowledge' %}지식{% else %}{{ cat }}{% endcase %}</a>
      <span class="sep">/</span>
    {% endif %}
    <span>{{ page.title }}</span>
  </nav>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": {{ page.title | jsonify }},
    "description": {{ page.description | default: site.description | jsonify }},
    "datePublished": {{ page.date | date_to_xmlschema | jsonify }},
    "dateModified": {{ page.date | date_to_xmlschema | jsonify }},
    "author": { "@type": "Person", "name": {{ site.author | jsonify }} },
    "publisher": {
      "@type": "Organization",
      "name": {{ site.title | jsonify }},
      "logo": { "@type": "ImageObject", "url": {{ site.thumbnail | prepend: site.url | jsonify }} }
    },
    "image": {{ page.feature | default: site.thumbnail | prepend: site.url | jsonify }},
    "mainEntityOfPage": { "@type": "WebPage", "@id": {{ page.url | prepend: site.url | jsonify }} }
  }
  </script>

  <article id="post-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">

          <div class="psps-reveal">
          {{ content }}
          </div>

          <hr>
```

- [ ] **Step 3: Verify**

Run: `grep -c "psps-progress\|psps-breadcrumb\|BlogPosting\|psps-reveal" _layouts/post.html`
Expected: `4` or higher

- [ ] **Step 4: Commit**

```bash
git add _layouts/post.html
git commit -m "Add scroll progress bar, breadcrumb, and BlogPosting JSON-LD to post layout"
```

---

### Task 8: Filterable "전체 글" list (`posts/index.html`)

**Files:**
- Modify: `posts/index.html`

**Interfaces:**
- Produces: `[data-psps-filters]` + `.psps-filter-pill[data-cat]` and `[data-psps-post-list]` + `[data-cat]` cards, consumed by Task 2's `initCategoryFilter()`.

- [ ] **Step 1: Add the filter pill bar and wrap the post loop, fixing heading level, alt text, and lazy-load**

Old string:
```html
{% for post in paginator.posts %}

<article class="post-preview">
  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
    {% if post.feature %}
      <img class="post-feature" src="{{ post.feature }}" alt="">
    {% endif %}
    <h2 class="post-title">{{ post.title }}</h2>
    {% if post.description %}
    <h3 class="post-subtitle">{{ post.description }}</h3>
    {% else %}
    <h3 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h3>
    {% endif %}
  </a>
  <p class="post-meta">
    {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
  </p>
</article>

<hr>

{% endfor %}
```

New string:
```html
<div class="psps-filters" data-psps-filters>
  <div class="psps-filter-pill active" data-cat="all">전체</div>
  <div class="psps-filter-pill" data-cat="marketing">마케팅</div>
  <div class="psps-filter-pill" data-cat="foreign_issue">해외 이슈</div>
  <div class="psps-filter-pill" data-cat="knowledge">지식</div>
</div>

<div data-psps-post-list>
{% for post in paginator.posts %}
{% assign cat = post.categories | first %}

<article class="post-preview cat-{{ cat }} psps-reveal" data-cat="{{ cat }}">
  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
    <span class="psps-cat-badge">{% case cat %}{% when 'marketing' %}마케팅{% when 'foreign_issue' %}해외 이슈{% when 'knowledge' %}지식{% else %}{{ cat }}{% endcase %}</span>
    {% if post.feature %}
      <img class="post-feature" src="{{ post.feature }}" alt="{{ post.title | escape }}" {% unless forloop.first %}loading="lazy"{% endunless %}>
    {% endif %}
    <h2 class="post-title">{{ post.title }}</h2>
    {% if post.description %}
    <h4 class="post-subtitle">{{ post.description }}</h4>
    {% else %}
    <h4 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h4>
    {% endif %}
  </a>
  <p class="post-meta">
    {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
  </p>
</article>

<hr>

{% endfor %}
</div>
```

- [ ] **Step 2: Verify**

Run: `grep -c "data-psps-filters\|data-psps-post-list\|data-cat=\"marketing\"\|psps-cat-badge" posts/index.html`
Expected: `4` or higher

- [ ] **Step 3: Commit**

```bash
git add posts/index.html
git commit -m "Add category filter pills and restyled cards to full post list"
```

---

### Task 9: Restyle category pages (`category/1.html`, `category/2.html`, `category/3.html`)

Each file is near-identical except the hardcoded category slug/label — no filter bar needed here since the page itself is already scoped to one category.

**Files:**
- Modify: `category/1.html` (마케팅 / `marketing`)
- Modify: `category/2.html` (해외 이슈 / `foreign_issue`)
- Modify: `category/3.html` (지식 / `knowledge`)

- [ ] **Step 1: Update `category/1.html`**

Old string:
```html
	{% for post in site.categories.marketing %}

	<article class="post-preview">
	  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
	    {% if post.feature %}
	      <img class="post-feature" src="{{ post.feature }}" alt="">
	    {% endif %}
	    <h2 class="post-title">{{ post.title }}</h2>
	    {% if post.description %}
	    <h4 class="post-subtitle">{{ post.description }}</h4>
	    {% else %}
	    <h4 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h4>
	    {% endif %}
	  </a>
	  <p class="post-meta">
	    {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
	  </p>
	</article>

	<hr>

	{% endfor %}
```

New string:
```html
	{% for post in site.categories.marketing %}

	<article class="post-preview cat-marketing psps-reveal" data-cat="marketing">
	  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
	    <span class="psps-cat-badge">마케팅</span>
	    {% if post.feature %}
	      <img class="post-feature" src="{{ post.feature }}" alt="{{ post.title | escape }}" {% unless forloop.first %}loading="lazy"{% endunless %}>
	    {% endif %}
	    <h2 class="post-title">{{ post.title }}</h2>
	    {% if post.description %}
	    <h4 class="post-subtitle">{{ post.description }}</h4>
	    {% else %}
	    <h4 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h4>
	    {% endif %}
	  </a>
	  <p class="post-meta">
	    {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
	  </p>
	</article>

	<hr>

	{% endfor %}
```

- [ ] **Step 2: Update `category/2.html`**

Old string:
```html
	{% for post in site.categories.foreign_issue %}

	<article class="post-preview">
	  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
	    {% if post.feature %}
	      <img class="post-feature" src="{{ post.feature }}" alt="">
	    {% endif %}
	    <h2 class="post-title">{{ post.title }}</h2>
	    {% if post.description %}
	    <h4 class="post-subtitle">{{ post.description }}</h4>
	    {% else %}
	    <h4 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h4>
	    {% endif %}
	  </a>
	  <p class="post-meta">
	    {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
	  </p>
	</article>

	<hr>

	{% endfor %}
```

New string:
```html
	{% for post in site.categories.foreign_issue %}

	<article class="post-preview cat-foreign_issue psps-reveal" data-cat="foreign_issue">
	  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
	    <span class="psps-cat-badge">해외 이슈</span>
	    {% if post.feature %}
	      <img class="post-feature" src="{{ post.feature }}" alt="{{ post.title | escape }}" {% unless forloop.first %}loading="lazy"{% endunless %}>
	    {% endif %}
	    <h2 class="post-title">{{ post.title }}</h2>
	    {% if post.description %}
	    <h4 class="post-subtitle">{{ post.description }}</h4>
	    {% else %}
	    <h4 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h4>
	    {% endif %}
	  </a>
	  <p class="post-meta">
	    {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
	  </p>
	</article>

	<hr>

	{% endfor %}
```

- [ ] **Step 3: Update `category/3.html`**

Old string:
```html
	{% for post in site.categories.knowledge %}

	<article class="post-preview">
	  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
	    {% if post.feature %}
	      <img class="post-feature" src="{{ post.feature }}" alt="">
	    {% endif %}
	    <h2 class="post-title">{{ post.title }}</h2>
	    {% if post.description %}
	    <h4 class="post-subtitle">{{ post.description }}</h4>
	    {% else %}
	    <h4 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h4>
	    {% endif %}
	  </a>
	  <p class="post-meta">
	    {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
	  </p>
	</article>

	<hr>

	{% endfor %}
```

New string:
```html
	{% for post in site.categories.knowledge %}

	<article class="post-preview cat-knowledge psps-reveal" data-cat="knowledge">
	  <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
	    <span class="psps-cat-badge">지식</span>
	    {% if post.feature %}
	      <img class="post-feature" src="{{ post.feature }}" alt="{{ post.title | escape }}" {% unless forloop.first %}loading="lazy"{% endunless %}>
	    {% endif %}
	    <h2 class="post-title">{{ post.title }}</h2>
	    {% if post.description %}
	    <h4 class="post-subtitle">{{ post.description }}</h4>
	    {% else %}
	    <h4 class="post-subtitle">{{ post.excerpt | strip_html | truncatewords: 15 }}</h4>
	    {% endif %}
	  </a>
	  <p class="post-meta">
	    {{ post.date | date: '%B %d, %Y' }} &middot; {% include read_time.html content=post.content %}
	  </p>
	</article>

	<hr>

	{% endfor %}
```

- [ ] **Step 4: Verify all three files**

Run: `grep -l "psps-cat-badge" category/1.html category/2.html category/3.html`
Expected: all three filenames printed

- [ ] **Step 5: Commit**

```bash
git add category/1.html category/2.html category/3.html
git commit -m "Restyle category pages with badges, alt text, lazy-load, reveal"
```

---

### Task 10: Structural sanity check and branch push

**Files:** none created/modified (verification + git only)

- [ ] **Step 1: Confirm Liquid tag balance in every edited file** (heuristic check — no Jekyll build available)

Run:
```bash
for f in _includes/head.html _includes/scripts.html _layouts/page.html _layouts/home.html _layouts/post.html posts/index.html category/1.html category/2.html category/3.html; do
  ifs=$(grep -o "{% if " "$f" | wc -l); endifs=$(grep -o "{% endif" "$f" | wc -l)
  fors=$(grep -o "{% for " "$f" | wc -l); endfors=$(grep -o "{% endfor" "$f" | wc -l)
  echo "$f: if=$ifs/endif=$endifs for=$fors/endfor=$endfors"
done
```
Expected: `if` count equals `endif` count, and `for` count equals `endfor` count, for every file (unless/case/endcase pairs used in this plan are self-contained on one line so they don't need separate counting).

- [ ] **Step 2: Confirm no leftover empty `alt=""` remain in touched files**

Run: `grep -rn 'alt=""' _layouts/home.html posts/index.html category/1.html category/2.html category/3.html`
Expected: no output (empty)

- [ ] **Step 3: Confirm guitar-tools files are untouched**

Run: `git diff --stat master -- category/chord-viewer.html category/patterns.html category/harmony.html category/songs.html category/tools.html assets/css/guitar-tools.css assets/js/guitar-chords.js`
Expected: no output (empty — zero changes)

- [ ] **Step 4: Push the branch (not master)**

```bash
git push -u origin redesign/interactive-pop
```

- [ ] **Step 5: Report to user for review**

Tell the user: branch pushed, list the commit log (`git log --oneline master..redesign/interactive-pop`), and ask them to review the diff on GitHub. Explicitly state that merging to `master` (which triggers live deploy to psps.world) requires a separate, later approval — do not merge in this task.
