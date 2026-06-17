document.addEventListener('DOMContentLoaded', () => {

	// ── 1. SCROLL SPY FUNCTIONALITY (NAV HIGHLIGHTING) ──
	const navSections = document.querySelectorAll('section[id]');
	const desktopNavLinks = document.querySelectorAll('.nav-links a');
	const mobileNavLinks = document.querySelectorAll('.mobile-menu a');

	function scrollSpy() {
		const scrollY = window.pageYOffset;

		navSections.forEach(current => {
			const sectionHeight = current.offsetHeight;
			// Triggers active change slightly before section reaches the top border edge
			const sectionTop = current.offsetTop - 120;
			const sectionId = current.getAttribute('id');

			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				// Highlight Desktop Nav
				desktopNavLinks.forEach(link => {
				link.classList.remove('active');
				if (link.getAttribute('href') === `#${sectionId}`) {
					link.classList.add('active');
				}
				});
				// Highlight Mobile Nav
				mobileNavLinks.forEach(link => {
				link.classList.remove('active');
				if (link.getAttribute('href') === `#${sectionId}`) {
					link.classList.add('active');
				}
				});
			}
		});
	}
	window.addEventListener('scroll', scrollSpy);
	scrollSpy(); // Run initialization instantly

	// ── 2. MOBILE HAMBURGER MENU INTERACTION ──
	const hamburger = document.getElementById('hamburger');
	const mobileMenu = document.getElementById('mobileMenu');

	if (hamburger && mobileMenu) {
		function toggleMenu(e) {
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
			hamburger.classList.toggle('open');
			mobileMenu.classList.toggle('open');
		}
		hamburger.onclick = toggleMenu;

		// Auto-close drawer interface panel when navigating links
		mobileMenu.querySelectorAll('a').forEach(a => {
			a.addEventListener('click', () => {
				hamburger.classList.remove('open');
				mobileMenu.classList.remove('open');
			});
		});
	}

	// ── 3. FORM VALIDATION & EMAILJS SUBMISSION ──
	const form = document.getElementById('rfqForm');
	const successMsg = document.getElementById('formSuccess');
	const submitBtn = document.getElementById('submitBtn');

	const fields = {
		name: {
			el: document.getElementById('c_name'),
			err: document.getElementById('err-name'),
			ok: document.getElementById('ok-name'),
			validate: v => v.trim().length >= 2
		},
		email: {
			el: document.getElementById('c_email'),
			err: document.getElementById('err-email'),
			ok: document.getElementById('ok-email'),
			validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
		},
		phone: {
			el: document.getElementById('c_phone'),
			err: document.getElementById('err-phone'),
			ok: document.getElementById('ok-phone'),
			validate: v => /^\d{10}$/.test(v.trim().replace(/[- )()]/g, ''))
		},
		service: {
			el: document.getElementById('c_service'),
			err: document.getElementById('err-service'),
			ok: null,
			validate: v => v !== ''
		},
		msg: {
			el: document.getElementById('c_msg'),
			err: document.getElementById('err-msg'),
			ok: null,
			validate: v => v.trim().length >= 10
		}
	};

	function validateField(key) {
		const f = fields[key];
		if (!f.el) return true;
		const val = f.el.value;
		const isValid = f.validate(val);
		if (!isValid) {
			f.el.classList.add('invalid');
			f.el.classList.remove('valid');
			if (f.err) f.err.classList.add('show');
			if (f.ok) f.ok.classList.remove('show');
		} else {
			f.el.classList.remove('invalid');
			f.el.classList.add('valid');
			if (f.err) f.err.classList.remove('show');
			if (f.ok) f.ok.classList.add('show');
		}
		return isValid;
	}

	Object.keys(fields).forEach(key => {
		if (fields[key].el) {
			fields[key].el.addEventListener('input', () => validateField(key));
			if (key === 'service') fields[key].el.addEventListener('change', () => validateField(key));
		}
	});

	// ── 5. FORM SUBMIT EXECUTION ──
	if (form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			let formValid = true;
			Object.keys(fields).forEach(key => {
				if (!validateField(key)) formValid = false;
			});
			if (!formValid) return;

			submitBtn.disabled = true;
			submitBtn.innerText = 'Sending Request...';

			const params = {
				from_name: fields.name.el.value,
				reply_to: fields.email.el.value,
				phone_num: fields.phone.el.value,
				company_name: compInput ? compInput.value : 'Not Provided',
				service_type: fields.service.el.value,
				message_details: fields.msg.el.value
			};

			emailjs.send('service_5oyrxob', 'template_ycj9adl', params)
				.then(() => {
				successMsg.style.display = 'block';
				form.reset();
				submitBtn.innerText = 'Send Request';
				submitBtn.disabled = false;
				['ok-name', 'ok-email', 'ok-phone'].forEach(id => {
					const el = document.getElementById(id);
					if (el) el.classList.remove('show');
				});
				})
				.catch((err) => {
				alert('Failed to send inquiry. Please email directly.');
				submitBtn.disabled = false;
				submitBtn.innerText = 'Send Request';
				});
		});
	}

	// ── 5. FORM SUBMIT EXECUTION INTO EXCEL ──
	if (form) {

		form.addEventListener('submit', async function (e) {

			e.preventDefault();

			let formValid = true;

			Object.keys(fields).forEach(key => {
				if (!validateField(key)) {
					formValid = false;
				}
			});

			if (!formValid) return;

			submitBtn.disabled = true;
			submitBtn.innerText = 'Sending Request...';

			const formData = new FormData();

			formData.append('name', fields.name.el.value);
			formData.append('company', document.getElementById('c_company').value || '');
			formData.append('phone', fields.phone.el.value);
			formData.append('email', fields.email.el.value);
			formData.append('service', fields.service.el.value);
			formData.append('message', fields.msg.el.value);

			// Debugging
			for (const pair of formData.entries()) {
				console.log(pair[0] + ': ' + pair[1]);
			}

			try {

				await fetch(
					'https://script.google.com/macros/s/AKfycbyvugvUgiOqmnonubmSUAASHvNanQAUVHwQBYeDIAFQ_z_TWgKjoGvzk_o9syu_L4-b/exec',
					{
						method: 'POST',
						body: formData,
						mode: 'no-cors'
					}
				);

				console.log('Form submitted successfully');

				successMsg.style.display = 'block';

				form.reset();

				document.querySelectorAll('.valid').forEach(el => {
					el.classList.remove('valid');
				});

				document.querySelectorAll('.show').forEach(el => {
					el.classList.remove('show');
				});

			} catch (error) {

				console.error('Submission Error:', error);
				alert('Failed to submit enquiry.');

			} finally {

				submitBtn.disabled = false;
				submitBtn.innerText = 'Send Enquiry →';

			}
		});
	}

	// ── 6. INTERSECTION OBSERVER ANIMATION ──
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(e => {
			if (e.isIntersecting) {
				e.target.style.opacity = '1';
				e.target.style.transform = 'translateY(0)';
			}
		});
	}, {
		threshold: 0.05
	});
	document.querySelectorAll('.svc-card, .machine-card, .t-card, .client-pill').forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(20px)';
		el.style.transition = 'opacity .5s ease, transform .5s ease';
		observer.observe(el);
	});
});

// ── TESTIMONIAL DYNAMIC CRAWL AND ARROW OVERRIDE MOTOR SCRIPT ──
document.addEventListener("DOMContentLoaded", function () {
	const track = document.getElementById("testimonialTrack");
	const prevBtn = document.getElementById("prevTestimonial");
	const nextBtn = document.getElementById("nextTestimonial");

	if (!track || !prevBtn || !nextBtn) return;

	let currentManualOffset = 0;
	let isTransitioning = false;

	// Calculates shift adjustments matching exactly 1 card + gap margin widths
	function getShiftDistance() {
		const card = track.querySelector(".t-card");
		if (!card) return 320;
		const style = window.getComputedStyle(track);
		const gap = parseFloat(style.gap) || 24;
		return card.offsetWidth + gap;
	}

	function applyManualShift(direction) {
		if (isTransitioning) return;
		isTransitioning = true;

		// Temporarily pause the CSS animation track loop to shift positions cleanly
		track.classList.remove("dynamic-motion-loop");

		// Get the current real-time transformation matrix translation point values
		const currentStyle = window.getComputedStyle(track);
		const matrix = currentStyle.transform || currentStyle.webkitTransform;
		let currentX = 0;

		if (matrix && matrix !== "none") {
			const parts = matrix.split('(')[1].split(')')[0].split(',');
			currentX = parseFloat(parts[4]) || 0;
		}

		const shiftDistance = getShiftDistance();
		let targetX = direction === "next" ? currentX - shiftDistance : currentX + shiftDistance;

		// Boundary Control Handlers: Prevent blank space gaps by wrapping shifts within half-track boundaries
		const halfWidth = track.scrollWidth / 2;
		if (Math.abs(targetX) >= halfWidth) {
			targetX = 0;
		} else if (targetX > 0) {
			targetX = -halfWidth + shiftDistance;
		}

		// Apply fluid structural shifts
		track.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
		track.style.transform = `translate3d(${targetX}px, 0, 0)`;

		// Gracefully re-engage continuous auto-crawling animation loop right after shifting
		setTimeout(() => {
			track.style.transition = "none";
			track.classList.add("dynamic-motion-loop");
			isTransitioning = false;
		}, 450);
	}

	// Click Action Handlers for Desktop & Mobile
	nextBtn.addEventListener("click", function (e) {
		e.preventDefault();
		applyManualShift("next");
	});

	prevBtn.addEventListener("click", function (e) {
		e.preventDefault();
		applyManualShift("prev");
	});
});

// ── BALANCED SCROLL SECTION NAVIGATION TRACKER ──
document.addEventListener("DOMContentLoaded", function () {
	const navLinks = document.querySelectorAll(".nav-links a");
	const sections = document.querySelectorAll("section[id], header[id]");

	// Configuration thresholds: offsets the viewport to account for sticky nav bars
	const observerOptions = {
		root: null,
		rootMargin: "-20% 0px -40% 0px", // Focus tracking lens within center of the screen
		threshold: 0.15 // Triggers when 15% of target section cuts into lens space
	};

	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const activeId = entry.target.getAttribute("id");

				navLinks.forEach((link) => {
				// Extracts link hash reference values dynamically
				const linkTargetId = link.getAttribute("href").replace("#", "");

				if (linkTargetId === activeId) {
					link.classList.add("active");
				} else {
					link.classList.remove("active");
				}
				});
			}
		});
	}, observerOptions);

	// Link target elements into observing tracking system matrix
	sections.forEach((section) => sectionObserver.observe(section));

	// FALLBACK CORRECTION: Explicitly forces Contact menu highlight if scrolled straight to page bottom
	window.addEventListener("scroll", () => {
		if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
			const contactLink = document.querySelector('.nav-links a[href*="contact"]');
			if (contactLink) {
				navLinks.forEach(link => link.classList.remove("active"));
				contactLink.classList.add("active");
			}
		}
	});
});

// ── COMPANY AUTOCOMPLETE ENGINE ──
(function() {
    // 1. Unified Dataset Array (Combines local industrial leaders with api fallbacks)
    let COMPANIES = [
        'BOSCH India', 'BOSCH Bengaluru', 'HAL – Hindustan Aeronautics Ltd',
        'TVS Motor Company', 'TVS Group', 'Flowserve India',
        'British Engine Pvt Ltd', 'GE Bell Pvt Ltd', 'BS Technologies',
        'Perfect Alloy Pvt Ltd', 'Toyota Kirloskar Motor', 'Wipro Infrastructure',
        'Bharat Heavy Electricals Ltd (BHEL)', 'Larsen & Toubro (L&T)',
        'ABB India', 'Siemens India', 'Honeywell India', '3M India',
        'Caterpillar India', 'Cummins India', 'Atlas Copco India',
        'SKF India', 'Schaeffler India', 'Timken India',
        'Kirloskar Electric', 'Kirloskar Brothers', 'Elgi Equipments',
        'Greaves Cotton', 'Thermax India', 'ISRO', 'DRDO',
        'Indian Oil Corporation', 'ONGC', 'NTPC',
        'Tata Motors', 'Mahindra & Mahindra', 'Bajaj Auto',
        'Hero MotoCorp', 'Ashok Leyland', 'Eicher Motors',
        'Exide Industries', 'Amara Raja Batteries',
        'Precision Castparts', 'Minda Industries',
        'Motherson Sumi Systems', 'Varroc Engineering',
        'Sundaram Fasteners', 'Rane Group',
        'Pricol', 'Lucas TVS', 'Suprajit Engineering',
        'Dynamatic Technologies', 'Walchandnagar Industries',
        'Bharat Forge', 'Kalyani Group', 'Sandvik India',
        'Kennametal India', 'Seco Tools India', 'Iscar India',
        'DMG Mori India', 'Mazak India', 'Fanuc India',
        'Mitsubishi Electric India', 'Yaskawa India', 'Omron India',
        'Renishaw India', 'Hexagon Manufacturing Intelligence',
        'Haas Automation India', 'TRUMPF India', 'Bystronic India'
    ];

    let dropdownHighlight = -1;

    // Global callback function to handle selection clicks securely
    window.selectCompany = function (name) {
        const compInput = document.getElementById('c_company');
        const dd = document.getElementById('companyDropdown');
        if (compInput) compInput.value = name;
        if (dd) {
            dd.innerHTML = '';
            dd.classList.remove('show');
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        const compInput = document.getElementById('c_company');
        const dd = document.getElementById('companyDropdown');

        if (!compInput || !dd) return;

        // 2. ASYNC BACKGROUND DATA INTEGRATION
        // Fetches an open-source database list to enrich suggestions silently on load
        fetch('https://raw.githubusercontent.com/tomekdev/company-list/master/companies.json')
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                if(data.length) {
                    const extraCompanies = data.map(item => item.name || item).filter(Boolean);
                    // Merge datasets uniquely without duplicates
                    COMPANIES = [...new Set([...COMPANIES, ...extraCompanies])];
                }
            })
            .catch(() => console.log("Autocomplete loading system running local data index seamlessly."));

        // 3. EVENT: INPUT DETECTION & REGEX FILTER
        compInput.addEventListener('input', function () {
            const val = compInput.value.trim();
            dropdownHighlight = -1;

            // Needs 2 characters minimum to display panel suggestions matching design system layouts
            if (val.length < 2) {
                dd.innerHTML = '';
                dd.classList.remove('show');
                return;
            }

            const q = val.toLowerCase();
            const matches = COMPANIES.filter(c => c && c.toLowerCase().includes(q)).slice(0, 8);

            if (!matches.length) {
                dd.innerHTML = '';
                dd.classList.remove('show');
                return;
            }

            dd.innerHTML = matches.map((c, i) => {
                const escapedVal = val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const hi = c.replace(new RegExp(`(${escapedVal})`, 'gi'), '<mark>$1</mark>');
                const safeName = c.replace(/'/g, "\\'").replace(/"/g, '&quot;');

                return `<div class="company-option" data-idx="${i}" onmousedown="window.selectCompany('${safeName}')">${hi}</div>`;
            }).join('');

            dd.classList.add('show');
        });

        // 4. EVENT: KEYBOARD ACCESSIBILITY CONTROLS
        compInput.addEventListener('keydown', function (e) {
            const opts = dd.querySelectorAll('.company-option');
            if (!opts.length || !dd.classList.contains('show')) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                dropdownHighlight = Math.min(dropdownHighlight + 1, opts.length - 1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                dropdownHighlight = Math.max(dropdownHighlight - 1, 0);
            } else if (e.key === 'Enter' && dropdownHighlight >= 0) {
                e.preventDefault();
                window.selectCompany(opts[dropdownHighlight].textContent.trim());
                return;
            } else if (e.key === 'Escape') {
                dd.classList.remove('show');
                return;
            }

            opts.forEach((o, i) => o.classList.toggle('highlighted', i === dropdownHighlight));
            if (dropdownHighlight >= 0) {
                opts[dropdownHighlight].scrollIntoView({ block: 'nearest' });
            }
        });

        // 5. EVENT: BLUR FOCUS DEFENSE
        // Allows clicks to pass to onmousedown rows before closing panel view limits
        compInput.addEventListener('blur', function () {
            setTimeout(() => dd.classList.remove('show'), 220);
        });
    });
})();

// Toggle Popup
function toggleWaPopup() {
    const overlay = document.getElementById('waPopupOverlay');
    overlay.style.display = (overlay.style.display === 'flex') ? 'none' : 'flex';
}

// WhatsApp Redirect
function sendToWhatsApp() {
    // 1. Your official company WhatsApp number
    const companyNumber = "917760629336"; 
    
    // 2. Get the message from the textarea
    const msg = document.getElementById('waMessageInput').value;
    
    // 3. Optional: Get user's name/number if you want to include it IN the message body
    const userPhone = document.getElementById('waPhoneInput').value;
    
    // 4. Construct a professional message format
    // This includes the user's details inside the message sent TO you
    const fullMessage = `Hello, I have an enquiry.\n\nMessage: ${msg}\nFrom Number: ${userPhone}`;
    
    // 5. Redirect to your number with the pre-filled message
    const url = `https://wa.me/${companyNumber}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(url, '_blank');
    
    // Close modal after sending
    toggleWaPopup();
}

// Function to enable dragging on any element
function makeDraggable(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const startDrag = (e) => {
        isDragging = true;
        // Use clientX/Y for mouse, touches[0] for touchscreens
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        startX = clientX;
        startY = clientY;
        initialLeft = el.offsetLeft;
        initialTop = el.offsetTop;
    };

    const drag = (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevents page scrolling while dragging
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        el.style.left = (initialLeft + (clientX - startX)) + 'px';
        el.style.top = (initialTop + (clientY - startY)) + 'px';
        el.style.right = 'auto'; 
        el.style.bottom = 'auto';
    };

    const stopDrag = () => { isDragging = false; };

    // Mouse Events
    el.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    // Touch Events (Essential for Mobile)
    el.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', stopDrag);
}

// Initialize dragging for both buttons
makeDraggable('draggable-call-btn');
makeDraggable('whatsappFloat');
