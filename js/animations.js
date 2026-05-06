/* ============================================================
   GORDON — animations.js
   GSAP + ScrollTrigger
   ============================================================ */

(function () {
  'use strict';

  // Aguarda GSAP carregar
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP não carregou.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ── HERO — entrada com delay após splash ──────────── */
  const splashDelay = 1.9;

  const tl = gsap.timeline({ delay: splashDelay });

  tl.to('#heroEyebrow', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    from: { y: -40, opacity: 0 },
  });

  tl.fromTo('#heroTitle',
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' },
    '-=0.3'
  );

  tl.fromTo('#heroSubtitle',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.4'
  );

  tl.fromTo('#heroBtn',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.4'
  );

  /* ── PARALLAX — foto do sobre ──────────────────────── */
  gsap.to('.about-image', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  /* ── CARDS DO CARDÁPIO — stagger ───────────────────── */
  gsap.fromTo('.burger-card',
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.burgers-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );

  /* ── AUTHORITY — entrada do número grande ──────────── */
  gsap.fromTo('.authority-number-wrap',
    { scale: 0.85, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.authority-section',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    }
  );

  /* ── ABOUT — borda decorativa ───────────────────────── */
  gsap.fromTo('.about-image-border',
    { opacity: 0, scale: 0.95 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    }
  );

  /* ── SEÇÃO DELIVERY — título em parallax ───────────── */
  gsap.to('.delivery-title', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: '.delivery-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  /* ── FOOTER LOGO — reveal ───────────────────────────── */
  gsap.fromTo('.footer-logo',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    }
  );

  /* ── LINHA AUTORIDADE — cresce ao entrar ───────────── */
  gsap.from('.section-line--top', {
    scaleX: 0,
    transformOrigin: 'center',
    duration: 1.2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.authority-section',
      start: 'top 85%',
    },
  });

  gsap.from('.section-line--bottom', {
    scaleX: 0,
    transformOrigin: 'center',
    duration: 1.2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.authority-section',
      start: 'bottom 95%',
    },
  });

  /* ── GALERIA — itens em cascata ─────────────────────── */
  gsap.fromTo('.masonry-item',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: { each: 0.08, from: 'start' },
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.masonry-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );

  /* ── LOCATION INFO — fade lateral ──────────────────── */
  gsap.fromTo('.location-detail',
    { opacity: 0, x: 30 },
    {
      opacity: 1,
      x: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.location-section',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    }
  );

  /* ── MARQUEE WRAP — fade up ─────────────────────────── */
  gsap.fromTo('.marquee-wrap',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.marquee-wrap',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    }
  );

})();
