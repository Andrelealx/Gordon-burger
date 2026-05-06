/* ============================================================
   GORDON — main.js
   Splash · Navbar · Mobile Menu · Counter · AOS
   ============================================================ */

(function () {
  'use strict';

  /* ── SPLASH SCREEN ─────────────────────────────── */
  const splash = document.getElementById('splash');
  const splashLogo = document.querySelector('.splash-logo');
  const splashBar = document.querySelector('.splash-bar');

  document.body.classList.add('splash-active');

  // Anima logo
  requestAnimationFrame(() => {
    splashLogo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    splashLogo.style.opacity = '1';
    splashLogo.style.transform = 'translateY(0)';

    setTimeout(() => {
      splashBar.style.width = '80px';
    }, 400);

    setTimeout(() => {
      splash.classList.add('hide');
      document.body.classList.remove('splash-active');
      splash.addEventListener('animationend', () => {
        splash.style.display = 'none';
      }, { once: true });
    }, 1800);
  });

  /* ── NAVBAR SCROLL ──────────────────────────────── */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── MOBILE MENU ────────────────────────────────── */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMenu = () => {
    mobileMenu.classList.add('open');
    hamburgerBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ── SMOOTH SCROLL para links âncora ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── INTERSECTION OBSERVER — contador #68 ──────────── */
  const authorityNumber = document.querySelector('.authority-number');

  const animateCounter = (el, target, duration = 1800) => {
    let start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
        el.classList.add('done');
      }
    };

    requestAnimationFrame(step);
  };

  if (authorityNumber) {
    const target = parseInt(authorityNumber.dataset.target, 10);
    let counted = false;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounter(authorityNumber, target);
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(authorityNumber);
  }

  /* ── FEATURES EXPERIÊNCIA — reveal ──────────────────── */
  const features = document.querySelectorAll('.feature');

  const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  features.forEach(f => featuresObserver.observe(f));

  /* ── AOS INIT ───────────────────────────────────────── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* ── MARQUEE — pausar no hover ──────────────────────── */
  const marqueeWrap = document.querySelector('.marquee-wrap');
  const marqueeTrack = document.getElementById('marqueeTrack');

  if (marqueeWrap && marqueeTrack) {
    marqueeWrap.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeWrap.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ── LIGHTBOX ──────────────────────────────────────── */
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lb-img');
  const lbCounter  = document.getElementById('lb-counter');
  const lbClose    = document.getElementById('lb-close');
  const lbPrev     = document.getElementById('lb-prev');
  const lbNext     = document.getElementById('lb-next');

  // Coletar todas as imagens da galeria
  const galleryItems = Array.from(document.querySelectorAll('.masonry-item img'));
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    const src = galleryItems[index].src;
    // Tentar WebP via source
    const picture = galleryItems[index].closest('picture');
    const webpSrc = picture ? picture.querySelector('source')?.srcset : null;
    lbImg.src = webpSrc || src;
    lbImg.alt = galleryItems[index].alt;
    lbCounter.textContent = `${index + 1} / ${galleryItems.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  };

  galleryItems.forEach((img, i) => {
    img.closest('.masonry-item').addEventListener('click', () => openLightbox(i));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === document.getElementById('lb-img-wrap')) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // will-change no número do ranking
  const authorityNum = document.querySelector('.authority-number');
  if (authorityNum) authorityNum.style.willChange = 'contents';

  /* ── SCROLL PROGRESS BAR ───────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── NAVBAR ACTIVE LINK no scroll ───────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links li a');

  const updateActiveLink = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });

})();
