# Flow Tech System - Official Website

Official corporate website for Flow Tech System, a premier industrial engineering and automation solutions provider in Bangalore, India.

## Overview

Flow Tech System specializes in:

* **CNC Machine Servicing & Retrofitting** - VMC, HMC, Turning Centres
* **Hydraulic Systems Manufacturing** - Power packs, cylinders, manifolds
* **Special Purpose Machines (SPM)** - Custom automation solutions
* **Machine Repair & Reconditioning** - Spindles, ballscrews, servo drives
* **Installation & Commissioning** - Professional setup and training
* **Annual Maintenance Contracts (AMC)** - Preventive care programs

This repository contains the fully responsive source code for the company's website built with HTML5, CSS3, and vanilla JavaScript.

## Project Structure

```text
abi-flowtech-system-website/
│
├── Templates/
│   └── index.html              # Main website file
│
├── css/
│   └── style.css               # Fully responsive styles with mobile-first approach
│
├── js/
│   └── script.js               # Interactive features & form validation
│
├── img/
│   ├── VMC_Machine.jpg
│   ├── HMC_Machine.jpg
│   ├── CNC_Turning_Machine.jpg
│   ├── Hydraulic_Power_Pack_Machine.jpg
│   ├── Hydraulic_Cylinder_Machine.jpg
│   └── SPM_Machine.jpg
│
├── README.md                    # This file
└── .git/                        # Version control
```

## Technologies & Features

### Core Tech Stack
* **HTML5** - Semantic markup with accessibility
* **CSS3** - Mobile-first responsive design with CSS Grid & Flexbox
* **JavaScript (Vanilla)** - No dependencies, pure JS for performance
* **EmailJS** - Contact form email integration

### Key Features

✅ **Fully Responsive Design**
- Desktop (1920px+), Tablet (768px-1024px), Mobile (320px-768px)
- Touch-friendly interface with 44px minimum touch targets
- Optimized hamburger menu for mobile navigation
- Smooth animations and transitions

✅ **Mobile Optimizations**
- Fixed hamburger menu navigation
- Touch-optimized form inputs (16px font to prevent auto-zoom)
- Flexible grid layouts that adapt to all screen sizes
- Mobile-first CSS approach

✅ **Contact Form**
- Real-time field validation
- Company autocomplete from preset list
- Phone number formatting (Indian format)
- EmailJS integration for email notifications
- Success/error messaging
- Form field icons for visual feedback

✅ **Performance**
- Zero external JavaScript libraries
- Optimized CSS with CSS variables
- Lazy-loading friendly image structure
- Smooth scrolling with easing functions

✅ **Accessibility**
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Touch-friendly interactive elements

## Responsive Breakpoints

| Device | Width | Features |
|--------|-------|----------|
| **Desktop** | 1025px+ | Full multi-column layouts, desktop nav |
| **Tablet** | 768px - 1024px | 2-column grids, hamburger menu active |
| **Mobile** | 600px - 768px | Single column, optimized touch targets |
| **Small Mobile** | 320px - 600px | Extra spacing, simplified layouts |

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/abi-flowtech-system-website.git
cd abi-flowtech-system-website
```

### 2. Open in Browser
Simply open `Templates/index.html` in any modern browser:
```bash
# Mac
open Templates/index.html

# Windows
start Templates/index.html

# Linux
xdg-open Templates/index.html
```

### 3. ConfigureEmailJS (Optional - for form submissions)
1. Create account at [emailjs.com](https://www.emailjs.com)
2. Follow the setup instructions in `Templates/index.html` (lines 12-18)
3. Replace: `EJS_PUBLIC_KEY`, `EJS_SERVICE_ID`, `EJS_TEMPLATE_ID`

## Mobile Testing Checklist

### Browser DevTools
- [ ] Open `F12` → Responsive Design Mode (`Ctrl+Shift+M`)
- [ ] Test viewports: 480×800, 375×667, 768×1024, 1920×1080
- [ ] Check hamburger menu (toggle on mobile viewports)
- [ ] Verify contact form responsiveness

### Real Devices
- [ ] iPhone 12/13/14 (375px width)
- [ ] Samsung Galaxy S21 (360px width)
- [ ] iPad/Tablet (768px width+)
- [ ] Desktop (1920px+)

### Key Tests
- ✅ Navigation hamburger menu opens/closes properly
- ✅ Contact form inputs are touch-friendly
- ✅ No horizontal scrolling on any device
- ✅ Images and text scale appropriately
- ✅ Buttons have minimum 44px height for touch
- ✅ Form validation shows/hides errors on mobile
- ✅ All sections visible and readable at each breakpoint

## File Descriptions

### Templates/index.html
- Main website file with all sections
- Includes inline SVG logo
- Contact form with validation
- Google Maps embed
- EmailJS integration

### css/style.css
- Comprehensive responsive design
- Mobile-first approach
- 5 responsive breakpoints
- Custom CSS variables
- Touch-optimized components
- Form validation feedback styles
- Mobile menu animations
- Hamburger menu styling

### js/script.js
- Hamburger menu toggle logic
- Contact form validation (name, email, phone)
- Company autocomplete functionality
- Email form submission via EmailJS
- Smooth scroll navigation
- Active navigation highlighting
- Scroll-reveal animations

## Contact Information

**Flow Tech System**
- 📍 Location: Karihobanahalli, Bangalore 560058, India
- 📞 Phone: +91 77606 29336 | +91 99864 82164
- 📧 Email: flowtechsystem.db@gmail.com
- 🏛️ GSTIN: 29AHQPD4588B1Z3
- ⏰ Working Hours: Mon-Sat 9:00 AM – 6:30 PM

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Latest 2 versions |
| Firefox | ✅ Full | Latest 2 versions |
| Safari | ✅ Full | iOS 12+ |
| Edge | ✅ Full | Latest version |
| IE 11 | ⚠️ Partial | Basic functionality |

## Recent Improvements (v2.0)

✅ **Enhanced Mobile Responsiveness**
- Fixed hamburger menu click/touch handling
- Improved contact form layout for mobile
- Better form input sizing (prevents auto-zoom)
- Optimized spacing and padding across all breakpoints
- Added extra-small device support (380px and below)

✅ **Bug Fixes**
- Fixed mobile menu not closing on link click
- Improved form validation feedback visibility
- Better keyboard navigation support
- Added Escape key handler for mobile menu

✅ **Performance**
- Optimized CSS media queries
- Reduced repaints on scroll
- Smooth hamburger menu animations

## Troubleshooting

### Mobile Menu Not Opening?
- Ensure JavaScript is enabled
- Check browser console for errors
- Try different mobile browsers
- Clear browser cache (`Ctrl+Shift+Delete`)

### Contact Form Not Working?
- Verify EmailJS configuration in HTML
- Check browser console for API errors
- Ensure all form fields are filled correctly
- Test with valid Indian phone number format

### Forms Look Wrong on Mobile?
- Check viewport meta tag in HTML head
- Ensure font-size is 16px+ on inputs (prevents auto-zoom)
- Clear browser zoom settings (`Ctrl+0`)

##Author & License

**Author:** Flow Tech System
**Year:** 2024-2026
**License:** © Flow Tech System. All Rights Reserved.

---

**Last Updated:** June 2026
**Maintained By:** Development Team
**Repository:** Private (Contact for access)

