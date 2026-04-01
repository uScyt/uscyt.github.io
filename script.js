/* ── TYPING ANIMATION ── */
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Building secure software, breaking the rest.',
    'Rust · Python · PHP · JavaScript',
    'Offensive Sec · Forensics · CTF',
  ];

  let pi = 0, ci = 0, deleting = false;
  el.textContent = '';

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, 2400);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 28 : 44 + Math.random() * 32);
  }

  setTimeout(tick, 1000);
})();

/* ── UPTIME COUNTER ── */
(function initUptime() {
  const el = document.getElementById('uptime');
  if (!el) return;

  const start = performance.now();

  function fmt(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return h > 0
      ? `${h}h ${m % 60}m ${s % 60}s`
      : m > 0
      ? `${m}m ${s % 60}s`
      : `${s}s`;
  }

  setInterval(() => {
    el.textContent = fmt(performance.now() - start);
  }, 1000);
})();

/* ── REVEAL ON SCROLL ── */
(function initReveal() {
  const obs = new IntersectionObserver(
    entries =>
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
    { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ── NAV SCROLL STYLE ── */
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 48);
        ticking = false;
      });
    },
    { passive: true }
  );
})();

/* ── NAV MOBILE TOGGLE ── */
(function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('.nav-link').forEach(l =>
    l.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ── NAV ACTIVE SECTION HIGHLIGHT ── */
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!links.length || !sections.length) return;

  const obs = new IntersectionObserver(
    entries =>
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = '#' + e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
      }),
    { threshold: 0.45 }
  );
  sections.forEach(s => obs.observe(s));
})();

/* ── SKILLS STAGGER ON REVEAL ── */
(function initSkillsStagger() {
  const section = document.getElementById('skills');
  if (!section) return;
  const items = section.querySelectorAll('.skill');

  items.forEach(it => {
    it.style.opacity = '0';
    it.style.transform = 'translateY(7px)';
  });

  new IntersectionObserver(
    (entries, obs) => {
      if (!entries[0].isIntersecting) return;
      items.forEach((item, i) => {
        item.style.transition = `opacity 0.35s ease ${i * 28}ms, transform 0.35s ease ${i * 28}ms`;
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'none';
        }, 10);
      });
      obs.disconnect();
    },
    { threshold: 0.2 }
  ).observe(section);
})();
