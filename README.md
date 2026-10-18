# Sunny Desai — professional portfolio

A compact, responsive professional profile with a white background, black typography, and a single-page layout. Built with HTML, CSS, and a small JavaScript enhancement file; no dependencies or build step.

The page includes a professional summary, experience, four expandable work summaries, technical expertise, education, contact links, and the supplied resume as a downloadable PDF. All content and project disclosures work without JavaScript. JavaScript adds email copying, active section navigation, and support for direct project links.

## Publish or update

```bash
cd /Users/sunnydesai/ReallySunny/Web/sunny-portfolio
./launch.sh
```

The script uses your authenticated GitHub account. It creates the public repository on first launch, or commits and pushes the current site to the existing matching repository. GitHub Actions publishes changes to GitHub Pages. The resume PDF is included in the public site.

For @reallysunny, the site address is https://reallysunny.github.io/sunny-portfolio/. Verify completion in the repository's Actions tab.

## Preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. If clipboard access is unavailable, the copy button displays the email address for manual copying.

## Editing

- `index.html`: all profile content, project details, experience, expertise, education, and contact links.
- `styles.css`: responsive black-and-white layout, focus states, reduced-motion support, and print styling.
- `app.js`: email copy, section highlighting, and direct project links.
- `assets/Sunny-Desai-Resume.pdf`: original supplied resume.
- `.github/workflows/pages.yml`: deployment on pushes to `main`.

Content is based on the supplied October 1, 2026 resume and LinkedIn profile export. No performance metrics, testimonials, or employer materials have been invented. All fonts are local system fonts. The site uses relative asset paths, supports GitHub Pages repository hosting, and has no analytics or backend services. It does not change the existing sunnyddesai.com website.

## Verification

JavaScript and launch-script syntax, duplicate HTML IDs, local asset paths, navigation anchors, project disclosures, and resume integrity were checked. Browser rendering could not be verified because computer-use permissions were unavailable. Publishing requires GitHub network access.
