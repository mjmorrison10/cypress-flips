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
function statusLabel(item) {
  const s = String(item.status || 'available').toLowerCase();
  return ({available:'Available',hold:'On Hold',pending:'Pending Pickup',reserved:'Reserved',sold:'Sold'}[s] || 'Available');
}
for (const item of products) {
  const url = `https://cypressflips.netlify.app/products/${item.id}.html`;
  const description = stripHTML(item.shortDesc || item.fullDesc).slice(0, 160);
  const image = item.images?.[0] || '../favicon.png';
  const gallery = (item.images || []).map(img => `<img src="../${esc(img)}" alt="${esc(item.title)}" loading="lazy" class="w-full rounded-2xl border border-gray-200 bg-white object-cover">`).join('\n');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.title,
    image: (item.images || []).map(img => `https://cypressflips.netlify.app/${img}`),
    description: stripHTML(item.fullDesc || item.shortDesc),
    category: item.category,
    offers: {
      '@type': 'Offer',
      price: item.price,
      priceCurrency: 'USD',
      availability: statusLabel(item) === 'Sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition'
    }
  };
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(item.title)} | Cypress Flips</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(item.title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="https://cypressflips.netlify.app/${esc(image)}">
  <meta property="og:url" content="${url}">
  <link rel="stylesheet" href="../css/tailwind.css">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="icon" type="image/png" href="../favicon.png">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body class="bg-gray-50 text-gray-900">
  <main class="py-10 md:py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <a href="../index.html#inventory" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold mb-8">← Back to Cypress Flips</a>
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
        </section>
      </div>
    </div>
  </main>
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, `${item.id}.html`), html);
}
console.log(`Generated ${products.length} product pages.`);
