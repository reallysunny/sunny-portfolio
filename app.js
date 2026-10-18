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

// Let visitors choose a subtle accent palette and remember their preference.
const themePicker = document.querySelector('#theme-picker');
const themeToggle = document.querySelector('#theme-toggle');
const themeOptions = [...document.querySelectorAll('[data-theme-choice]')];
const themeNames = new Set(themeOptions.map(option => option.dataset.themeChoice));

function applyTheme(theme) {
  if (!themeNames.has(theme)) return;
  document.documentElement.dataset.theme = theme;
  themeOptions.forEach(option => option.setAttribute('aria-pressed', String(option.dataset.themeChoice === theme)));
  try { localStorage.setItem('sunny-site-theme', theme); } catch { /* Storage may be unavailable in private browsing. */ }
}

try {
  const savedTheme = localStorage.getItem('sunny-site-theme');
  if (savedTheme && themeNames.has(savedTheme)) document.documentElement.dataset.theme = savedTheme;
} catch { /* The default palette remains available without storage. */ }
const initialTheme = document.documentElement.dataset.theme || 'mono';
themeOptions.forEach(option => option.setAttribute('aria-pressed', String(option.dataset.themeChoice === initialTheme)));

themeOptions.forEach(option => option.addEventListener('click', () => {
  applyTheme(option.dataset.themeChoice);
  themePicker.open = false;
  themeToggle.focus();
}));
themePicker.addEventListener('toggle', () => themeToggle.setAttribute('aria-expanded', String(themePicker.open)));
themeToggle.setAttribute('aria-expanded', String(themePicker.open));

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
  if (!themePicker.contains(event.target)) themePicker.open = false;
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const closeTheme = themePicker.open;
    const closePortrait = portraitDetails.open;
    themePicker.open = false;
    portraitDetails.open = false;
    if (closeTheme) themeToggle.focus();
    else if (closePortrait) portraitToggle.focus();
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
const backToTop = document.querySelector('#back-to-top');
const navLinks = [...document.querySelectorAll('.header nav a')];
const navSections = navLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);

function showActiveSection(section) {
  navLinks.forEach(link => {
    if (section && link.hash === `#${section.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function updateActiveSection() {
  backToTop.hidden = window.scrollY < 400;
  const scrollOffset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const marker = Math.max(header.getBoundingClientRect().bottom, scrollOffset) + 2;
  let activeSection = null;
  // The last sections are too short to reach the marker, so treat the page bottom as the last one.
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    showActiveSection(navSections.at(-1));
    return;
  }
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

// Print every project expanded, then restore the reader's open/closed choices.
const projects = [...document.querySelectorAll('.project')];
let openBeforePrint = [];
window.addEventListener('beforeprint', () => {
  openBeforePrint = projects.map(project => project.open);
  projects.forEach(project => { project.open = true; });
});
window.addEventListener('afterprint', () => {
  projects.forEach((project, index) => { project.open = openBeforePrint[index]; });
});
