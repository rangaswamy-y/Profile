/* =========================================================
   Rangaswamy Yagateela — Portfolio interactions
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Theme toggle ---------- */
  const themeBtn = $("#theme-toggle");
  const STORAGE_KEY = "ry-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    if (themeBtn) {
      themeBtn.setAttribute(
        "title",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* ---------- Mobile nav ---------- */
  const nav = $(".nav");
  const navToggle = $(".nav-toggle");
  const navList = $("#primary-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navList?.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$("#primary-nav a");

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 120;
    let currentId = sections[0]?.id;
    for (const sec of sections) {
      if (scrollY >= sec.offsetTop) currentId = sec.id;
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === "#" + currentId);
    });
  }

  let scrollScheduled = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      requestAnimationFrame(() => {
        updateActiveNav();
        scrollScheduled = false;
      });
    },
    { passive: true }
  );
  updateActiveNav();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Counter animation ---------- */
  const counters = $$(".hero-meta-num");
  if ("IntersectionObserver" in window && counters.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10) || 0;
          const duration = 1200;
          const start = performance.now();
          function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased).toString();
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = target.toString();
          }
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => io.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  /* ---------- Typewriter ---------- */
  const tw = $(".typewriter");
  if (tw) {
    const phrases = [
      "SAP BTP solutions.",
      "CAP apps with Node.js.",
      "OData V4 services.",
      "RAG pipelines on AI Core.",
      "HANA Cloud data models.",
      "secure, scalable cloud apps.",
    ];
    let pIndex = 0;
    let cIndex = 0;
    let deleting = false;

    function type() {
      const phrase = phrases[pIndex];
      if (!deleting) {
        cIndex++;
        tw.textContent = phrase.slice(0, cIndex);
        if (cIndex === phrase.length) {
          deleting = true;
          return setTimeout(type, 2600);
        }
      } else {
        cIndex--;
        tw.textContent = phrase.slice(0, cIndex);
        if (cIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
          return setTimeout(type, 700);
        }
      }
      setTimeout(type, deleting ? 55 : 115);
    }
    type();
  }

  /* ---------- Project filter ---------- */
  const filterBtns = $$(".filter-btn");
  const projectCards = $$(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      projectCards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(/\s+/);
        const show = f === "all" || tags.includes(f);
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
