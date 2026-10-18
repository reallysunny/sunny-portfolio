# Sunny Desai — professional portfolio

A compact, responsive professional profile with a white background, black typography, and a single-page layout. Built with HTML, CSS, and a small JavaScript enhancement file; no dependencies or build step.

The page includes a professional summary, experience, four expandable work summaries, technical expertise, education, contact links, and the supplied resume as a downloadable PDF. All content and project disclosures work without JavaScript. JavaScript adds email copying, active section navigation, and support for direct project links.

## Publish or update

```bash
cd /Users/sunnydesai/ReallySunny/Web/sunny-portfolio
./launch.sh
```

The script uses your authenticated GitHub account. It creates the public repository on first launch, or commits and pushes the current site to the existing matching repository. GitHub Actions publishes changes to GitHub Pages. The resume PDF is included in the public site.

The site is served at http://reallysunny.com/ (custom domain set in the repository’s Pages settings; https://reallysunny.github.io/sunny-portfolio/ redirects there). Once GitHub issues an HTTPS certificate, switch the `canonical`, `og:` and JSON-LD URLs in `index.html` to `https://`. Verify completion in the repository's Actions tab.

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
- `assets/*.webp`: portrait and illustration, resized for the sizes they display at.
- `assets/og-image.jpg`, `assets/apple-touch-icon.png`: link-preview card and home-screen icon.
- `source-images/`: full-resolution originals. Not deployed; re-export WebP files from these when an image changes.
- `.github/workflows/pages.yml`: deployment on pushes to `main`. It also stamps the "Last updated" date at the top of the page with the deployed commit’s date (Pacific time), so it never needs editing by hand.

Content is based on the supplied October 1, 2026 resume and LinkedIn profile export. No performance metrics, testimonials, or employer materials have been invented. All fonts are local system fonts. The site uses relative asset paths, supports GitHub Pages repository hosting, and has no analytics or backend services. It does not change the existing sunnyddesai.com website.

## Verification

Checked with headless Chrome at desktop (1280px) and mobile (390px) widths: layout, project disclosures and direct project links, the header illustration popover, active-section highlighting (including Contact at the page bottom), and print expansion of all projects. Initial page weight is about 55 KB. Publishing requires GitHub network access.
