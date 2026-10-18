# Sunny Desai — engineering portfolio

A responsive, black-and-white developer workspace portfolio for GitHub Pages. Built with HTML, CSS, and JavaScript, with no build step or package dependencies.

Includes an editor-style file explorer and tabs, searchable command palette (Cmd/Ctrl K), expandable project files, category filters, experience and skills views, and a working terminal. Terminal commands include `help`, `about`, `whoami`, `projects`, `experience`, `skills`, `contact`, `resume`, `ls`, `open verily|aws|sdk|aosp`, and `clear`. Arrow keys recall terminal history. Standard navigation links provide access to every view without using the terminal. All fonts are local system fonts.

Resume downloads and email links work directly; there is no form backend or visitor tracking. Respects reduced-motion preferences.

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

All paths are relative, so deployment also works at a repository subpath. The site does not set a custom domain or change the existing sunnyddesai.com website.

## Validation

JavaScript syntax, duplicate IDs, internal links, and assets were checked. A simulated DOM verified page routing, invalid-route fallback, project and skill rendering, project filters/deep links, terminal commands and history-related UI, palette search/activation, and terminal collapse. Interactive browser and visual checks could not run because computer-use permissions were unavailable. Remote deployment requires GitHub network access.
