#!/usr/bin/env node

/**
 * Import Cypress Flips static inventory seed data into Firestore.
 *
 * Usage:
 *   npm install
 *   npm run import:products:dry
 *   npm run import:products
 *
 * Auth options:
 *   1. Put your Firebase service account JSON at ./service-account.json
 *      OR
 *   2. Set GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
 *
 * IMPORTANT: Never commit service-account.json to GitHub.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
let admin;

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const noEnable = args.has('--no-enable');
const seedPath = process.env.SEED_FILE || path.resolve('firebase-products-seed.json');
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.resolve('service-account.json');

function readJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

async function initializeFirebaseAdmin() {
  if (!admin) {
    admin = (await import('firebase-admin')).default;
  }
  if (admin.apps.length) return;

  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = readJSON(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
    return;
  }

  // Works if you have already authenticated with Google Application Default Credentials.
  // Example: gcloud auth application-default login
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || 'cypressflips',
  });
}

function cleanProductData(product) {
  const { updatedAtNote, ...data } = product;
  return {
    ...data,
    price: Number(data.price || 0),
    isPremium: Boolean(data.isPremium),
    images: Array.isArray(data.images) ? data.images : [],
    status: data.status || 'available',
  };
}

async function main() {
  const seed = readJSON(seedPath);
  const products = seed.products || [];

  if (!products.length) {
    throw new Error(`No products found in ${seedPath}`);
  }

  console.log(`Preparing to import ${products.length} products from ${seedPath}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN - no writes' : 'LIVE WRITE'}`);

  if (dryRun) {
    products.forEach(({ docId, data }, index) => {
      console.log(`${String(index + 1).padStart(2, '0')}. products/${docId} → ${data.title} ($${data.price}) [${data.status || 'available'}]`);
    });
    if (!noEnable) console.log('Would also set settings/inventory.useFirestoreInventory = true');
    return;
  }

  await initializeFirebaseAdmin();
  const db = admin.firestore();
  const timestamp = admin.firestore.FieldValue.serverTimestamp();

  // Firestore batches support up to 500 writes. This inventory is small, but keep it safe.
  let batch = db.batch();
  let writes = 0;
  let totalWrites = 0;

  async function commitBatchIfNeeded(force = false) {
    if (writes === 0) return;
    if (force || writes >= 450) {
      await batch.commit();
      totalWrites += writes;
      batch = db.batch();
      writes = 0;
    }
  }

  for (const { docId, data } of products) {
    if (!docId) throw new Error(`Missing docId for product: ${JSON.stringify(data)}`);
    const productRef = db.collection('products').doc(docId);
    batch.set(productRef, {
      ...cleanProductData(data),
      id: data.id || docId,
      importedAt: timestamp,
      updatedAt: timestamp,
    }, { merge: true });
    writes += 1;
    await commitBatchIfNeeded();
  }

  if (!noEnable) {
    batch.set(db.collection('settings').doc('inventory'), {
      useFirestoreInventory: true,
      updatedAt: timestamp,
      updatedBy: 'admin-import-script',
    }, { merge: true });
    writes += 1;
  }

  await commitBatchIfNeeded(true);

  console.log(`Import complete. Wrote ${totalWrites} Firestore documents.`);
  if (!noEnable) {
    console.log('Firebase inventory mode is now enabled: settings/inventory.useFirestoreInventory = true');
  }
}

main().catch(error => {
  console.error('\nImport failed:');
  console.error(error.message);
  console.error('\nChecklist:');
  console.error('1. Run: npm install');
  console.error('2. Download a Firebase service account JSON file.');
  console.error('3. Save it as service-account.json in the project root OR set GOOGLE_APPLICATION_CREDENTIALS.');
  console.error('4. Run: npm run import:products:dry');
  console.error('5. Run: npm run import:products');
  process.exit(1);
});
