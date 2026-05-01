# Kim Dang Portfolio

This is a plain HTML, CSS, and JavaScript portfolio site designed to deploy directly to GitHub Pages.

## File structure

- `index.html`: main page content and section structure
- `styles.css`: all layout, typography, colors, and responsive styles
- `script.js`: mobile menu and scroll reveal interactions
- `assets/`: placeholder artwork and future media files

## Editing content

Open `index.html` and update the text in each section.

Places you will most likely edit first:

- Hero headline and intro paragraph
- Navigation labels and links
- Featured project titles
- Gallery item titles
- About paragraph
- Footer links

Look for HTML comments like `Replace this paragraph...` and `Swap this placeholder file...` for quick edit points.

## Replacing placeholder images

The current artwork uses simple SVG placeholders stored in `assets/`.

To replace them:

1. Add your own image files to `assets/`
2. Update the matching `src` values in `index.html`
3. Update each `alt` attribute so it describes the real image content

You can use `.jpg`, `.png`, `.webp`, or `.svg`.

## Adding a real CV

Right now the CV navigation points to the on-page `#cv` section so there are no broken links.

To add your real CV later:

1. Put your file in `assets/`, for example `assets/kim-dang-cv.pdf`
2. Update the CV links in `index.html`
3. Optionally add `target="_blank" rel="noreferrer"` if you want it to open in a new tab

## Deploying to GitHub Pages

If this repository is named `kimdangportfolio.github.io`, GitHub Pages can serve it from the root automatically.

Basic deployment steps:

1. Commit your changes
2. Push to the default branch of this repository
3. In GitHub, open repository `Settings`
4. Go to `Pages`
5. Under `Build and deployment`, choose `Deploy from a branch`
6. Select your default branch and `/ (root)`
7. Save and wait for GitHub Pages to publish

Your site will then be available at the repository's GitHub Pages URL.

## Local preview

You can preview locally by opening `index.html` in a browser.

If you prefer a lightweight local server, from the project folder run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
