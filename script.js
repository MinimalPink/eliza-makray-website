(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     TRACKING LAYER — sends events to a Google Apps Script webhook.
     Replace GOOGLE_APPS_SCRIPT_ENDPOINT below with a deployed
     Apps Script Web App URL. If left empty, tracking is a silent no-op.
     ============================================================ */
  var GOOGLE_APPS_SCRIPT_ENDPOINT = "[GOOGLE_APPS_SCRIPT_ENDPOINT]";

  function track(eventName, data) {
    try {
      if (!GOOGLE_APPS_SCRIPT_ENDPOINT || GOOGLE_APPS_SCRIPT_ENDPOINT.charAt(0) === "[") return;
      var payload = Object.assign(
        { event: eventName, page: location.pathname, timestamp: new Date().toISOString() },
        data || {}
      );
      fetch(GOOGLE_APPS_SCRIPT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      }).catch(function () {});
    } catch (e) {
      /* tracking must never break the page */
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    track("page_view");

    var page = document.querySelector("main") && document.querySelector("main").dataset.page;
    if (page === "calendario") track("calendar_page_view");
    if (page === "obrigado") track("purchase_thank_you_view");

    document.querySelectorAll("[data-track]").forEach(function (el) {
      el.addEventListener("click", function () {
        track(el.dataset.track, { label: el.dataset.label || el.dataset.project || el.textContent.trim().slice(0, 60) });
      });
    });

    /* footer year */
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  });

  /* ============================================================
     MOBILE NAV
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.dataset.open === "true";
      links.dataset.open = String(!open);
      toggle.setAttribute("aria-expanded", String(!open));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.dataset.open = "false";
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  });

  /* ============================================================
     HERO REVEAL
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    var hero = document.getElementById("hero");
    if (!hero) return;
    requestAnimationFrame(function () {
      setTimeout(function () {
        hero.dataset.revealed = "true";
      }, 120);
    });

    if (!prefersReducedMotion) {
      var img = hero.querySelector(".hero-visual img");
      hero.addEventListener("pointermove", function (e) {
        if (!img) return;
        var x = (e.clientX / window.innerWidth - 0.5) * 8;
        var y = (e.clientY / window.innerHeight - 0.5) * 8;
        img.style.transform = "scale(1) translate(" + x + "px," + y + "px)";
      });
    }
  });

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    var targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach(function (t) { io.observe(t); });
  });

  /* ============================================================
     ACCORDIONS (FAQ, trajectory, oficinas)
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-accordion-trigger]").forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        if (expanded) {
          panel.style.maxHeight = "0px";
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  });

  /* ============================================================
     AUDIENCE TOGGLE (oficinas.html — crianças / adultos tabs)
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".audience-toggle").forEach(function (group) {
      var tabs = group.querySelectorAll('[role="tab"]');
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          tabs.forEach(function (t) {
            t.setAttribute("aria-selected", "false");
            var p = document.getElementById(t.getAttribute("aria-controls"));
            if (p) p.hidden = true;
          });
          tab.setAttribute("aria-selected", "true");
          var panel = document.getElementById(tab.getAttribute("aria-controls"));
          if (panel) panel.hidden = false;
        });
      });
    });
  });

  /* ============================================================
     LIGHTBOX — works off [data-gallery]/[data-index] groups
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    var lightbox = document.querySelector("[data-lightbox]");
    if (!lightbox) return;
    var imgEl = lightbox.querySelector("[data-lightbox-img]");
    var capEl = lightbox.querySelector("[data-lightbox-cap]");
    var closeBtn = lightbox.querySelector("[data-lightbox-close]");
    var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    var nextBtn = lightbox.querySelector("[data-lightbox-next]");

    var currentGroup = [];
    var currentIndex = 0;
    var lastFocused = null;

    function collectGroup(name) {
      var nodes = document.querySelectorAll('[data-gallery="' + name + '"]');
      return Array.prototype.map.call(nodes, function (node) {
        var img = node.querySelector("img");
        return { src: img ? img.currentSrc || img.src : "", alt: img ? img.alt : "" };
      });
    }

    function openAt(name, index) {
      currentGroup = collectGroup(name);
      currentIndex = index;
      if (!currentGroup.length) return;
      lastFocused = document.activeElement;
      render();
      lightbox.hidden = false;
      requestAnimationFrame(function () { lightbox.dataset.open = "true"; });
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function render() {
      var item = currentGroup[currentIndex];
      if (!item) return;
      imgEl.src = item.src;
      imgEl.alt = item.alt;
      capEl.textContent = item.alt;
      prevBtn.style.display = currentGroup.length > 1 ? "flex" : "none";
      nextBtn.style.display = currentGroup.length > 1 ? "flex" : "none";
    }

    function close() {
      lightbox.dataset.open = "false";
      document.body.style.overflow = "";
      setTimeout(function () { lightbox.hidden = true; }, 300);
      if (lastFocused) lastFocused.focus();
    }

    function step(delta) {
      if (!currentGroup.length) return;
      currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
      render();
    }

    document.querySelectorAll("[data-gallery]").forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        if (trigger.tagName === "A") e.preventDefault();
        openAt(trigger.dataset.gallery, parseInt(trigger.dataset.index, 10) || 0);
      });
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { step(-1); });
    nextBtn.addEventListener("click", function () { step(1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  });

  /* ============================================================
     STICKY PURCHASE BAR (calendario.html)
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.querySelector("[data-sticky-buy]");
    var heroCta = document.getElementById("cta-hero");
    if (!bar || !heroCta) return;
    if (!("IntersectionObserver" in window)) {
      bar.dataset.show = "true";
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          bar.dataset.show = String(!entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    io.observe(heroCta);
  });
})();
