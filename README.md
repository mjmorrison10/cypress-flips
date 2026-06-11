# Cypress Flips

A static storefront website for Cypress Flips, a local resale/liquidation shop based in Cypress, CA.

## Features

- Product inventory cards and product detail pages
- Premium picks section with low/mid/high featured offers
- Search, category filtering, price filtering, and sorting
- Light/dark mode with device preference detection
- Product inquiry forms routed to `mjmorrisonusa@gmail.com`
- Social links for Facebook, Instagram, and eBay
- Firebase-ready customer experience:
  - Email/password login
  - Google/Facebook login support
  - Customer profiles
  - Profile pictures
  - Bios/about-me fields
  - Favorite products
  - Product comments/reviews
  - Testimonials
  - Review reporting/moderation foundation

## Project structure

```text
index.html
css/
  styles.css
js/
  script.js
  community.js
  firebase-config.js
images/
  action figure/
  plushie/
  video games/
firebase-rules.txt
```

## Local testing

Because this site uses JavaScript modules for Firebase, do not test by opening `index.html` directly as a `file://` URL.

Instead, run a local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Firebase setup

The site uses Firebase client-side SDKs. The web app config lives in:

```text
js/firebase-config.js
```

This config is intended to be public in a client-side Firebase app. Security must be enforced with Firebase Authentication, Firestore rules, Storage rules, and authorized domains.

See:

```text
firebase-rules.txt
```

for starter Firestore and Storage rules.

### Firebase checklist

1. Create a Firebase project.
2. Add a Web App.
3. Copy the Firebase web config into `js/firebase-config.js`.
4. Enable Authentication providers:
   - Email/password
   - Google
   - Facebook, if desired
5. Create Firestore Database.
6. Create Firebase Storage.
7. Publish the rules from `firebase-rules.txt` after reviewing/testing them.
8. Add your deployed domain to Firebase Authentication authorized domains.
9. To make yourself an admin, set your profile document:

```text
profiles/{your_uid}
role: "admin"
```

## Deployment

This is a static website and can be hosted on:

- GitHub Pages
- Firebase Hosting
- Netlify
- Vercel
- Cloudflare Pages

For GitHub Pages, deploy the root of the repository.

## Notes

- Firebase API keys in a client-side app are not server secrets, but your Firestore/Storage rules must be secure.
- Do not commit Firebase Admin SDK service account JSON files.
- Keep product images inside the `images/` folder using the existing category structure.

## Seasonal color schemes

The site supports manual and automatic color schemes.

To manually change the color scheme in source code, edit:

```text
js/site-settings.js
```

Change:

```js
colorScheme: "auto"
```

to one of:

```text
default
patriot
christmas
halloween
thanksgiving
newyear
valentines
stpatricks
easter
premium
blackout
catholic
lakers
pacific
rosewood
auto
```

`auto` uses America/Los_Angeles dates and switches for major holidays.

When Firebase admin features are enabled, admins/moderators can also change the site-wide theme from the Profile → Admin panel.


Specialty manual themes:

- `premium`: gold, black, and platinum luxury look
- `blackout`: full blacked-out high-contrast theme
- `catholic`: reverent Catholic-inspired palette with subtle cross / ΙΧΘΥΣ symbolism
- `lakers`: purple and gold
- `pacific`: calm Southern California ocean palette
- `rosewood`: warm boutique rose/wood/cream palette

## Inventory maintenance

Static inventory now lives in:

```text
js/inventory.js
```

The main UI and behavior live in:

```text
js/script.js
```

Until Firebase inventory management is enabled, add/edit products in `js/inventory.js` and store images in the relevant `images/` category folder.

## Performance note

See `IMAGE-OPTIMIZATION.md` for the recommended next step for faster mobile loading: WebP image conversion and thumbnails.

## Inventory status options

Product listings support these `status` values in `js/inventory.js` or Firebase Firestore:

```text
available  - visible and for sale
hold       - temporarily held while a buyer is expected soon
pending    - pickup/payment is expected soon
reserved   - reserved for a buyer
sold       - sold; can be displayed with a sold badge if not hidden
hidden     - hidden from storefront when using Firebase inventory filtering
archived   - archived/removed from active storefront when using Firebase inventory filtering
```

For a quick local hold, use:

```js
status: "hold"
```

## Production build

This project no longer uses the Tailwind CDN. Netlify should run:

```bash
npm run build
```

This builds:

```text
css/tailwind.css
products/*.html
```

## Stripe deposit checkout

A Netlify Function is included at:

```text
netlify/functions/create-checkout-session.mjs
```

To enable real $10 deposit checkout, add this environment variable in Netlify:

```text
STRIPE_SECRET_KEY=sk_live_or_test_...
```

Optional minimum deposit override:

```text
MIN_DEPOSIT_AMOUNT_CENTS=1000
```

Deposit calculation defaults to the higher of $10 or:

```text
10% of product price up to $250
7.5% of product price over $250
5% of product price at $500+
```

The deposit is rounded up to the nearest whole dollar.

Without `STRIPE_SECRET_KEY`, the deposit button will fail gracefully and customers can still use Reserve / Ask to Buy.
