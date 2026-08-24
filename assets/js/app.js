/* =============================================================================
   Portfolio interactions — vanilla JS, no dependencies.
   Everything degrades gracefully without JS and respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* --- 1. Scroll reveals ------------------------------------------------- */
  function initReveals() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* --- 2. Condensing sticky header -------------------------------------- */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;
    var ticking = false;
    function update() { header.classList.toggle("is-scrolled", window.scrollY > 56); ticking = false; }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* --- 3. Scroll-spy active nav link ------------------------------------ */
  function initScrollSpy() {
    var links = $$(".nav__link");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (l) {
      var id = l.getAttribute("href");
      if (id && id.charAt(0) === "#") map[id.slice(1)] = l;
    });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          var active = map[e.target.id];
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* --- 4. Mobile menu ---------------------------------------------------- */
  function initMenu() {
    var toggle = $(".nav__toggle");
    var links = $("#nav-links");
    if (!toggle || !links) return;

    var scrim = document.createElement("div");
    scrim.className = "nav-scrim";
    document.body.appendChild(scrim);

    function setOpen(open) {
      links.classList.toggle("is-open", open);
      scrim.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      $(".ico--menu", toggle).hidden = open;
      $(".ico--close", toggle).hidden = !open;
    }
    toggle.addEventListener("click", function () { setOpen(!links.classList.contains("is-open")); });
    scrim.addEventListener("click", function () { setOpen(false); });
    $$(".nav__link", links).forEach(function (l) { l.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* --- 5. Show more (project archive) ----------------------------------- */
  function initShowMore() {
    var btn = $(".show-more");
    if (!btn) return;
    btn.addEventListener("click", function () {
      $$(".card-mini.is-hidden").forEach(function (c) { c.classList.remove("is-hidden"); });
      btn.remove();
    });
  }

  /* --- 6. Terminal-line rotator (subtle) -------------------------------- */
  function initRotator() {
    $$("[data-rotate]").forEach(function (el) {
      var words;
      try { words = JSON.parse(el.getAttribute("data-rotate")); } catch (err) { return; }
      if (!words || !words.length) return;
      el.textContent = words[0];
      if (reduceMotion.matches || words.length < 2) return;
      var i = 0;
      el.style.transition = "opacity 280ms ease";
      setInterval(function () {
        el.style.opacity = "0";
        setTimeout(function () {
          i = (i + 1) % words.length;
          el.textContent = words[i];
          el.style.opacity = "1";
        }, 280);
      }, 2600);
    });
  }

  /* --- 7. Copy-to-clipboard --------------------------------------------- */
  function initCopy() {
    $$("[data-copy]").forEach(function (btn) {
      var label = btn.querySelector(".copy-label");
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy");
        var done = function () {
          if (!label) return;
          var es = document.documentElement.lang === "es";
          label.textContent = es ? "Copiado" : "Copied";
          setTimeout(function () { label.textContent = es ? "Copiar" : "Copy"; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () {});
        }
      });
    });
  }

  /* --- 8. Lightbox — Apple-style zoom from the thumbnail ------------------ */
  function initLightbox() {
    var triggers = $$("[data-zoom]");
    if (!triggers.length) return;

    var MARGIN_W = 0.92, MARGIN_H = 0.84;  /* breathing room around the opened image */
    var DUR = 520;                          /* keep in sync with .lb__img transition */
    var lb, scrim, closeBtn, cap, flying, opener, thumb, closing = false;

    function build() {
      lb = document.createElement("div");
      lb.className = "lb";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.hidden = true;

      scrim = document.createElement("div");
      scrim.className = "lb__scrim";

      closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "lb__close";
      closeBtn.setAttribute("data-i18n-aria", "aria.lightboxClose");
      closeBtn.setAttribute("aria-label", document.documentElement.lang === "es" ? "Cerrar imagen" : "Close image");
      closeBtn.innerHTML = '<svg class="ico" aria-hidden="true"><use href="#ui-close"/></svg>';

      cap = document.createElement("p");
      cap.className = "lb__cap";

      lb.appendChild(scrim);
      lb.appendChild(cap);
      lb.appendChild(closeBtn);
      document.body.appendChild(lb);

      scrim.addEventListener("click", close);
      closeBtn.addEventListener("click", close);
      lb.addEventListener("keydown", function (e) {
        if (e.key === "Tab") { e.preventDefault(); closeBtn.focus(); }
      });
    }

    /* Where the image should land: natural aspect fitted inside the viewport,
       centred in the space left over once the caption has its own room. */
    function targetRect(img) {
      var nw = img.naturalWidth || parseInt(img.getAttribute("width"), 10) || img.clientWidth;
      var nh = img.naturalHeight || parseInt(img.getAttribute("height"), 10) || img.clientHeight;
      var reserve = cap && cap.textContent ? cap.offsetHeight + 28 : 0;
      var free = window.innerHeight - reserve;
      var maxW = Math.min(window.innerWidth * MARGIN_W, nw);
      var maxH = Math.min(free * MARGIN_H, nh);
      var scale = Math.min(maxW / nw, maxH / nh);
      var w = Math.round(nw * scale), h = Math.round(nh * scale);
      return {
        width: w, height: h,
        left: Math.round((window.innerWidth - w) / 2),
        top: Math.round((free - h) / 2)
      };
    }

    function place(el, r) {
      el.style.top = r.top + "px";
      el.style.left = r.left + "px";
      el.style.width = r.width + "px";
      el.style.height = r.height + "px";
    }

    /* caption sits just under the image, so the two read as one block */
    function placeCap(r) { cap.style.top = (r.top + r.height + 20) + "px"; }

    function lockScroll(on) {
      var bar = window.innerWidth - document.documentElement.clientWidth;
      document.body.classList.toggle("lb-open", on);
      document.body.style.paddingRight = on && bar > 0 ? bar + "px" : "";
    }

    function open(btn) {
      if (flying || closing) return;
      var img = $("img", btn);
      if (!img) return;
      if (!lb) build();

      opener = btn;
      thumb = img;

      var fig = btn.closest("figure");
      var figcap = fig ? $("figcaption", fig) : null;
      /* data-caption wins: some figures caption the whole card, not the photo */
      cap.innerHTML = btn.getAttribute("data-caption") || (figcap ? figcap.innerHTML : "");

      flying = document.createElement("img");
      flying.className = "lb__img";
      flying.src = img.currentSrc || img.src;
      flying.alt = img.alt || "";
      flying.addEventListener("click", close);

      /* lock first: hiding the scrollbar shifts the page, so measure after it */
      lockScroll(true);
      var from = img.getBoundingClientRect();
      place(flying, { top: from.top, left: from.left, width: from.width, height: from.height });
      lb.hidden = false;
      lb.appendChild(flying);
      btn.classList.add("is-zoomed");

      var to = targetRect(img);
      placeCap(to);
      if (reduceMotion.matches) {
        place(flying, to);
        lb.classList.add("is-open");
      } else {
        void flying.offsetWidth;                 /* commit the start frame */
        lb.classList.add("is-open");
        /* rAF is throttled in hidden/occluded tabs — the timeout guarantees the
           end state is applied even when no frame is scheduled */
        var started = false;
        var fly = function () { if (started || !flying) return; started = true; place(flying, to); };
        window.requestAnimationFrame(fly);
        window.setTimeout(fly, 60);
      }
      closeBtn.focus({ preventScroll: true });

      document.addEventListener("keydown", onKey);
      window.addEventListener("resize", onResize);
    }

    function close() {
      if (!flying || closing) return;
      closing = true;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);

      var back = thumb.getBoundingClientRect();
      var onScreen = back.bottom > 0 && back.top < window.innerHeight;

      lb.classList.remove("is-open");
      if (reduceMotion.matches) {
        flying.style.opacity = "0";
      } else if (onScreen) {
        place(flying, { top: back.top, left: back.left, width: back.width, height: back.height });
      } else {
        /* thumbnail scrolled away — dissolve in place instead of flying off-screen */
        var r = flying.getBoundingClientRect();
        flying.style.opacity = "0";
        place(flying, {
          top: r.top + r.height * 0.04, left: r.left + r.width * 0.04,
          width: r.width * 0.92, height: r.height * 0.92
        });
      }

      window.setTimeout(function () {
        if (flying && flying.parentNode) flying.parentNode.removeChild(flying);
        flying = null;
        lb.hidden = true;
        lockScroll(false);
        if (opener) { opener.classList.remove("is-zoomed"); opener.focus({ preventScroll: true }); }
        closing = false;
      }, reduceMotion.matches ? 170 : DUR);
    }

    function onKey(e) { if (e.key === "Escape") close(); }
    function onResize() { if (!flying || !thumb) return; var r = targetRect(thumb); place(flying, r); placeCap(r); }

    triggers.forEach(function (btn) {
      btn.addEventListener("click", function () { open(btn); });
    });
  }

  /* --- 9. Inline audio players (sample bird calls) ----------------------- */
  function initPlayers() {
    var players = $$(".player");
    if (!players.length) return;
    var current = null;   /* only one clip plays at a time */

    function mmss(s) {
      if (!isFinite(s)) return "0:00";
      var m = Math.floor(s / 60);
      var r = Math.floor(s % 60);
      return m + ":" + (r < 10 ? "0" : "") + r;
    }

    players.forEach(function (p) {
      var btn = $(".player__btn", p);
      var range = $(".player__range", p);
      var time = $(".player__time", p);
      if (!btn || !range || !time) return;

      var src = btn.getAttribute("data-audio");
      /* the markup already states the length, so keep it while nothing is loaded */
      var total = (time.textContent.split("/")[1] || "").trim();
      var audio = null;
      var seeking = false;

      function paint(pct) {
        range.style.setProperty("--p", pct + "%");
        if (!seeking) range.value = String(Math.round(pct * 10));
      }

      function setPlaying(on) {
        p.classList.toggle("is-playing", on);
        $(".ico--play", btn).hidden = on;
        $(".ico--pause", btn).hidden = !on;
      }

      function load() {
        if (audio) return audio;
        audio = new Audio(src);
        audio.preload = "metadata";

        audio.addEventListener("loadedmetadata", function () {
          total = mmss(audio.duration);
          time.textContent = mmss(audio.currentTime) + " / " + total;
        });
        audio.addEventListener("timeupdate", function () {
          if (!audio.duration) return;
          paint((audio.currentTime / audio.duration) * 100);
          time.textContent = mmss(audio.currentTime) + " / " + total;
        });
        audio.addEventListener("ended", function () {
          setPlaying(false);
          paint(0);
          audio.currentTime = 0;
          time.textContent = "0:00 / " + total;
          current = null;
        });
        audio.addEventListener("pause", function () { setPlaying(false); });
        audio.addEventListener("play", function () { setPlaying(true); });
        return audio;
      }

      btn.addEventListener("click", function () {
        var a = load();
        if (!a.paused) { a.pause(); return; }
        if (current && current !== a) { current.pause(); current.currentTime = 0; }
        current = a;
        a.play().catch(function () { setPlaying(false); });   /* autoplay policy / decode error */
      });

      range.addEventListener("input", function () {
        seeking = true;
        var pct = Number(range.value) / 10;
        range.style.setProperty("--p", pct + "%");
        var a = load();
        if (a.duration) time.textContent = mmss((pct / 100) * a.duration) + " / " + total;
      });
      range.addEventListener("change", function () {
        var a = load();
        if (a.duration) a.currentTime = (Number(range.value) / 1000) * a.duration;
        seeking = false;
      });

      paint(0);
    });
  }

  /* --- 10. Footer year --------------------------------------------------- */
  function initYear() {
    var y = $("[data-year]");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function init() {
    initReveals();
    initHeader();
    initScrollSpy();
    initMenu();
    initShowMore();
    initRotator();
    initCopy();
    initLightbox();
    initPlayers();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
