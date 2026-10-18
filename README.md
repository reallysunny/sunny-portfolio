# Sunny Desai — engineering portfolio

A responsive, black-and-white resume and portfolio website for GitHub Pages. Built with HTML, CSS, and JavaScript, with no build step or package dependencies.

Includes filterable project highlights, accessible project dialogs, expandable career history, keyboard-operated expertise tabs, mobile navigation, email copy, and a downloadable resume. Respects reduced-motion preferences. Email links open the visitor's mail client; there is no form backend or visitor tracking.

## Launch on GitHub Pages

Run from your Mac Terminal:

```bash
cd /Users/sunnydesai/ReallySunny/Web/sunny-portfolio
./launch.sh
```

The script uses your authenticated GitHub account, creates a public `sunny-portfolio` repository, enables GitHub Pages, and pushes the site. It stops if an unrelated repository already exists. Your resume PDF is included as a public download. Check the repository's Actions tab for deployment completion.

Expected URL for @reallysunny: https://reallysunny.github.io/sunny-portfolio/

## Preview

```bash
python3 -m http.server 8080
```

Open http://localhost:8080. To open without a server, open `index.html` in a browser; the email copy feature requires a secure context or localhost and falls back to selecting the address.

## Content and maintenance

- `index.html`: main page, career timeline, about, and contact.
- `app.js`: project details, expertise data, and interactions.
- `styles.css`: responsive layout and monochrome styling.
- `assets/Sunny-Desai-Resume.pdf`: original supplied resume.
- `.github/workflows/pages.yml`: automatic deployment for pushes to `main`.

Content is derived from the supplied October 1, 2026 resume and LinkedIn profile PDF. Resume role summaries take precedence; the LinkedIn export supplies additional technical detail and education context. Diagrams are conceptual illustrations rather than product screenshots. No employer source code, performance metrics, testimonials, or client endorsements are invented.

Google Fonts supplies DM Sans and Manrope when online; system fonts are used if unavailable. All paths are relative, so deployment also works at a repository subpath. The site does not set a custom domain or change the existing sunnyddesai.com website.

## Validation

JavaScript and shell syntax, duplicate IDs, internal anchor references, local asset paths, data mappings, and all four project's filter categories were checked. Interactive browser and visual checks could not run because computer-use permissions were unavailable. Remote deployment requires GitHub network access.
