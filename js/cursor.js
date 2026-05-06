/* ============================================================
   GORDON — cursor.js
   Cursor customizado com lerp suave (desktop only)
   ============================================================ */

(function () {
  'use strict';

  // Detectar touch device — desativar completamente
  const isTouchDevice = () => {
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  };

  if (isTouchDevice()) return;

  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (!cursor || !follower) return;

  // Esconder cursor nativo
  document.body.style.cursor = 'none';

  // Estilos inline para garantir funcionamento sem depender de CSS externo
  Object.assign(cursor.style, {
    position: 'fixed',
    width: '14px',
    height: '14px',
    background: 'var(--gold, #C8943F)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '99999',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
    willChange: 'left, top',
  });

  Object.assign(follower.style, {
    position: 'fixed',
    width: '38px',
    height: '38px',
    border: '1.5px solid var(--gold, #C8943F)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '99998',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
    willChange: 'left, top',
  });

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;
  let isVisible = false;

  // Esconder até o primeiro movimento
  cursor.style.opacity = '0';
  follower.style.opacity = '0';

  const lerp = (start, end, factor) => start + (end - start) * factor;

  // Posição do cursor principal: instantânea
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    }
  });

  // Follower com lerp suave
  const animateCursor = () => {
    followerX = lerp(followerX, mouseX, 0.1);
    followerY = lerp(followerY, mouseY, 0.1);

    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  // Hover em elementos interativos — expansão + cor cream
  const HOVER_SELECTORS = 'a, button, .burger-card, .masonry-item, .nav-cta, .btn-hero, .btn-outline, .btn-delivery';

  const onHoverEnter = () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    cursor.style.background = 'var(--cream, #F5ECD7)';
    follower.style.width = '56px';
    follower.style.height = '56px';
    follower.style.borderColor = 'var(--cream, #F5ECD7)';
  };

  const onHoverLeave = () => {
    cursor.style.width = '14px';
    cursor.style.height = '14px';
    cursor.style.background = 'var(--gold, #C8943F)';
    follower.style.width = '38px';
    follower.style.height = '38px';
    follower.style.borderColor = 'var(--gold, #C8943F)';
  };

  // Event delegation — evita recadastrar em elementos dinâmicos
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_SELECTORS)) {
      onHoverEnter();
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVER_SELECTORS)) {
      onHoverLeave();
    }
  });

  // Desaparecer quando sai da janela
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });

  // Clique — efeito de pressão
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    follower.style.transform = 'translate(-50%, -50%) scale(0.85)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
  });

})();
