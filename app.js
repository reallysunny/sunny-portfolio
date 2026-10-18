'use strict';
const projects = {
  verily: { company: 'VERILY HEALTH · 2022–PRESENT', title: 'Building connected health experiences', intro: 'Technical leadership and Android delivery across Verily Me and mobile platform initiatives.', contributions: ['Led end-to-end delivery across Surveys, Consent, Identity Verification, Notifications, Health Connect, Native Metrics, and Experiments.', 'Set technical direction for Health Connect, experimentation, VDS migration, architecture, and service integration.', 'Extended App BFF support and API capabilities in partnership with backend and product teams.', 'Mentored and onboarded engineers through architecture discussions, design reviews, and code reviews.'], tags: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'WorkManager', 'gRPC', 'Protobuf'] },
  aws: { company: 'AMAZON WEB SERVICES · 2020–2022', title: 'Bringing cloud operations to mobile', intro: 'Architecture and feature delivery for the AWS Console Mobile Android application.', contributions: ['Owned architecture and delivery of Server-Driven UI capabilities, collaborating with mobile, backend, and product teams.', 'Shipped Recents and contributed to production application development and release workflows.', 'Supported operational excellence through on-call, analytics-driven health insights, and production issue response.', 'Worked on screenshot-based automated testing infrastructure and Device Farm integration with CI/CD.'], tags: ['Kotlin', 'MVVM', 'Server-Driven UI', 'Automated testing', 'Device Farm', 'CI/CD'] },
  sdk: { company: 'CAPSULE / QUALCOMM LIFE · 2017–2020', title: 'Connecting devices to better care', intro: 'Mobile SDK and application engineering across the 2net connected health ecosystem.', contributions: ['Led delivery of the 2net Android/iOS SDK and UHC Motion applications.', 'Integrated medical and wearable devices using Bluetooth/BLE across the connected device ecosystem.', 'Managed customer-facing SDK releases and partnered with engineering and product teams to evolve the platform.', 'Integrated analytics and supported cross-platform applications and frameworks.'], tags: ['Android', 'iOS', 'Java', 'Objective-C', 'Bluetooth / BLE', 'IoMT', 'SDK development'] },
  aosp: { company: 'CAPSULE TECHNOLOGIES · 2019–2020', title: 'Engineering beyond the application', intro: 'Platform work connecting Android software, background services, and purpose-built hardware.', contributions: ['Delivered AOSP build releases for Android 6.0.1 on an in-house Android device.', 'Developed features for background applications responsible for BLE communication, Android OS updates, service watchdogs, and LED-based UI.', 'Worked with service and system teams to debug complex issues within the product architecture.', 'Supported medical device integration within the 2net ecosystem.'], tags: ['AOSP', 'Android platform', 'Background services', 'BLE', 'Device integration'] }
};
const skills = {
  mobile: ['Native experiences built on strong foundations.', ['Kotlin & Java', 'Jetpack Compose', 'Coroutines & Flow', 'Clean Architecture', 'MVVM / UDF', 'Hilt & Dagger', 'SwiftUI & Objective-C', 'Android SDK']],
  platform: ['The systems and interfaces that make products possible.', ['gRPC & Protobuf', 'REST APIs', 'SDK development', 'Bluetooth / BLE', 'AOSP', 'Python & Go', 'TypeScript', 'On-device ML']],
  quality: ['Confidence from development through production.', ['JUnit & MockK', 'Roborazzi', 'Cucumber', 'GitHub Actions', 'Gradle', 'Datadog', 'Pendo & Mixpanel', 'Firebase']],
  leadership: ['Shared direction. Strong teams. End-to-end ownership.', ['Technical strategy', 'System design', 'Cross-functional delivery', 'Design reviews', 'Mentoring & onboarding', 'Technical interviewing', 'Incident response', 'Production ownership']]
};
const dialog = document.querySelector('#project-dialog');
let lastProject;
function fillTags(element, values) { element.replaceChildren(...values.map(value => { const span = document.createElement('span'); span.textContent = value; return span; })); }
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const data = projects[button.dataset.project]; lastProject = button;
  document.querySelector('#dialog-company').textContent = data.company;
  document.querySelector('#dialog-title').textContent = data.title;
  document.querySelector('#dialog-intro').textContent = data.intro;
  document.querySelector('#dialog-contributions').replaceChildren(...data.contributions.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  fillTags(document.querySelector('#dialog-tags'), data.tags); dialog.showModal(); document.body.style.overflow = 'hidden';
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastProject?.focus(); });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  let count = 0; document.querySelectorAll('[data-category]').forEach(project => { project.hidden = button.dataset.filter !== 'all' && !project.dataset.category.split(' ').includes(button.dataset.filter); if (!project.hidden) count++; });
  document.querySelector('#filter-status').textContent = `${count} projects shown`;
}));
const tabs = [...document.querySelectorAll('[data-skill]')];
function selectSkill(button) {
  tabs.forEach(tab => { const active = tab === button; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  const [description, list] = skills[button.dataset.skill];
  document.querySelector('.skill-description').textContent = description;
  fillTags(document.querySelector('.skill-list'), list);
  document.querySelector('#skill-panel').setAttribute('aria-labelledby', button.id);
}
tabs.forEach((button, index) => { button.addEventListener('click', () => selectSkill(button)); button.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length]; if (event.key === 'ArrowLeft') next = tabs[(index + tabs.length - 1) % tabs.length]; if (event.key === 'Home') next = tabs[0]; if (event.key === 'End') next = tabs.at(-1); if (next) { event.preventDefault(); selectSkill(next); next.focus(); } }); });
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; mobileNav.hidden = open; menuButton.setAttribute('aria-expanded', String(!open)); menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation'); });
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
matchMedia('(min-width: 701px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelector('#copy-email').addEventListener('click', async event => { const button = event.currentTarget; try { await navigator.clipboard.writeText('sunnydesai07@gmail.com'); button.textContent = 'COPIED ✓'; document.querySelector('#copy-status').textContent = 'Email address copied'; setTimeout(() => { button.textContent = 'COPY ↗'; }, 2400); } catch { document.querySelector('#copy-status').textContent = 'Unable to copy automatically. Select the email address to copy it.'; button.textContent = 'SELECT EMAIL'; const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(document.querySelector('.email')); selection.removeAllRanges(); selection.addRange(range); } });
document.querySelector('#year').textContent = new Date().getFullYear();
