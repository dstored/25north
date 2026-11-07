/* 25 North — calculator, reveal choreography, lead capture.
   Lead capture: FormSubmit.co (free, no account) relaying to LEAD_EMAIL.
   NOTE: the first-ever submission triggers a one-click activation email to LEAD_EMAIL;
   until it is clicked, FormSubmit holds delivery. After activation, swap the endpoint
   for the random alias FormSubmit gives you (hides the address from scrapers). */
(function () {
  "use strict";

  var LEAD_EMAIL = "dannysdubai@gmail.com";
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/" + LEAD_EMAIL;
  var GBP_AED = 4.6;

  document.documentElement.classList.add("js");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- UK take-home, 2025/26 (England/NI, employee) ---------- */
  function ukIncomeTax(gross) {
    var pa = 12570;
    if (gross > 100000) pa = Math.max(0, pa - (gross - 100000) / 2);
    var taxable = Math.max(0, gross - pa);
    // Bands apply to TAXABLE income and stay fixed when the allowance tapers:
    // basic 0–37,700 at 20%, higher 37,700–125,140 at 40%, additional above at 45%.
    var basicBand = 37700;
    var higherTop = 125140;
    var tax = Math.min(taxable, basicBand) * 0.20;
    tax += Math.min(Math.max(0, taxable - basicBand), higherTop - basicBand) * 0.40;
    tax += Math.max(0, taxable - higherTop) * 0.45;
    return tax;
  }

  function ukNI(gross) {
    var pt = 12570, uel = 50270;
    var ni = 0;
    if (gross > pt) ni += (Math.min(gross, uel) - pt) * 0.08;
    if (gross > uel) ni += (gross - uel) * 0.02;
    return ni;
  }

  function gbp(n) { return "£" + Math.round(n).toLocaleString("en-GB"); }
  function gbpMonth(n) { return "£" + Math.round(n / 12).toLocaleString("en-GB"); }

  /* ---------- Tweened number displays ---------- */
  var tweens = {};
  function setNumber(el, value, fmt) {
    if (reduceMotion) { el.textContent = fmt(value); el._val = value; return; }
    var from = el._val != null ? el._val : value;
    var start = null, dur = 260;
    if (tweens[el.id]) cancelAnimationFrame(tweens[el.id]);
    function frame(ts) {
      if (!start) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      var v = from + (value - from) * eased;
      el.textContent = fmt(v);
      if (t < 1) tweens[el.id] = requestAnimationFrame(frame);
      else el._val = value;
    }
    tweens[el.id] = requestAnimationFrame(frame);
  }

  /* ---------- Calculator ---------- */
  var slider = document.getElementById("salary");
  if (slider) {
    var salaryOut = document.getElementById("salary-out");
    var ukBig = document.getElementById("uk-takehome");
    var ukDetail = document.getElementById("uk-detail");
    var uaeBig = document.getElementById("uae-takehome");
    var uaeDetail = document.getElementById("uae-detail");
    var deltaLine = document.getElementById("delta-line");

    var recalc = function () {
      var gross = +slider.value;
      var tax = ukIncomeTax(gross);
      var ni = ukNI(gross);
      var ukNet = gross - tax - ni;

      salaryOut.textContent = gbp(gross);
      setNumber(ukBig, ukNet, gbp);
      setNumber(uaeBig, gross, gbp);
      ukDetail.textContent = "TAX " + gbp(tax) + " · NI " + gbp(ni) + " · " + gbpMonth(ukNet) + "/MO";
      uaeDetail.textContent = "≈ AED " + Math.round(gross * GBP_AED).toLocaleString("en-GB") + " · " + gbpMonth(gross) + "/MO";

      var delta = gross - ukNet;
      deltaLine.innerHTML = "Same job, same salary: <strong>" + gbp(delta) + " more per year</strong> in your pocket, " + gbpMonth(delta) + " a month.";
    };
    slider.addEventListener("input", recalc);
    recalc();
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
    // Hard fallback: content must never stay hidden (throttled tabs, odd embeds).
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }, 1200);
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Join form → FormSubmit ---------- */
  var form = document.getElementById("join-form");
  if (form) {
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      status.className = "form-status";

      var name = document.getElementById("f-name").value.trim();
      var email = document.getElementById("f-email").value.trim();
      var role = document.getElementById("f-role").value.trim();
      var timeline = document.getElementById("f-timeline").value;
      var linkedin = document.getElementById("f-linkedin").value.trim();
      var honey = document.getElementById("f-company2").value;

      if (honey) return; // bot
      if (!name || !email || !role || !timeline || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status.textContent = "Please fill in name, a valid email, your role, and where you are on the move.";
        status.classList.add("err");
        return;
      }

      var payload = {
        _subject: "25 North lead: " + name + " (" + timeline + ")",
        _template: "table",
        _captcha: "false",
        name: name,
        email: email,
        role: role,
        linkedin: linkedin || "not given",
        timeline: timeline,
        source: "25north-landing"
      };

      status.textContent = "Sending…";
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          // FormSubmit answers HTTP 200 with success:"false" while unactivated or on
          // soft errors; only a true success means the lead was actually relayed.
          if (!res.ok || String(res.body.success) === "false") throw new Error("relay not delivering");
          form.reset();
          status.textContent = "Done. You’re in the queue; we’ll be in touch within a few days. No spam, no CV blasts.";
          status.classList.add("ok");
        })
        .catch(function () {
          var body = "Name: " + name + "\nEmail: " + email + "\nRole: " + role + "\nLinkedIn: " + (linkedin || "not given") + "\nTimeline: " + timeline;
          var href = "mailto:" + LEAD_EMAIL + "?subject=" + encodeURIComponent("25 North membership request: " + name) + "&body=" + encodeURIComponent(body);
          status.innerHTML = "That didn’t send. <a href=\"" + href + "\">Click here to send it by email instead</a>.";
          status.classList.add("err");
        })
        .finally(function () { btn.disabled = false; });
    });
  }
})();
