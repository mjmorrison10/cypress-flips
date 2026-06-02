# Deployment Notes

## GitHub repository

Remote repository:

```text
https://github.com/mjmorrison10/cypress-flips.git
```

## First push from a local machine

If you are pushing from your own computer:

```bash
git remote add origin https://github.com/mjmorrison10/cypress-flips.git
git branch -M main
git push -u origin main
```

GitHub no longer accepts account passwords for HTTPS Git pushes. Use one of these:

- GitHub CLI: `gh auth login`
- A GitHub Personal Access Token
- SSH remote URL instead of HTTPS

## GitHub Pages

After pushing to GitHub:

1. Go to the repo on GitHub.
2. Open **Settings**.
3. Open **Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save.

After GitHub Pages gives you a URL, add that domain in Firebase:

```text
Firebase Console → Authentication → Settings → Authorized domains
```

## Firebase Hosting alternative

Firebase Hosting is also a good choice because the app already uses Firebase.

Typical setup from your local computer:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

When asked for public directory, use:

```text
.
```

If asked whether to configure as a single-page app, choose `No` for this current site.
