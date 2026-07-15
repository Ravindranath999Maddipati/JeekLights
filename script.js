/**
 * JEEK LIGHTS - Premium Interactive Client Engine
 * Handles navigation states, scroll revelations, carousel, product spec modals, and form inquiries.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollspy();
  initIntersectionObserver();
  initHeroParallax();
  initTestimonialCarousel();
  initKeyboardListeners();
});

/* --- Header Scroll Effects --- */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('py-2', 'shadow-2xl');
      header.classList.remove('shadow-lg');
    } else {
      header.classList.remove('py-2', 'shadow-2xl');
      header.classList.add('shadow-lg');
    }
  });
}

/* --- Mobile Navigation Hamburger Toggles --- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const polesToggle = document.getElementById('mobile-poles-toggle');
  const polesSubmenu = document.getElementById('mobile-poles-submenu');
  const polesArrow = document.getElementById('mobile-poles-arrow');

  if (!toggleBtn || !mobileMenu) return;

  // Toggle mobile drawer
  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('open');
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile drawer on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('open');
      mobileMenu.classList.add('hidden');
    });
  });

  // Mobile submenu accordion toggler for Poles
  if (polesToggle && polesSubmenu && polesArrow) {
    polesToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = polesSubmenu.classList.contains('hidden');
      if (isHidden) {
        polesSubmenu.classList.remove('hidden');
        polesArrow.classList.add('rotate-180');
      } else {
        polesSubmenu.classList.add('hidden');
        polesArrow.classList.remove('rotate-180');
      }
    });
  }
}

/* --- Active Link Highlight scroll spy --- */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200; // Offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Special fallback for top of the page
    if (window.scrollY < 100) {
      currentSectionId = 'home';
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      // Highlight direct matches
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }

      // Special handling if section is poles-decorative or poles-castiron, highlight "Poles" parent link
      if (link.textContent.trim().toLowerCase() === 'poles' && 
          (currentSectionId === 'poles-decorative' || currentSectionId === 'poles-castiron')) {
        link.classList.add('active');
      }
    });
  });
}

/* --- Intersection Observer for Scroll Reveals --- */
function initIntersectionObserver() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

/* --- Hero Parallax Scroll Helper --- */
function initHeroParallax() {
  const parallaxBg = document.getElementById('hero-parallax-bg');
  if (!parallaxBg) return;

  window.addEventListener('scroll', () => {
    const scrollOffset = window.scrollY;
    // Limit translation slightly to keep within viewport bounds
    parallaxBg.style.transform = `translateY(${scrollOffset * 0.4}px)`;
  });
}

/* --- Testimonial Carousel System --- */
let currentCarouselIndex = 0;
let carouselTimer = null;

function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  if (slides.length === 0) return;

  // Start auto play
  startCarouselTimer();
  updateCarouselState();
}

function startCarouselTimer() {
  stopCarouselTimer();
  carouselTimer = setInterval(() => {
    nextCarouselSlide();
  }, 6000); // Shift slides every 6 seconds
}

function stopCarouselTimer() {
  if (carouselTimer) {
    clearInterval(carouselTimer);
    carouselTimer = null;
  }
}

function updateCarouselState() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');

  slides.forEach((slide, index) => {
    if (index === currentCarouselIndex) {
      slide.classList.remove('opacity-0', 'pointer-events-none');
      slide.classList.add('opacity-100');
    } else {
      slide.classList.add('opacity-0', 'pointer-events-none');
      slide.classList.remove('opacity-100');
    }
  });

  dots.forEach((dot, index) => {
    if (index === currentCarouselIndex) {
      dot.classList.remove('bg-gray-300', 'hover:bg-gold/50');
      dot.classList.add('bg-gold');
    } else {
      dot.classList.add('bg-gray-300', 'hover:bg-gold/50');
      dot.classList.remove('bg-gold');
    }
  });
}

window.setCarouselSlide = function(index) {
  currentCarouselIndex = index;
  updateCarouselState();
  startCarouselTimer(); // Reset auto timer
};

window.nextCarouselSlide = function() {
  const slides = document.querySelectorAll('.testimonial-slide');
  currentCarouselIndex = (currentCarouselIndex + 1) % slides.length;
  updateCarouselState();
  startCarouselTimer();
};

window.prevCarouselSlide = function() {
  const slides = document.querySelectorAll('.testimonial-slide');
  currentCarouselIndex = (currentCarouselIndex - 1 + slides.length) % slides.length;
  updateCarouselState();
  startCarouselTimer();
};

/* --- Product Detail Modal triggers --- */
window.openProductModal = function(title, imageKey, category, descMain, descSub, application, height, material, finish, electrical) {
  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;

  // Set Modal Data
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-product-category').textContent = category;
  document.getElementById('modal-description-main').textContent = descMain;
  document.getElementById('modal-description-sub').textContent = descSub;
  
  // Set Technical Specifications
  document.getElementById('modal-spec-app').textContent = application;
  document.getElementById('modal-spec-height').textContent = height;
  document.getElementById('modal-spec-material').textContent = material;
  document.getElementById('modal-spec-finish').textContent = finish;
  document.getElementById('modal-spec-electrical').textContent = electrical;

  // Set Product Image path (handles direct paths and placeholder formats smoothly)
  const productImg = document.getElementById('modal-product-image');
  if (productImg) {
    productImg.alt = `${title} view specs`;
    // Attach error fallback directly in case physical files don't exist yet (set before src to avoid race conditions)
    productImg.onerror = function() {
      this.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect fill="%231F160F" width="300" height="400"/><text fill="%23D4AF37" font-family="Playfair Display, serif" font-size="20" font-weight="bold" x="50%" y="45%" text-anchor="middle">JEEK LIGHTS</text><text fill="%23FFFFFF" font-family="sans-serif" font-size="12" x="50%" y="55%" text-anchor="middle">Brochure Photo Grid</text></svg>';
    };
    if (imageKey.startsWith('./') || imageKey.startsWith('/') || imageKey.includes('.')) {
      productImg.src = imageKey;
    } else {
      productImg.src = `./images/products/${imageKey}.jpg`;
    }
  }

  // Show Modal
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden'); // Lock background scroll
};

window.closeProductModal = function() {
  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
};

window.requestQuoteFromModal = function() {
  const modalCategory = document.getElementById('modal-product-category').textContent.trim().toLowerCase();
  const modalTitle = document.getElementById('modal-title').textContent;
  
  closeProductModal();

  // Scroll to contact form
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView();
  }

  // Pre-fill form dropdown and message
  const selectElement = document.getElementById('form-interest');
  const messageElement = document.getElementById('form-message');

  if (selectElement) {
    // Attempt match with dropdown values
    if (modalCategory.includes('heritage') || modalCategory.includes('cast')) {
      selectElement.value = 'cast-iron-poles';
    } else if (modalCategory.includes('electric') || modalCategory.includes('decorative pole')) {
      selectElement.value = 'decorative-poles';
    } else if (modalCategory.includes('bollard')) {
      selectElement.value = 'bollards';
    } else if (modalCategory.includes('luminaire')) {
      selectElement.value = 'luminaires';
    } else {
      selectElement.value = 'general-project';
    }
  }

  if (messageElement) {
    messageElement.value = `I am interested in requesting pricing and customization details for the: "${modalTitle}". Please provide raw material details, delivery timelines to our site, and scale discounts.`;
    messageElement.focus();
  }
};

/* --- Gallery Filter Actions --- */
window.filterGallery = function(category) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.gallery-filter-btn');

  // Sync active states on filter buttons
  buttons.forEach(btn => {
    const isClicked = btn.getAttribute('onclick').includes(`'${category}'`);
    if (isClicked) {
      btn.classList.add('border-gold', 'text-gold', 'bg-accent-light');
      btn.classList.remove('border-white/20', 'text-white');
    } else {
      btn.classList.remove('border-gold', 'text-gold', 'bg-accent-light');
      btn.classList.add('border-white/20', 'text-white');
    }
  });

  // Filter items in grid
  items.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      item.classList.remove('hidden');
      // Subtle entry trigger
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, 10);
    } else {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.9)';
      // Add hidden after transition
      setTimeout(() => {
        item.classList.add('hidden');
      }, 300);
    }
  });
};

/* --- Lightbox Modal for Gallery Images --- */
window.openLightbox = function(imageSrc, captionText) {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCap = document.getElementById('lightbox-caption');

  if (!lightbox || !lightboxImg || !lightboxCap) return;

  lightboxImg.src = imageSrc;
  lightboxImg.alt = captionText;
  lightboxCap.textContent = captionText;
  
  // Handlers for physical file load fallbacks
  lightboxImg.onerror = function() {
    this.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect fill="%231A120B" width="600" height="600"/><text fill="%23D4AF37" font-family="Playfair Display, serif" font-size="28" font-weight="bold" x="50%" y="45%" text-anchor="middle">JEEK LIGHTS</text><text fill="%23FFFFFF" font-family="sans-serif" font-size="14" x="50%" y="55%" text-anchor="middle">Premium Landmark Installation Portfolio</text></svg>';
  };

  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

window.closeLightbox = function() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

/* --- Global Keyboard Access Listeners (ESC Key close) --- */
function initKeyboardListeners() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeLightbox();
    }
  });
}

/* --- Simulated Form Submission --- */
window.handleFormSubmit = function(event) {
  event.preventDefault();
  
  const form = document.getElementById('quote-inquiry-form');
  const alertBox = document.getElementById('form-alert');
  if (!form || !alertBox) return;

  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const phone = document.getElementById('form-phone').value;
  const interest = document.getElementById('form-interest').value;
  const message = document.getElementById('form-message').value;

  // Basic validate checks
  if (!name || !email || !phone || !message) {
    alertBox.textContent = 'Please fill out all mandatory fields marked with an asterisk (*).';
    alertBox.className = 'p-4 rounded text-sm mb-4 bg-red-900/60 border border-red-500 text-red-100';
    alertBox.classList.remove('hidden');
    return;
  }

  // Simulate server POST call latency
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing coordinates...';

  setTimeout(() => {
    alertBox.innerHTML = `<strong>Inquiry Received Successfully!</strong> Thank you ${name}. Our sales department has dispatched an automated confirmation to <strong>${email}</strong>. A representative from our Poranki Rural division will contact you shortly.`;
    alertBox.className = 'p-4 rounded text-sm mb-4 bg-green-950/70 border border-gold/40 text-gold';
    alertBox.classList.remove('hidden');
    
    // Reset inputs
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;

    // Auto fade alert after 10s
    setTimeout(() => {
      alertBox.classList.add('hidden');
    }, 10000);
  }, 1200);
};
