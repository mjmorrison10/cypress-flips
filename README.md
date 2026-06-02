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
