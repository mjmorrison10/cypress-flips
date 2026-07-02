#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

let products = [];
const inventoryJsonPath = path.resolve('data/inventory.json');
if (fs.existsSync(inventoryJsonPath)) {
  products = JSON.parse(fs.readFileSync(inventoryJsonPath, 'utf8'));
} else {
  global.window = {};
  await import('../js/inventory.js');
  products = global.window.CF_STATIC_INVENTORY || [];
}
const outDir = path.resolve('products');
fs.mkdirSync(outDir, { recursive: true });

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
function stripHTML(value = '') {
  return String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
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
function statusLabel(item) {
  const s = normalizeStatus(item.status);
  return ({
    available:'Available',
    hold:'On Hold',
    pending:'Pending Pickup',
    reserved:'Reserved',
    'coming-soon':'Coming Soon',
    sold:'Sold',
    draft:'Draft / Not Ready',
    'needs-review':'Needs Review',
    hidden:'Hidden',
    archived:'Archived'
  }[s] || 'Available');
}
function offerAvailability(item) {
  const s = normalizeStatus(item.status);
  if (s === 'sold') return 'https://schema.org/SoldOut';
  if (['hold', 'pending', 'reserved'].includes(s)) return 'https://schema.org/LimitedAvailability';
  if (s === 'coming-soon') return 'https://schema.org/PreOrder';
  if (['hidden', 'archived', 'draft', 'needs-review'].includes(s)) return 'https://schema.org/Discontinued';
  return 'https://schema.org/InStock';
}
function shouldIndexProduct(item) {
  return !['hidden', 'archived', 'draft', 'needs-review'].includes(normalizeStatus(item.status));
}
for (const item of products) {
  const url = `https://cypressflips.com/products/${item.id}.html`;
  const description = stripHTML(item.shortDesc || item.fullDesc).slice(0, 160);
  const image = item.images?.[0] || '../favicon.png';
  const gallery = (item.images || []).map(img => `<img src="../${esc(img)}" alt="${esc(item.title)}" loading="lazy" class="w-full rounded-2xl border border-gray-200 bg-white object-cover">`).join('\n');

  // Sold items: show a banner + up to 3 similar available items so the page
  // keeps working as a funnel instead of being a dead end.
  const isSold = normalizeStatus(item.status) === 'sold';
  const similar = isSold
    ? products
        .filter(p => p.id !== item.id && normalizeStatus(p.status) === 'available')
        .sort((a, b) => (b.category === item.category) - (a.category === item.category))
        .slice(0, 3)
    : [];
  const soldBanner = isSold ? `
      <div class="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
        <p class="font-bold text-slate-900 mb-1"><span class="mr-2">✅</span>This one sold — that's kind of the point.</p>
        <p class="text-gray-600 text-sm">Inspected finds move fast at Cypress Flips. Here's what's still available:</p>
      </div>` : '';
  const similarSection = similar.length ? `
      <section class="mt-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Still available right now</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          ${similar.map(p => `<a href="${esc(p.id)}.html" class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition block">
            <img src="../${esc(p.images?.[0] || 'favicon.png')}" alt="${esc(p.title)}" loading="lazy" class="w-full h-40 object-cover">
            <div class="p-4">
              <div class="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">${esc(p.category)}</div>
              <div class="font-bold text-slate-900 text-sm mb-2">${esc(p.title)}</div>
              <div class="text-blue-600 font-extrabold">$${Number(p.price).toFixed(2)}</div>
            </div>
          </a>`).join('\n          ')}
        </div>
      </section>` : '';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.title,
    image: (item.images || []).map(img => `https://cypressflips.com/${img}`),
    description: stripHTML(item.fullDesc || item.shortDesc),
    category: item.category,
    offers: {
      '@type': 'Offer',
      price: item.price,
      priceCurrency: 'USD',
      availability: offerAvailability(item),
      itemCondition: 'https://schema.org/UsedCondition'
    }
  };
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${esc(item.title)} | Cypress Flips</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  ${shouldIndexProduct(item) ? '<meta name="robots" content="index,follow">' : '<meta name="robots" content="noindex,follow">'}
  <meta name="theme-color" content="#2563eb">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="Cypress Flips">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="apple-touch-icon" href="/icons/cypress-flips-180.png">
  <meta property="og:title" content="${esc(item.title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="https://cypressflips.com/${esc(image)}">
  <meta property="og:url" content="${url}">
  <link rel="stylesheet" href="../css/tailwind.css">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="icon" type="image/png" href="../favicon.png">
  <script>if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) document.documentElement.classList.add('pwa-standalone');</script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body class="bg-gray-50 text-gray-900">
  <main class="py-10 md:py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <a href="../index.html#inventory" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold mb-8">← Back to Cypress Flips</a>
      ${soldBanner}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">${gallery}</section>
        <section class="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 md:p-8">
          <div class="text-blue-600 font-bold uppercase text-sm tracking-wider mb-2">${esc(item.category)}</div>
          <h1 class="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">${esc(item.title)}</h1>
          <div class="text-4xl font-extrabold text-blue-600 mb-2">$${Number(item.price).toFixed(2)}</div>
          <p class="product-direct-price-note mb-4">Website direct local pickup price — marketplace listings may be higher.</p>
          <div class="product-meta-badges mb-6"><span class="product-badge">${statusLabel(item)}</span>${item.isPremium ? '<span class="product-badge">Premium</span>' : ''}</div>
          <div class="prose max-w-none text-gray-600 leading-relaxed mb-8">${item.fullDesc}</div>
          <div class="flex flex-col sm:flex-row gap-3">
            <a href="../index.html#product=${encodeURIComponent(item.id)}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold text-center">Reserve / Ask to Buy</a>
            <a href="../index.html#contact" class="border border-gray-300 hover:border-blue-600 px-6 py-4 rounded-xl font-bold text-center">Contact</a>
          </div>
          <p class="text-sm text-gray-500 mt-4">Local pickup available in Cypress, CA.</p>
          <p class="text-sm text-gray-500 mt-2">Have stuff like this to sell? <a href="../sell.html" class="text-blue-600 hover:text-blue-800 font-semibold">I pay cash for games, figures, and collections</a>.</p>
        </section>
      </div>
      ${similarSection}
    </div>
  </main>
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, `${item.id}.html`), html);
}
console.log(`Generated ${products.length} product pages.`);
