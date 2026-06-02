# Firebase Troubleshooting for Cypress Flips

## 1. Missing or insufficient permissions

If the Admin Listing Manager says:

```text
Missing or insufficient permissions
```

check these items:

### Publish the updated Firestore rules

Go to:

```text
Firebase Console → Firestore Database → Rules
```

Paste the Firestore rules from `firebase-rules.txt`, then click **Publish**.

### Make sure your user is really an admin

Go to:

```text
Firebase Console → Authentication → Users
```

Copy your user UID.

Then go to:

```text
Firestore Database → Data → profiles → {your_uid}
```

Make sure the document ID is your UID, not your email address.

Add this field exactly:

```text
role: "admin"
```

For moderators:

```text
role: "moderator"
```

### Owner email fallback

The updated rules also allow the owner email:

```text
mjmorrisonusa@gmail.com
```

when signed in with a verified email provider, such as Google. Still, the recommended long-term setup is setting `role: "admin"` on your profile document.

## 2. Storage CORS error on Netlify

If the console shows something like:

```text
blocked by CORS policy
firebasestorage.googleapis.com ... net::ERR_FAILED
```

then set CORS on your Firebase Storage bucket.

This workspace includes:

```text
cors.json
```

### Option A: Google Cloud Shell

Open Google Cloud Shell from the Google Cloud Console for the same Firebase project, upload `cors.json`, then run:

```bash
gsutil cors set cors.json gs://cypressflips.firebasestorage.app
```

Check it with:

```bash
gsutil cors get gs://cypressflips.firebasestorage.app
```

### Option B: gcloud storage command

If `gsutil` is not available:

```bash
gcloud storage buckets update gs://cypressflips.firebasestorage.app --cors-file=cors.json
```

## 3. Publish Storage rules

Go to:

```text
Firebase Console → Storage → Rules
```

Paste the Storage rules from `firebase-rules.txt`, then click **Publish**.

The rules allow admins/moderators to upload product images to:

```text
product-images/{productId}/{fileName}
```

## 4. Netlify authorized domain

Go to:

```text
Firebase Console → Authentication → Settings → Authorized domains
```

Make sure this is listed:

```text
cypressflips.netlify.app
```

## 5. Quick test order

1. Sign in with Google using `mjmorrisonusa@gmail.com`.
2. Confirm your profile document exists under `profiles/{your_uid}`.
3. Set `role: "admin"`.
4. Publish Firestore rules.
5. Publish Storage rules.
6. Set bucket CORS using `cors.json`.
7. Refresh the site and try **Sync Current Inventory** again.
