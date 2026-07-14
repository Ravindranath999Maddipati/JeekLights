# Implementation Plan - Jeek Lights Premium Static Website

Create a premium, high-performance static website for **Jeek Lights** following the strict design brochure requirements. It will feature custom scroll animations, interactive dropdowns, a product modal system, a contact form, and structured content.

## User Review Required

> [!IMPORTANT]
> The website will require product images, a logo, and a QR code from the brochure. In the initial layout, we will configure clean placeholders and detailed inline documentation describing the recommended dimensions and style of these images. We'll also structure directory folders so that adding these assets is a simple drop-in replacement.

## Proposed Changes

### Directory Structure

We will create a structured directory within the workspace:
- `/images/` for general assets (logo, QR code)
- `/images/hero/` for hero backgrounds
- `/images/products/` for catalog items
- `index.html` (main structural layout)
- `style.css` (custom styling, typography, animations, Tailwind overlays)
- `script.js` (interactivity, Intersection Observer, modal, testimonials carousel, navbar toggles)

---

### Core Components

#### 1. Styling & Theme (`style.css`)
- Define premium color CSS variables:
  - Primary Gold: `#D4AF37` / `#C9A227`
  - Dark Brown Accent: `#2C1F14` / `#1F160F`
  - Cream Background: `#FAF6F0` / `#F5EDE4`
  - Dark Text: `#1A120B`
- Import Google Fonts:
  - Headings: **Cormorant Garamond** (Serif)
  - Body: **Inter** (Sans-serif)
- Implement custom styling for animations:
  - Scroll fade-in/slide-up effects (`.reveal` class)
  - Golden radial glow for interactive hover states
  - Smooth scale and translate transformations for cards
  - Glassmorphic details using backdrop-filter
  - Soft scroll-behavior

#### 2. Main Page Layout (`index.html`)
- **Semantic Navbar**:
  - Golden Logo + "Jeek Lights" branding
  - Responsive desktop menu (Sticky, background blur, subtle gold underline indicator)
  - Dropdowns for **Poles** (Decorative Poles, Castironcraft)
  - Hamburger icon with transitions to 'X' state on mobile
- **Hero Section**:
  - Full-screen container with subtle parallax effect
  - Layout mimicking the first brochure page: Left/center text layout with deep dark brown overlap, golden highlights, and the Budhha + modern pole visual background.
  - Distinct CTA buttons: "Explore Poles", "View Luminaires", "Get a Quote"
- **About Us Section**:
  - Storytelling layout combining modern typography with high-contrast text layout
  - Focus on values: Elegance, Strength, and Innovation
- **Products Catalog Sections**:
  - **Poles Section** (Decorative & Castironcraft)
  - **Bollards Section**
  - **Luminaires Section**
  - Interactive grid elements: Hover-activated overlay card displaying specifications, with a click action to trigger an details modal.
- **Why Jeek Lights Section**:
  - Core differentiators highlighting heritage + modern design, durability, and customization.
- **Gallery / Projects**:
  - Masonry grid showing different products in real-world scenarios.
- **Testimonials Carousel**:
  - Premium testimonial cards with touch/click control indicators, automatic transitions, and elegant fade styling.
- **Contact Us Section**:
  - Grid splitting:
    - Interactive AJAX-ready inquiry form
    - Business details (address, email list, telephone, website link)
    - Golden QR Code container
- **Footer**:
  - Symmetrical grid with sitemap, contact link icons, socials, and copyright.

#### 3. Client Logic (`script.js`)
- Mobile Navigation hamburger toggle logic.
- Desktop dropdown overlay mouse-listeners.
- **Intersection Observer** implementation for lightweight scroll-driven fade-ins.
- **Interactive Lightbox Modal** for high-resolution product inspection:
  - Close button and click-outside dismissal
  - ARIA attributes for keyboard accessibility (ESC key support)
- **Carousel Component**:
  - Smooth touch/click indicators & loop functionality.

---

## Verification Plan

### Automated & Manual Verification
1. **Responsive Testing**:
   - Inspect layout on multiple dimensions (mobile, tablet, ultra-wide desktop) in chrome/safari.
2. **Visual Audit**:
   - Check contrast ratios for dark text on cream, gold accents, and white text on dark brown backgrounds.
   - Verify hover glows and scale factors.
3. **Behavioral Testing**:
   - Modal triggers (ESC key press close, backdrop click close).
   - Mobile navbar expansion/collapsing.
   - Smooth scroll from CTAs to target sections.
   - Slide functionality in the testimonial carousel.
4. **Performance Check**:
   - Verify script loads asynchronously or at the end of body.
   - Check CSS files are clean and render-blocking is minimized.
