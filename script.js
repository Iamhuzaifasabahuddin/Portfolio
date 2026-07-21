// === LOADING SCREEN ===
(function boot() {
  const overlay = document.querySelector('.loading-overlay');
  const lines = document.querySelectorAll('.loading-line');
  let idx = 0;

  function dismiss() {
    overlay.classList.add('hidden');
    document.removeEventListener('click', dismiss);
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (e.key === 'Enter') dismiss();
  }

  function showNext() {
    if (idx >= lines.length) {
      document.addEventListener('click', dismiss);
      document.addEventListener('keydown', onKey);
      return;
    }
    lines[idx].classList.add('visible');
    const delays = [500, 300, 200, 200, 200, 200, 200, 200, 400, 300, 600];
    idx++;
    setTimeout(showNext, delays[idx - 1] || 200);
  }
  showNext();
})();

// === CURSOR GLOW ===
const glow = document.querySelector('.cursor-glow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// === SMOOTH NAV ===
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// === SCROLL PROGRESS ===
const scrollBar = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + '%' : '0';
});

// === TYPEWRITER ===
const typedEl = document.querySelector('.typed-text');
const careers = ['Backend Developer', 'System Architect', 'Python & Django Specialist', 'API Craftsman', 'Problem Solver'];
let careerIdx = 0, charIdx = 0, isDeleting = false;

function typeLoop() {
  const current = careers[careerIdx];
  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) { isDeleting = true; setTimeout(typeLoop, 2000); return; }
    setTimeout(typeLoop, 80);
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { isDeleting = false; careerIdx = (careerIdx + 1) % careers.length; }
    setTimeout(typeLoop, 40);
  }
}
if (typedEl) setTimeout(typeLoop, 500);

const cursor = document.querySelector('.typed-cursor');
if (cursor) setInterval(() => cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0', 530);

// === COUNTER ===
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// === INTERSECTION OBSERVER ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      if (entry.target.classList.contains('stat-number')) animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .stat-number, .project-card, .skill-card, .pipeline-step, .arch-node').forEach(el => observer.observe(el));

// === ACTIVE NAV LINK ===
const sections = document.querySelectorAll('section[id]');
const navLinksArr = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksArr.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));

// === 3D TILT ===
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// === NEURAL NETWORK ===
(function neural() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let nodes = [];
  const NODE_COUNT = 40;
  const CONN_DIST = 150;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,168,76,0.5)';
      ctx.fill();
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = n.x - nodes[j].x;
        const dy = n.y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONN_DIST) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(201,168,76,${0.08 * (1 - dist / CONN_DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// === ARCHITECTURE PACKET ANIMATION ===
// Packets are already animated via CSS keyframes.
// We refresh positions on scroll for any lazy-captured arch sections.
