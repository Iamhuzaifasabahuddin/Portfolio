const links = document.querySelectorAll('.animate-links');

links.forEach(link => {
link.addEventListener('click', e => {
  e.preventDefault();
  const target = document.querySelector(link.getAttribute('href'));
  target.scrollIntoView({ behavior: 'smooth' });
  target.style.transition = 'opacity 0.8s ease';
  target.style.opacity = 0;
  setTimeout(() => target.style.opacity = 1, 200);
});
});