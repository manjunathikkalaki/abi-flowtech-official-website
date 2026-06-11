// Hamburger menu toggle — iOS & cross-platform safe
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
	// Ensure menu starts closed
	hamburger.classList.remove('open');
	mobileMenu.classList.remove('open');
	
	// Function to close menu
	function closeMenu() {
		hamburger.classList.remove('open');
		mobileMenu.classList.remove('open');
	}
	
	// Function to toggle menu
	function toggleMenu(e) {
		e.preventDefault();
		e.stopPropagation();
		hamburger.classList.toggle('open');
		mobileMenu.classList.toggle('open');
	}

	// Hamburger button events
	hamburger.addEventListener('click', toggleMenu);
	hamburger.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
	hamburger.addEventListener('touchend', toggleMenu, { passive: false });

	// Close menu when any link is clicked inside mobile menu
	mobileMenu.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', closeMenu);
		link.addEventListener('touchend', closeMenu, { passive: true });
	});

	// Close menu when tapping outside (touch devices)
	document.addEventListener('touchstart', function(e) {
		if (mobileMenu.classList.contains('open') &&
			!mobileMenu.contains(e.target) &&
			!hamburger.contains(e.target)) {
			closeMenu();
		}
	}, { passive: true });

	// Close menu when clicking outside (desktop)
	document.addEventListener('click', function(e) {
		if (mobileMenu.classList.contains('open') &&
			!mobileMenu.contains(e.target) &&
			!hamburger.contains(e.target) &&
			window.innerWidth < 768) {
			closeMenu();
		}
	}, false);

	// Close on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
			closeMenu();
		}
	});
}

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
	let current = '';
	sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) current = s.id; });
	navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : ''; });
	// Also highlight mobile menu links
	mobileMenu.querySelectorAll('a').forEach(a => {
		a.classList.toggle('active', a.getAttribute('href') === '#' + current);
	});
});

// Smooth scroll — iOS Safari compatible
function smoothScrollTo(target) {
	const isMobile = window.innerWidth < 768;
	const navHeight = isMobile ? 60 : 68;
	const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
	const startPos = window.pageYOffset;
	const distance = targetPos - startPos;
	const duration = 500;
	let startTime = null;
	function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
	function step(currentTime) {
		if (!startTime) startTime = currentTime;
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		window.scrollTo(0, startPos + distance * ease(progress));
		if (elapsed < duration) requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			e.preventDefault();
			smoothScrollTo(target);
		}
	});
});

// ── COMPANY AUTOCOMPLETE ─────────────────────────────────────────────
const COMPANIES = [
	'BOSCH India','BOSCH Bengaluru','HAL – Hindustan Aeronautics Ltd',
	'TVS Motor Company','TVS Group','Flowserve India',
	'British Engine Pvt Ltd','GE Bell Pvt Ltd','BS Technologies',
	'Perfect Alloy Pvt Ltd','Toyota Kirloskar Motor','Wipro Infrastructure',
	'Bharat Heavy Electricals Ltd (BHEL)','Larsen & Toubro (L&T)',
	'ABB India','Siemens India','Honeywell India','3M India',
	'Caterpillar India','Cummins India','Atlas Copco India',
	'SKF India','Schaeffler India','Timken India',
	'Kirloskar Electric','Kirloskar Brothers','Elgi Equipments',
	'Greaves Cotton','Thermax India','ISRO','DRDO',
	'Indian Oil Corporation','ONGC','NTPC',
	'Tata Motors','Mahindra & Mahindra','Bajaj Auto',
	'Hero MotoCorp','Ashok Leyland','Eicher Motors',
	'Exide Industries','Amara Raja Batteries',
	'Precision Castparts','Minda Industries',
	'Motherson Sumi Systems','Varroc Engineering',
	'Sundaram Fasteners','Rane Group',
	'Pricol','Lucas TVS','Suprajit Engineering',
	'Dynamatic Technologies','Walchandnagar Industries',
	'Bharat Forge','Kalyani Group','Sandvik India',
	'Kennametal India','Seco Tools India','Iscar India',
	'DMG Mori India','Mazak India','Fanuc India',
	'Mitsubishi Electric India','Yaskawa India','Omron India',
	'Renishaw India','Hexagon Manufacturing Intelligence',
	'Haas Automation India','TRUMPF India','Bystronic India'
];

let dropdownHighlight = -1;
function companyInput() {
	const val = document.getElementById('f-company').value.trim();
	const dd = document.getElementById('company-dropdown');
	dropdownHighlight = -1;

	if (val.length < 2) { dd.innerHTML = ''; dd.classList.remove('show'); return; }
	const q = val.toLowerCase();
	const matches = COMPANIES.filter(c => c.toLowerCase().includes(q)).slice(0, 7);

	if (!matches.length) { dd.innerHTML = ''; dd.classList.remove('show'); return; }
	dd.innerHTML = matches.map((c, i) => {
		const hi = c.replace(new RegExp(`(${val.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'), '<mark>$1</mark>');
		return `<div class="company-option" data-idx="${i}" onmousedown="selectCompany('${c.replace(/'/g,"\\'")}')">🏢 ${hi}</div>`;
	}).join('');
	dd.classList.add('show');
}

function selectCompany(name) {
	document.getElementById('f-company').value = name;
	document.getElementById('company-dropdown').classList.remove('show');
}

function hideDropdownDelayed() {
	setTimeout(() => document.getElementById('company-dropdown').classList.remove('show'), 200);
}

function companyKeyNav(e) {
	const dd = document.getElementById('company-dropdown');
	const opts = dd.querySelectorAll('.company-option');
	if (!opts.length) return;
	if (e.key === 'ArrowDown') {
		e.preventDefault();
		dropdownHighlight = Math.min(dropdownHighlight + 1, opts.length - 1);
	} else if (e.key === 'ArrowUp') {
		e.preventDefault();
		dropdownHighlight = Math.max(dropdownHighlight - 1, 0);
	} else if (e.key === 'Enter' && dropdownHighlight >= 0) {
		e.preventDefault();
		selectCompany(opts[dropdownHighlight].textContent.replace('🏢 ','').trim());
		return;
	} else if (e.key === 'Escape') {
		dd.classList.remove('show'); return;
	}
	opts.forEach((o, i) => o.classList.toggle('highlighted', i === dropdownHighlight));
	if (dropdownHighlight >= 0) opts[dropdownHighlight].scrollIntoView({ block: 'nearest' });
}

// ── FIELD VALIDATORS ─────────────────────────────────────────────────
function setField(id, valid, errId, okId, iconId) {
	const el = document.getElementById(id);
	const err = document.getElementById(errId);
	const ok = okId ? document.getElementById(okId) : null;
	const icon = iconId ? document.getElementById(iconId) : null;
	if (valid === null) {
		el.classList.remove('valid','invalid');
		if (err) err.classList.remove('show');
		if (ok) ok.classList.remove('show');
		if (icon) icon.textContent = '';
		return;
	}
	el.classList.toggle('valid', valid);
	el.classList.toggle('invalid', !valid);
	if (err) err.classList.toggle('show', !valid);
	if (ok) ok.classList.toggle('show', valid);
	if (icon) icon.textContent = valid ? '✅' : '❌';
}

function validateName(blur) {
	const v = document.getElementById('f-name').value.trim();
	if (!blur && !v) return;
	setField('f-name', v.length >= 2, 'err-name', 'ok-name', 'icon-name');
	return v.length >= 2;
}

function validateEmail(blur) {
	const v = document.getElementById('f-email').value.trim();
	if (!blur && !v) return;
	const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
	setField('f-email', ok, 'err-email', 'ok-email', 'icon-email');
	return ok;
}

function formatPhone() {
	let v = document.getElementById('f-phone').value.replace(/\D/g,'');
	if (v.startsWith('91') && v.length > 10) v = v.slice(2);
	if (v.length > 10) v = v.slice(0,10);
	// Auto-format: XXXXX XXXXX
	let formatted = v;
	if (v.length > 5) formatted = v.slice(0,5) + ' ' + v.slice(5);
	document.getElementById('f-phone').value = formatted;
	if (v.length === 10) validatePhone(true);
	else setField('f-phone', null, 'err-phone', 'ok-phone', 'icon-phone');
}

function validatePhone(blur) {
	const v = document.getElementById('f-phone').value.replace(/\D/g,'');
	const digits = v.startsWith('91') ? v.slice(2) : v;
	if (!blur && !digits) return;
	const ok = /^[6-9]\d{9}$/.test(digits);
	setField('f-phone', ok, 'err-phone', 'ok-phone', 'icon-phone');
	return ok;
}

function validateService() {
	const v = document.getElementById('f-service').value;
	const ok = v !== '';
	document.getElementById('f-service').classList.toggle('valid', ok);
	document.getElementById('f-service').classList.toggle('invalid', !ok);
	document.getElementById('err-service').classList.toggle('show', !ok);
	return ok;
}

function validateMsg() {
	const v = document.getElementById('f-msg').value.trim();
	if (!v) { setField('f-msg', null, 'err-msg', null, null); return; }
	setField('f-msg', v.length >= 10, 'err-msg', null, null);
}

  // ── FORM SUBMIT WITH EMAILJS ─────────────────────────────────────────
  // ════════════════════════════════════════════════════════════════════
  //  EMAILJS SETUP — do this ONCE (takes ~5 minutes)
  //
  //  STEP 1 — Create free account
  //    → Go to https://www.emailjs.com  and sign up (use your Gmail)
  //
  //  STEP 2 — Add Email Service
  //    → Dashboard → Email Services → Add New Service
  //    → Choose Gmail → Connect your Gmail account → Save
  //    → Copy the Service ID  (looks like: service_xxxxxxx)
  //    → Paste it below as EJS_SERVICE_ID
  //
  //  STEP 3 — Create Email Template
  //    → Dashboard → Email Templates → Create New Template
  //    → Set Subject:  New Enquiry from {{from_name}} – Flow Tech System
  //    → Set Body (copy exactly):
  //    ┌──────────────────────────────────────────────────────────────┐
  //    │ New enquiry received on Flow Tech System website:            │
  //    │                                                              │
  //    │ Name:    {{from_name}}                                       │
  //    │ Company: {{company}}                                         │
  //    │ Phone:   {{phone}}                                           │
  //    │ Email:   {{from_email}}                                      │
  //    │ Service: {{service}}                                         │
  //    │                                                              │
  //    │ Message:                                                     │
  //    │ {{message}}                                                  │
  //    └──────────────────────────────────────────────────────────────┘
  //    → Save Template
  //    → Copy the Template ID  (looks like: template_xxxxxxx)
  //    → Paste it below as EJS_TEMPLATE_ID
  //
  //  STEP 4 — Get Public Key
  //    → Dashboard → Account → General → Public Key
  //    → Paste it below as EJS_PUBLIC_KEY
  //
  //  STEP 5 — Replace the 3 values below and re-upload your file.
  //           That's it! You'll receive emails at your Gmail inbox.
  //           Free plan = 200 emails/month (more than enough).
  // ════════════════════════════════════════════════════════════════════

function submitForm() {
	const n   = validateName(true);
	const e   = validateEmail(true);
	const p   = validatePhone(true);
	const s   = validateService();
	const msg = document.getElementById('f-msg').value.trim();
	const msgOk = msg.length === 0 || msg.length >= 10;
	if (!msgOk) { setField('f-msg', false, 'err-msg', null, null); }

	if (!n || !e || !p || !s || !msgOk) {
		const first = document.querySelector('.form-group input.invalid, .form-group select.invalid, .form-group textarea.invalid');
		if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
		return;
	}

	// ── Check if keys are configured ─────────────────────────────────
	if (EJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
		EJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
		EJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
		// Keys not set yet — show success message so form looks correct
		// while you're testing the design
		console.warn('EmailJS not configured yet. See setup instructions in the code.');
		showFormSuccess();
		return;
	}

	const btn = document.querySelector('.form-submit');
	btn.textContent = 'Sending…';
	btn.disabled = true;

	const templateParams = {
		from_name:  document.getElementById('f-name').value.trim(),
		company:    document.getElementById('f-company').value.trim() || '—',
		phone:      document.getElementById('f-phone').value.trim(),
		from_email: document.getElementById('f-email').value.trim(),
		service:    document.getElementById('f-service').value,
		message:    document.getElementById('f-msg').value.trim() || '—',
	};

	emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, templateParams)
	.then(() => {
		showFormSuccess();
		btn.textContent = 'Send Enquiry →';
		btn.disabled = false;
	})
	.catch((err) => {
		console.error('EmailJS error:', err);
		btn.textContent = 'Send Enquiry →';
		btn.disabled = false;
		alert('❌ Could not send your enquiry. Please call us directly at +91 77606 29336 / +91 99864 82164 or email flowtechsystem.db@gmail.com');
	});
}

function showFormSuccess() {
	document.getElementById('f-success').style.display = 'block';
	['f-name','f-company','f-phone','f-email','f-service','f-msg'].forEach(id => {
		const el = document.getElementById(id); if (el) el.value = '';
	});
	['f-name','f-email','f-phone','f-service','f-msg'].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.classList.remove('valid','invalid');
	});
	['icon-name','icon-email','icon-phone'].forEach(id => {
		const el = document.getElementById(id); if (el) el.textContent = '';
	});
	['err-name','err-email','err-phone','err-service','err-msg',
		'ok-name','ok-email','ok-phone'].forEach(id => {
		const el = document.getElementById(id); if (el) el.classList.remove('show');
	});
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
	entries.forEach(e => {
		if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
	});
}, { threshold: 0.08 });

document.querySelectorAll('.svc-card, .machine-card, .t-card, .client-pill').forEach(el => {
	el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
	el.style.transition = 'opacity .5s ease, transform .5s ease';
	observer.observe(el);
});
