/* Baseline Supply Co. — motion enhancements
   curtain · char-split · parallax · magnetic CTA · 3D tilt · sticky nav · scroll bar */
(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------- 1. Curtain entry --------
  const curtain = document.getElementById('curtain');
  if (curtain) {
    requestAnimationFrame(() => {
      setTimeout(() => curtain.classList.add('open'), 350);
      setTimeout(() => curtain.remove(), 1700);
    });
  }

  // Wait for React tree to mount before wiring enhancements
  function whenReady(cb) {
    const start = performance.now();
    (function poll() {
      if (document.querySelector('.hero__title')) return cb();
      if (performance.now() - start > 5000) return;
      requestAnimationFrame(poll);
    })();
  }

  whenReady(() => {
    // -------- 2. Hero title char-split --------
    if (!reduced) {
      document.querySelectorAll('.hero__title').forEach(splitTitle);
    }

    // -------- 3. Hero parallax (mouse + scroll) --------
    const hero = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero__image');
    const heroInner = document.querySelector('.hero__inner');
    if (hero && !reduced) {
      let mx = 0, my = 0, sy = 0;
      hero.addEventListener('mousemove', (e) => {
        const r = hero.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - 0.5;
        my = (e.clientY - r.top) / r.height - 0.5;
        apply();
      });
      hero.addEventListener('mouseleave', () => { mx = 0; my = 0; apply(); });
      window.addEventListener('scroll', () => {
        sy = Math.min(window.scrollY, 600);
        apply();
      }, { passive: true });
      function apply() {
        if (heroImg) heroImg.style.transform =
          `scale(1.08) translate3d(${mx * -18}px, ${my * -14 + sy * 0.18}px, 0)`;
        if (heroInner) heroInner.style.transform =
          `translate3d(${mx * 8}px, ${my * 6 - sy * 0.08}px, 0)`;
      }
    }

    // -------- 4. Magnetic CTA buttons --------
    if (!reduced) {
      document.querySelectorAll('.btn').forEach((b) => {
        b.addEventListener('mousemove', (e) => {
          const r = b.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          b.style.setProperty('--mx', `${x * 10}px`);
          b.style.setProperty('--my', `${y * 8}px`);
        });
        b.addEventListener('mouseleave', () => {
          b.style.setProperty('--mx', '0px');
          b.style.setProperty('--my', '0px');
        });
      });
    }

    // -------- 5. 3D card tilt --------
    if (!reduced) {
      document.querySelectorAll('.card').forEach((c) => {
        let raf;
        c.addEventListener('mousemove', (e) => {
          const r = c.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            c.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
            c.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
            const media = c.querySelector('.card__media');
            if (media) {
              media.style.setProperty('--gx', `${px * 100}%`);
              media.style.setProperty('--gy', `${py * 100}%`);
            }
          });
        });
        c.addEventListener('mouseleave', () => {
          c.style.setProperty('--rx', '0deg');
          c.style.setProperty('--ry', '0deg');
        });
      });
    }

    // -------- 6. Sticky-nav shrink + scroll progress --------
    const nav = document.querySelector('.nav');
    const bar = document.getElementById('scrollbar');
    function onScroll() {
      const y = window.scrollY;
      if (nav) nav.classList.toggle('is-shrunk', y > 80);
      if (bar) {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.setProperty('--p', `${Math.max(0, Math.min(100, (y / max) * 100))}%`);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // -------- 7. Section stagger reveals augmented --------
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-stagger').forEach((el) => {
      [...el.children].forEach((c, i) => c.style.setProperty('--i', i));
      io.observe(el);
    });
  });

  function splitTitle(el) {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          [...n.textContent].forEach((ch, i) => {
            const s = document.createElement('span');
            s.className = 'ch' + (ch === ' ' ? ' ch--space' : '');
            s.style.setProperty('--i', i);
            s.textContent = ch === ' ' ? ' ' : ch;
            frag.appendChild(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && !n.classList.contains('amp')) {
          walk(n);
        } else if (n.nodeType === 1 && n.classList.contains('amp')) {
          // keep amp char as one unit
          const t = n.textContent;
          n.textContent = '';
          const s = document.createElement('span');
          s.className = 'ch';
          s.textContent = t;
          n.appendChild(s);
        }
      });
    };
    walk(el);
  }
})();
