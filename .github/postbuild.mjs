// Après "vite build" : crée une page HTML par rubrique (dist/expertise/index.html, etc.)
// avec son propre titre, sa description et son adresse canonique, pour que chaque
// rubrique ait une adresse directe lisible par les moteurs de recherche.
// Crée aussi dist/404.html, qui renvoie vers l'application pour toute adresse inconnue.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SEO_PAGES, SITE_URL } from '../src/data/seoPages.js';

const dist = join(process.cwd(), 'dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function replaceOnce(html, pattern, replacement, what) {
  if (!pattern.test(html)) throw new Error(`postbuild : élément introuvable dans index.html (${what})`);
  return html.replace(pattern, replacement);
}

const navLinks = Object.values(SEO_PAGES)
  .map((page) => `<a href="${page.path}">${escapeHtml(page.label)}</a>`)
  .join(' · ');

function renderPage(page) {
  const url = SITE_URL + page.path;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  let html = template;
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, 'title');
  html = replaceOnce(html, /(<meta name="description" content=")[^"]*(")/, `$1${description}$2`, 'description');
  html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, 'canonical');
  html = replaceOnce(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`, 'og:title');
  html = replaceOnce(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`, 'og:description');
  html = replaceOnce(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, 'og:url');
  // Contenu de secours (remplacé par l'application dès son chargement)
  html = replaceOnce(
    html,
    /<main class="max-w-3xl mx-auto px-6 py-16">[\s\S]*?<\/main>/,
    `<main class="max-w-3xl mx-auto px-6 py-16">
        <h1 class="font-serif text-4xl">${escapeHtml(page.heading)}</h1>
        <p class="mt-4">${description}</p>
        <p class="mt-4">Cabinet d'avocat Ana Ferreira – Rue Abbé Cuypers 3, 1040 Etterbeek (Bruxelles) – <a href="tel:+32471757011">+32 471 757 011</a></p>
        <nav class="mt-4">${navLinks}</nav>
      </main>`,
    'contenu de secours',
  );
  return html;
}

for (const page of Object.values(SEO_PAGES)) {
  const folder = join(dist, page.path);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'index.html'), renderPage(page));
}
writeFileSync(join(dist, '404.html'), renderPage(SEO_PAGES.accueil));
console.log(`postbuild : ${Object.keys(SEO_PAGES).length} pages générées + 404.html`);
