/* ============================================================
   MAIN.JS — shared behavior for every page.
   Requires window.SITE_ROOT ("" or "../") and window.CONFIG
   (from site.config.js) to already be set via inline <script>
   tags before this file loads.
   ============================================================ */

const ROOT = window.SITE_ROOT || "";
const CONFIG = window.CONFIG;

/* ---------- partial loading (nav / mobile-sticky / footer / svg sprite) ---------- */
async function loadPartial(path, targetSelector){
  const el = document.querySelector(targetSelector);
  if(!el) return;
  const res = await fetch(ROOT + path);
  const html = await res.text();
  el.innerHTML = html.replaceAll('{{ROOT}}', ROOT);
}

async function loadPartials(){
  await Promise.all([
    loadPartial('partials/svg-sprite.html', '#svg-sprite-placeholder'),
    loadPartial('partials/nav.html', '#nav-placeholder'),
    loadPartial('partials/mobile-sticky.html', '#mobile-sticky-placeholder'),
    loadPartial('partials/footer.html', '#footer-placeholder'),
  ]);
  afterPartialsLoaded();
}

function afterPartialsLoaded(){
  wireNav();
  wireWaLinks();
  wireContactLinks();
  markCurrentNavLink();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- WhatsApp links everywhere ---------- */
function waLink(message){
  const base = `https://wa.me/${CONFIG.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

function wireWaLinks(){
  const waDefaultMsg = `Hi! I'd like to know more about ${CONFIG.business.name} experiences in the Agafay Desert.`;
  ['navWaLink','stickyWaLink','finalWaLink','contactWaBtn','footerWa','footerWaLink'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.href = waLink(waDefaultMsg);
  });
}

function wireContactLinks(){
  const phone = document.getElementById('contactPhone');
  if(phone) phone.href = `tel:${CONFIG.contact.phoneDisplay.replace(/[^\d+]/g,'')}`;
  const phoneText = document.getElementById('contactPhoneText');
  if(phoneText) phoneText.textContent = CONFIG.contact.phoneDisplay;
  const email = document.getElementById('contactEmail');
  if(email) email.href = `mailto:${CONFIG.contact.email}`;
  const emailText = document.getElementById('contactEmailText');
  if(emailText) emailText.textContent = CONFIG.contact.email;
  ['contactInsta','footerInsta'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.href = CONFIG.contact.instagram;
  });
  ['contactFb','footerFb'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.href = CONFIG.contact.facebook;
  });
}

/* ---------- NAV — scroll state, mobile menu, current-page highlight ---------- */
function wireNav(){
  const siteNav = document.getElementById('site-nav');
  if(!siteNav) return;
  window.addEventListener('scroll', ()=>{
    siteNav.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});

  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  navBurger.addEventListener('click', ()=>{
    const open = navLinks.classList.toggle('open');
    navBurger.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
    navLinks.classList.remove('open');
    navBurger.setAttribute('aria-expanded','false');
  }));
}

function markCurrentNavLink(){
  const current = document.body.dataset.navKey;
  if(!current) return;
  document.querySelectorAll(`[data-nav="${current}"]`).forEach(a=>a.classList.add('current'));
}

/* ---------- FAQ ACCORDION ---------- */
function wireFaqAccordion(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o=>{
        o.classList.remove('open');
        o.querySelector('.faq-q').setAttribute('aria-expanded','false');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        q.setAttribute('aria-expanded','true');
        a.style.maxHeight = a.scrollHeight + 40 + 'px';
      }
    });
  });
}

/* ============================================================
   BUILD YOUR OWN EXPERIENCE — render + selection list (no price)
   ============================================================ */
function wireBuildYourExperience(){
  const pickGrid = document.getElementById('pickGrid');
  if(!pickGrid) return;

  const selected = new Set();
  Object.entries(CONFIG.experiences).forEach(([key, exp])=>{
    const card = document.createElement('div');
    card.className = 'pick-card';
    card.dataset.key = key;
    card.innerHTML = `
      <div class="pick-scene">
        <img src="${ROOT}assets/images/${imgFolder(key)}/hero.${heroExt(key)}" alt="${exp.name}" loading="lazy">
        <div class="pick-check"><svg viewBox="0 0 24 24"><use href="#ico-check"/></svg></div>
      </div>
      <div class="pick-body">
        <h4>${exp.name}</h4>
        <p>${exp.shortDesc}</p>
      </div>`;
    card.addEventListener('click', ()=>{
      card.classList.toggle('active');
      if(selected.has(key)) selected.delete(key); else selected.add(key);
      renderBuildSummary();
    });
    pickGrid.appendChild(card);
  });

  const buildSummaryList = document.getElementById('buildSummaryList');

  function renderBuildSummary(){
    if(selected.size === 0){
      buildSummaryList.innerHTML = '<span class="empty">Select an experience above to begin building your evening.</span>';
      return;
    }
    buildSummaryList.innerHTML = '';
    selected.forEach(key=>{
      const exp = CONFIG.experiences[key];
      const item = document.createElement('span');
      item.className = 'build-summary-item';
      item.innerHTML = `<svg viewBox="0 0 24 24"><use href="#ico-check"/></svg> ${exp.name}`;
      buildSummaryList.appendChild(item);
    });
  }

  const summaryCta = document.getElementById('buildSummaryCta');
  if(summaryCta){
    summaryCta.addEventListener('click', (e)=>{
      e.preventDefault();
      const names = Array.from(selected).map(key=>CONFIG.experiences[key].name);
      const url = names.length
        ? `${ROOT}booking.html?exp=${encodeURIComponent(names.join('|'))}`
        : `${ROOT}booking.html`;
      window.location.href = url;
    });
  }
}

function imgFolder(key){
  return { quad:'quad', camel:'camel', pool:'pool', fire:'dinner-fire' }[key];
}
function heroExt(key){
  return { quad:'webp', camel:'webp', pool:'jpg', fire:'jpg' }[key];
}

/* ============================================================
   BOOKING FORM ↔ SUMMARY PANEL (no price)
   ============================================================ */
function wireBookingForm(){
  const bookingForm = document.getElementById('bookingForm');
  if(!bookingForm) return;

  const summaryExpList = document.getElementById('summaryExpList');
  const summaryGuests = document.getElementById('summaryGuests');
  const summaryDate = document.getElementById('summaryDate');
  const waBookLink = document.getElementById('waBookLink');

  function syncBookingSummary(){
    const checked = Array.from(bookingForm.querySelectorAll('input[name="exp"]:checked')).map(cb=>cb.value);
    const guests = parseInt(document.getElementById('guests').value || '1', 10);
    const date = document.getElementById('date').value;

    if(checked.length === 0){
      summaryExpList.innerHTML = '<div class="summary-row empty">No experience selected yet</div>';
    } else {
      summaryExpList.innerHTML = checked.map(label=>`<div class="summary-row"><span>${label}</span></div>`).join('');
    }
    const mealPref = document.getElementById('mealPref').value;

    summaryGuests.textContent = guests || '—';
    summaryDate.textContent = date ? new Date(date + 'T00:00:00').toLocaleDateString(undefined,{day:'numeric',month:'long'}) : '—';

    const msgLines = [
      `Hi! I'd like to reserve with ${CONFIG.business.name}:`,
      checked.length ? `Experience(s): ${checked.join(', ')}` : `Experience(s): (not selected yet)`,
      `Guests: ${guests || '-'}`,
      date ? `Date: ${date}` : `Date: (not selected yet)`,
      mealPref ? `Meal preference (Day Pool): ${mealPref}` : null,
    ].filter(Boolean);
    waBookLink.href = waLink(msgLines.join('\n'));
  }

  /* preselect experience(s) passed via ?exp=Name|Name2 from a "Book X" link */
  const params = new URLSearchParams(window.location.search);
  const preselect = params.get('exp');
  if(preselect){
    const labels = preselect.split('|');
    bookingForm.querySelectorAll('#bookingCheckboxes input[type="checkbox"]').forEach(cb=>{
      if(labels.includes(cb.value)) cb.checked = true;
    });
  }

  bookingForm.addEventListener('change', syncBookingSummary);
  syncBookingSummary();

  bookingForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    document.getElementById('confirmBanner').classList.add('show');
  });
}

/* ---------- experience detail page "Book X" buttons → booking.html ---------- */
function wireBookButtons(){
  document.querySelectorAll('[data-book]').forEach(btn=>{
    const label = btn.getAttribute('data-book');
    btn.href = `${ROOT}booking.html?exp=${encodeURIComponent(label)}`;
  });
}

/* ---------- CONTACT FORM ---------- */
function wireContactForm(){
  const contactForm = document.getElementById('contactForm');
  if(!contactForm) return;
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    e.target.reset();
    alert('Thanks — your message is ready to send. Connect this form to your email or CRM to receive it directly.');
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function wireScrollReveal(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}

/* ============================================================
   INIT
   ============================================================ */
loadPartials().then(()=>{
  wireFaqAccordion();
  wireBuildYourExperience();
  wireBookingForm();
  wireBookButtons();
  wireContactForm();
  wireScrollReveal();
});
