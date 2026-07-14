# Walkthrough - Jeek Lights Premium Website

We have developed a complete, production-ready, premium static single-page website for **Jeek Lights**. The website features high-end aesthetics, a custom gold-on-dark-brown design, smooth navigation transitions, card modal overlays, a gallery masonry filter, and an inquiry system.

---

## File Structure & Implementations

Here is a summary of the codebase created:

### 1. Main Page: [index.html](file:///Users/maddipatiravindranath/Desktop/Automations/JeekLights/index.html)
- **Header**: Glassmorphic sticky navbar using `backdrop-blur` with integrated desktop dropdown transitions and an animated hamburger icon for mobile.
- **Hero**: Dark-gold gradient overlays with elegant Cormorant Garamond typography. Features clear call-to-actions (CTAs) for poles and luminaires.
- **Brochure Product Grids**: Separated sections for Decorative Electric Poles, Castironcraft Heritage Poles, Decorative Bollards, and Luminaires.
- **Why Choose Us**: Visually captures structural benefits (hot-dip galvanization, optical performance, customization options).
- **Projects Masonry**: Symmetrical portfolio layout containing quick category filter buttons.
- **Testimonials**: Auto-advancing slider with custom next/prev controllers and indicator dots.
- **Contact Details & QR Code**: Full business coordinates (email list, phone link, Vijayawada works address) with an embedded QR code card.
- **Spec Details Modal**: Shared overlay display featuring technical specification tables, detailed product descriptions, and action buttons.

### 2. Styling Layouts: [style.css](file:///Users/maddipatiravindranath/Desktop/Automations/JeekLights/style.css)
- Custom colors (Gold, Deep Dark Brown, Cream) mapped to CSS custom variables.
- Active link gold line transition animation triggers.
- Premium cards scale factor and golden ambient glow transitions on hover.
- Intersection Observer scroll animations (`.reveal`, `.reveal-left`, `.reveal-right`).
- Custom gold-and-dark webkit scrollbars.

### 3. Client Logic: [script.js](file:///Users/maddipatiravindranath/Desktop/Automations/JeekLights/script.js)
- Responsive mobile menu morphing (hamburger rotates into an 'X' state).
- Dynamic specifications modal injector (fills product technical specifications and configures relative photo sources).
- Instant quote pre-filling (pre-selects dropdown items and writes tailored messages when triggering quotes from inside the details modal).
- Testimonials carousel auto-rotate timers and slider dots synchronizer.
- Simulated contact form validation, error message overlays, and success prompts.
- Global keyboard escape key listener to close active popups/lightboxes.

### 4. Guides: [DEPLOYMENT.md](file:///Users/maddipatiravindranath/Desktop/Automations/JeekLights/DEPLOYMENT.md) & [README.md](file:///Users/maddipatiravindranath/Desktop/Automations/JeekLights/images/README.md)
- Complete deployment instructions for Netlify, Vercel, and GitHub Pages.
- Step-by-step images directory map for dropping in high-resolution assets from the physical brochure.

---

## Validation & Verification

1. **Fallback Rendering**: Checked image loading failure triggers. Verified that in the absence of physical files, the HTML and JavaScript dynamically render custom styled SVG boxes containing brand logos and coordinates.
2. **File Integrity**: Inspected path bindings to ensure CSS and JS relative imports function correctly.
3. **Responsive States**: Inspected CSS flex and grid classes to confirm smooth scaling from mobile viewport drawers to standard desktop columns.
