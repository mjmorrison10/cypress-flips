# Managing Cypress Flips Inventory Directly in Firebase

Yes — you can manage inventory directly in Firebase without paying for Firebase Storage.

The key distinction is:

- **Firestore Database** stores listing data: title, price, status, descriptions, image paths, etc.
- **Firebase Storage** stores uploaded image files.

You can skip Firebase Storage for now by using image paths that already exist in the website repository, such as:

```text
images/plushie/bambi_main.jpg
images/video games/SwitchOEM_Main.jpg
```

That means you can update prices, mark items sold/reserved, edit descriptions, and add listings from Firebase Console without changing code — as long as the listing images already exist in the deployed website or are hosted somewhere else.

---

## How the website already works

The website currently supports two inventory sources:

1. **Static inventory** from:

```text
js/inventory.js
```

2. **Firebase inventory** from Firestore:

```text
products/{productId}
```

The website switches to Firebase inventory when this document exists:

```text
settings/inventory
```

with this field:

```text
useFirestoreInventory: true
```

If that setting is true, the site reads the `products` collection and displays those products instead of the static inventory.

---

## Recommended Firestore structure

### Collection

```text
products
```

### Document ID

Use the product slug/id, for example:

```text
ps2-fat-bundle
nintendo-switch-oem-accessory-bundle
disney-store-bambi-mini-bean-bag-plush
```

### Product fields

Each product document should have fields like:

```js
{
  id: "ps2-fat-bundle",
  title: "Sony PlayStation 2 (Fat) Ultimate Bundle - 27 Games",
  category: "Video Games",
  price: 275,
  shortDesc: "Short product summary here.",
  fullDesc: "Long product description here. HTML like <br><br> is okay.",
  images: [
    "images/video games/Playstation_Bundle_Main.jpg",
    "images/video games/Playstation_Bundle_1.jpg"
  ],
  isPremium: true,
  status: "available",
  sortOrder: 1
}
```

---

## Status options

Use these values:

```text
available
pending
reserved
sold
hidden
archived
```

Recommended usage:

- `available` — visible and for sale
- `pending` — someone is supposed to meet/pay soon
- `reserved` — held for a buyer
- `sold` — sold; can still be displayed later if we add a Sold section
- `hidden` — do not show on website
- `archived` — old/removed listing

Currently the website filters out:

```text
hidden
archived
```

It can still display `sold`, `pending`, and `reserved` with badges if you keep them visible.

---

## One-time setup in Firebase Console

### Step 1: Create inventory setting

Go to:

```text
Firestore Database → Data
```

Create collection:

```text
settings
```

Create document:

```text
inventory
```

Add field:

```text
useFirestoreInventory: true
```

Type: Boolean

This tells the website to use Firestore inventory.

---

### Step 2: Create product documents

Create collection:

```text
products
```

For each product, create a document with the product ID as the document ID.

Example:

```text
products/ps2-fat-bundle
```

Then enter the fields listed above.

---

## Seed file created for you

I created this file:

```text
firebase-products-seed.json
```

It contains every current website product in a Firebase-friendly structure.

You can use it as a copy/paste reference when creating Firestore documents manually.

---

## Can we skip manual entry entirely?

Yes, but with conditions.

### Option A — Use the Admin Listing Manager later

Once Firebase writes are working from the website, click:

```text
Sync Current Inventory
```

That will copy the static inventory into Firestore automatically.

This does **not** require Firebase Storage unless you upload new image files from the admin form.

### Option B — Use an import script

We can create a local import script that uses the Firebase Admin SDK to upload `firebase-products-seed.json` into Firestore.

However, that requires:

- Node.js on your computer
- A Firebase service account JSON key
- Keeping that service account key private and never committing it to GitHub

I did **not** add that script by default because service account keys are sensitive.

### Option C — Manual Firestore entry from your phone

This is the simplest free approach:

1. Open Firebase Console on your iPhone.
2. Go to Firestore Database.
3. Edit the product document.
4. Change `price`, `status`, `shortDesc`, etc.
5. Refresh the website.

This works without Firebase Storage.

---

## Image management without Firebase Storage

If you are not paying for Firebase Storage, do **not** upload product images through the website admin panel.

Instead:

1. Add images to the website repository under:

```text
images/action figure/
images/plushie/
images/video games/
images/accessories/
images/vintage electronics/
```

2. Deploy the website.

3. In Firestore, reference those image paths:

```text
images/plushie/bambi_main.jpg
```

This keeps hosting/images static and free/cheap.

---

## Important rules note

For direct Firebase Console editing, rules do not matter because you are editing as project owner in the Firebase Console.

For the website to read Firestore products, your Firestore rules must allow public reads for `products`.

The current `firebase-rules.txt` is already written for that approach.

For the website admin panel to write products, rules must allow your logged-in user to write. That is where the `role: "admin"` profile matters.

---

## Recommended workflow right now

Since you do not want Firebase Storage billing right now:

1. Keep image uploads manual through the repo.
2. Use Firestore only for editable listing data.
3. Add `settings/inventory` with `useFirestoreInventory: true` only after the `products` collection has been populated.
4. Manage product status/price/title/descriptions directly in Firebase Console from your phone.
5. Use the website admin panel later as an upgrade when billing/storage is worth it.

---

## Quick fields to update from your phone

Most common mobile edits:

```text
price
status
isPremium
shortDesc
fullDesc
```

Example status changes:

```text
available → reserved
reserved → sold
available → hidden
```

