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

// Expand the header portrait in place and close it with Escape or an outside click.
const portraitDetails = document.querySelector('#portrait-details');
const portraitToggle = document.querySelector('#portrait-toggle');

function syncPortraitState() {
  portraitToggle.setAttribute('aria-expanded', String(portraitDetails.open));
  portraitToggle.setAttribute('aria-label', portraitDetails.open ? 'Collapse Sunny’s California illustration' : 'Expand Sunny’s California illustration');
}

// Native <details> keeps the portrait expandable even if this script is cached or unavailable.
portraitDetails.addEventListener('toggle', syncPortraitState);
syncPortraitState();

document.addEventListener('click', event => {
  if (!portraitDetails.contains(event.target)) portraitDetails.open = false;
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && portraitDetails.open) {
    portraitDetails.open = false;
    portraitToggle.focus();
  }
});

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

// Keep the tab highlight aligned with the section nearest the sticky header.
const header = document.querySelector('.header');
const navLinks = [...document.querySelectorAll('.header nav a')];
const navSections = navLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);

function showActiveSection(section) {
  navLinks.forEach(link => {
    if (section && link.hash === `#${section.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function updateActiveSection() {
  const scrollOffset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const marker = Math.max(header.getBoundingClientRect().bottom, scrollOffset) + 2;
  let activeSection = null;
  for (const section of navSections) {
    if (section.getBoundingClientRect().top <= marker) activeSection = section;
    else break;
  }
  showActiveSection(activeSection);
}

let scrollFrame = 0;
function scheduleActiveSectionUpdate() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    updateActiveSection();
  });
}

navLinks.forEach(link => link.addEventListener('click', () => {
  showActiveSection(document.getElementById(link.hash.slice(1)));
}));
window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true });
window.addEventListener('resize', scheduleActiveSectionUpdate);
window.addEventListener('hashchange', scheduleActiveSectionUpdate);
updateActiveSection();
