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
const files = { home: 'README.md', work: 'projects.json', experience: 'experience.log', skills: 'skills.ts', contact: 'contact.md' };
const categories = { verily: ['mobile', 'platform'], aws: ['mobile', 'platform'], sdk: ['platform', 'devices'], aosp: ['platform', 'devices'] };
const projectList = document.querySelector('#project-list');
Object.entries(projects).forEach(([key, project], index) => {
  const card = document.createElement('details'); card.className = 'project-card'; card.id = `project-${key}`; card.dataset.category = categories[key].join(' ');
  const summary = document.createElement('summary');
  const number = document.createElement('span'); number.className = 'project-number'; number.textContent = `0${index + 1}`;
  const text = document.createElement('div'); text.className = 'project-summary';
  const company = document.createElement('span'); company.className = 'project-company'; company.textContent = project.company;
  const title = document.createElement('h3'); title.textContent = project.title;
  const intro = document.createElement('p'); intro.textContent = project.intro;
  text.append(company, title, intro);
  const indicator = document.createElement('span'); indicator.className = 'project-indicator'; indicator.setAttribute('aria-hidden', 'true');
  summary.append(number, text, indicator);
  const detail = document.createElement('div'); detail.className = 'project-detail';
  const heading = document.createElement('h4'); heading.textContent = '// my contributions';
  const list = document.createElement('ul'); project.contributions.forEach(value => { const li = document.createElement('li'); li.textContent = value; list.append(li); });
  const tags = document.createElement('div'); tags.className = 'tags'; project.tags.forEach(value => { const tag = document.createElement('span'); tag.textContent = value; tags.append(tag); });
  detail.append(heading, list, tags); card.append(summary, detail); projectList.append(card);
});
Object.entries(skills).forEach(([name, [description, values]]) => {
  const group = document.createElement('section'); group.className = 'skill-group';
  const intro = document.createElement('div'); const title = document.createElement('h3'); title.textContent = `${name}[]`; const p = document.createElement('p'); p.textContent = description; intro.append(title, p);
  const list = document.createElement('div'); list.className = 'skill-items'; values.forEach(value => { const item = document.createElement('span'); item.textContent = value; list.append(item); }); group.append(intro, list); document.querySelector('#skill-groups').append(group);
});
function setFilter(filter) {
  let count = 0;
  document.querySelectorAll('[data-filter]').forEach(button => { const active = button.dataset.filter === filter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter); if (!card.hidden) count++; });
  document.querySelector('#filter-status').textContent = `${count} projects shown`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
let currentView;
function route() {
  const [requested, project] = location.hash.slice(1).split('/'); const view = Object.hasOwn(files, requested) ? requested : 'home';
  const changed = currentView !== view;
  document.querySelectorAll('.page').forEach(page => { page.hidden = page.id !== view; });
  document.querySelectorAll('[data-view]').forEach(link => { const active = link.dataset.view === view; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
  document.querySelector('#current-file').textContent = files[view]; document.title = `${files[view]} — Sunny Desai`;
  if (view === 'work' && project && Object.hasOwn(projects, project)) { setFilter('all'); const card = document.querySelector(`#project-${project}`); card.open = true; card.scrollIntoView({ block: 'nearest' }); }
  if (currentView && changed) { document.querySelector('#main').focus({ preventScroll: true }); window.scrollTo(0, 0); }
  currentView = view;
}
window.addEventListener('hashchange', route); route(); document.documentElement.classList.add('js');
const palette = document.querySelector('#command-palette'); const paletteInput = document.querySelector('#palette-input'); const results = document.querySelector('#palette-results');
const commands = [...Object.entries(files).map(([key, label]) => ({ label, detail: key === 'home' ? 'Overview' : key[0].toUpperCase() + key.slice(1), action: () => { location.hash = key; } })), ...Object.entries(projects).map(([key, project]) => ({ label: project.title, detail: 'Project', keywords: project.company, action: () => { location.hash = `work/${key}`; } })), { label: 'Download resume', detail: 'PDF', action: () => { document.querySelector('.resume-top').click(); } }, { label: 'Focus terminal', detail: 'Command line', action: () => { toggleTerminal(true); document.querySelector('#terminal-input').focus(); } }];
let selected = 0; let matches = []; let previousFocus;
function drawResults() {
  matches = commands.filter(command => `${command.label} ${command.detail} ${command.keywords ?? ''}`.toLowerCase().includes(paletteInput.value.trim().toLowerCase())); selected = 0; results.replaceChildren();
  if (!matches.length) { const p = document.createElement('p'); p.className = 'no-results'; p.textContent = 'No matching files or actions.'; results.append(p); }
  matches.forEach((command, index) => { const button = document.createElement('button'); button.className = 'palette-result'; const label = document.createElement('span'); label.textContent = command.label; const detail = document.createElement('span'); detail.textContent = command.detail; button.append(label, detail); button.addEventListener('click', () => runPalette(index)); results.append(button); }); highlightResult();
}
function highlightResult() { results.querySelectorAll('button').forEach((button, index) => { button.classList.toggle('selected', index === selected); }); const item = results.querySelectorAll('button')[selected]; if (item) item.scrollIntoView({ block: 'nearest' }); }
function openPalette() { if (palette.open) return; previousFocus = document.activeElement; paletteInput.value = ''; palette.showModal(); drawResults(); paletteInput.focus(); }
function runPalette(index) { const command = matches[index]; if (!command) return; palette.close(); command.action(); }
document.querySelector('#palette-open').addEventListener('click', openPalette); document.querySelector('#palette-close').addEventListener('click', () => palette.close());
palette.addEventListener('close', () => previousFocus?.focus({ preventScroll: true }));
paletteInput.addEventListener('input', drawResults);
paletteInput.addEventListener('keydown', event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); if (matches.length) { selected = (selected + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length; highlightResult(); } } else if (event.key === 'Enter') { event.preventDefault(); runPalette(selected); } });
palette.addEventListener('click', event => { if (event.target === palette) { const r = palette.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) palette.close(); } });
document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); palette.open ? palette.close() : openPalette(); } });
function toggleTerminal(force) { const body = document.querySelector('#terminal-body'); const open = force ?? body.hidden; body.hidden = !open; const button = document.querySelector('#terminal-toggle'); button.setAttribute('aria-expanded', String(open)); button.setAttribute('aria-label', open ? 'Collapse terminal' : 'Expand terminal'); button.textContent = open ? '−' : '+'; }
document.querySelector('#terminal-toggle').addEventListener('click', () => toggleTerminal());
const output = document.querySelector('#terminal-output'); const input = document.querySelector('#terminal-input'); const history = []; let historyIndex = 0;
function print(text) { const p = document.createElement('p'); p.textContent = text; output.append(p); while (output.children.length > 80) output.firstElementChild.remove(); output.scrollTop = output.scrollHeight; }
const terminalRoutes = { about: 'home', whoami: 'home', projects: 'work', experience: 'experience', skills: 'skills', contact: 'contact' };
document.querySelector('#terminal-form').addEventListener('submit', event => {
  event.preventDefault(); const raw = input.value.trim(); input.value = ''; if (!raw) return; history.push(raw); historyIndex = history.length; print(`sunny@portfolio ~ % ${raw}`); const command = raw.toLowerCase();
  if (command === 'clear') output.replaceChildren();
  else if (command === 'help') print('about / whoami   → Meet Sunny\nprojects         → Explore selected work\nexperience       → Career history\nskills           → Engineering toolkit\ncontact          → Get in touch\nresume           → Download resume\nopen verily|aws|sdk|aosp → Explore a project\nls               → List workspace files\nclear            → Clear terminal\nTip: use ↑ / ↓ for command history.');
  else if (command === 'ls') print(Object.values(files).join('  ') + '  resume.pdf');
  else if (command === 'resume') { document.querySelector('.resume-top').click(); print('Opening resume download.'); }
  else if (Object.hasOwn(terminalRoutes, command)) { location.hash = terminalRoutes[command]; print(command === 'whoami' || command === 'about' ? 'Sunny Desai · Software Engineer & Technical Leader\n10+ years · Verily / AWS / Capsule & Qualcomm Life\nSunnyvale, California' : `Opened ${files[terminalRoutes[command]]}`); }
  else if (command.startsWith('open ') && Object.hasOwn(projects, command.slice(5).trim())) { const key = command.slice(5).trim(); location.hash = `work/${key}`; print(`Opened ${projects[key].title}`); }
  else print(`Command not found: ${raw}. Type help to see available commands.`);
});
input.addEventListener('keydown', event => { if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1))); input.value = history[historyIndex] ?? ''; } });
document.querySelector('#copy-email').addEventListener('click', async () => { const status = document.querySelector('#copy-status'); try { await navigator.clipboard.writeText('sunnydesai07@gmail.com'); status.textContent = '✓ Email address copied.'; } catch { const range = document.createRange(); range.selectNodeContents(document.querySelector('.contact-email')); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Email selected. Press ⌘C or Ctrl+C to copy.'; } });
document.querySelector('#year').textContent = new Date().getFullYear();
