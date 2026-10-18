'use strict';

// Core content, navigation, and project disclosures also work without JavaScript.
const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('sunnydesai07@gmail.com');
    copyStatus.textContent = 'Email address copied.';
  } catch {
    copyStatus.textContent = 'Copy this address: sunnydesai07@gmail.com';
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Preserve links to projects shared from the previous version of the site.
const oldProjects = { verily: 'work-verily', aws: 'work-aws', sdk: 'work-sdk', aosp: 'work-aosp' };
function openLinkedProject() {
  const hash = location.hash.slice(1);
  const id = hash.startsWith('work/') ? oldProjects[hash.slice(5)] : hash;
  const project = id ? document.getElementById(id) : null;
  if (project instanceof HTMLDetailsElement) {
    project.open = true;
    requestAnimationFrame(() => project.scrollIntoView({ block: 'start' }));
  }
}
window.addEventListener('hashchange', openLinkedProject);
openLinkedProject();

// Highlight the section currently in view without changing browser history.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.header nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
    const active = sections.find(section => visible.has(section));
    links.forEach(link => {
      if (active && link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-100px 0px -45% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
