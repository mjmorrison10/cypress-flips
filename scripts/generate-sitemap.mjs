#!/usr/bin/env node
import fs from 'node:fs';

const SITE_URL = 'https://cypressflips.netlify.app';
const today = new Date().toISOString().slice(0, 10);

function normalizeStatus(value = 'available') {
  const normalized = String(value || 'available').trim().toLowerCase().replace(/[\s_]+/g, '-');
  const aliases = {
    visible: 'available', active: 'available', 'in-stock': 'available', instock: 'available',
    held: 'hold', 'on-hold': 'hold', onhold: 'hold',
    'pending-pickup': 'pending', reserve: 'reserved',
    upcoming: 'coming-soon', soon: 'coming-soon',
    review: 'needs-review'
  };
  return aliases[normalized] || normalized || 'available';
}

function shouldIndexProduct(item) {
  return !['hidden', 'archived', 'draft', 'needs-review'].includes(normalizeStatus(item.status));
}

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

const products = fs.existsSync('data/inventory.json')
  ? JSON.parse(fs.readFileSync('data/inventory.json', 'utf8'))
  : [];

const urls = [
  { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${SITE_URL}/index.html`, priority: '0.9', changefreq: 'daily' },
  { loc: `${SITE_URL}/sell.html`, priority: '0.9', changefreq: 'weekly' },
  ...products
    .filter(shouldIndexProduct)
    .map(item => ({
      loc: `${SITE_URL}/products/${encodeURIComponent(item.id)}.html`,
      priority: normalizeStatus(item.status) === 'available' ? '0.8' : '0.5',
      changefreq: 'weekly'
    }))
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${esc(url.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync('sitemap.xml', xml);
console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
