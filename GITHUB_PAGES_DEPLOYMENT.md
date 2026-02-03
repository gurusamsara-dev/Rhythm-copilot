# GitHub Pages Deployment Guide

## Which Branch Should I Push the Pages?

For deploying the Rhythm Copilot web prototype to GitHub Pages, you have **three main options**:

### Option 1: Use `gh-pages` Branch (Recommended for this project)

This is the traditional and most common approach for GitHub Pages:

**Steps:**
1. Create a new `gh-pages` branch from your current work
2. Copy the `web-prototype/` contents to the root of the `gh-pages` branch
3. Push the `gh-pages` branch to GitHub
4. Configure GitHub Pages to use the `gh-pages` branch

**Commands:**
```bash
# From your current branch with web-prototype
git checkout -b gh-pages

# Move web-prototype contents to root for GitHub Pages
cp web-prototype/index.html index.html
cp web-prototype/app.js app.js

# Or if you want to keep the web-prototype structure:
# Leave files as is, and GitHub Pages will serve from root

# Commit and push
git add .
git commit -m "Deploy web prototype to GitHub Pages"
git push origin gh-pages
```

**Why this option?**
- Keeps deployment separate from development branches
- Standard practice for project pages
- Easy to manage and update

### Option 2: Use `main` Branch with `/docs` Folder

GitHub Pages can serve from a `/docs` folder on the `main` branch:

**Steps:**
1. Create a `docs/` folder in the `main` branch
2. Copy `web-prototype/` contents into `docs/`
3. Configure GitHub Pages to use `main` branch `/docs` folder

**Commands:**
```bash
git checkout main
mkdir -p docs
cp web-prototype/index.html docs/
cp web-prototype/app.js docs/
git add docs/
git commit -m "Add web prototype to docs for GitHub Pages"
git push origin main
```

**Why this option?**
- Keeps everything in one branch
- Good for documentation sites
- Easy to maintain alongside code

### Option 3: Use `main` Branch Root

Serve directly from the root of the `main` branch:

**Steps:**
1. Merge your prototype into `main` branch root
2. Configure GitHub Pages to use `main` branch root

**Why NOT this option for this project?**
- ❌ Mixes source code with deployment files
- ❌ Root already has a different index.html
- ❌ Less organized structure

---

## Recommended Setup: Option 1 (gh-pages)

Based on your current repository structure, **Option 1** is recommended:

### Quick Setup Script:

```bash
# 1. Create gh-pages branch
git checkout -b gh-pages

# 2. Clean up and prepare for deployment
# Keep only the web-prototype content
git rm index.html  # Remove root index.html if not needed for pages

# 3. Move web-prototype to root (or keep as-is)
# For cleaner URLs, move to root:
mv web-prototype/index.html index.html
mv web-prototype/app.js app.js
git rm -r web-prototype/

# 4. Commit and push
git add .
git commit -m "Deploy voice-controlled metronome to GitHub Pages"
git push origin gh-pages
```

### Configure GitHub Pages:

1. Go to your repository on GitHub: `https://github.com/gurusamsara-dev/Rhythm-copilot`
2. Click **Settings** → **Pages**
3. Under "Source", select branch: **`gh-pages`**
4. Select folder: **`/ (root)`**
5. Click **Save**

Your site will be available at:
```
https://gurusamsara-dev.github.io/Rhythm-copilot/
```

---

## Alternative: Keep web-prototype Structure

If you want to keep the `web-prototype/` folder structure:

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Then configure GitHub Pages to serve from `gh-pages` branch root.

Your site will be available at:
```
https://gurusamsara-dev.github.io/Rhythm-copilot/web-prototype/
```

---

## After Deployment

Once deployed, you can update the Pages by:

```bash
# Make changes to your prototype
git checkout gh-pages
# Make your edits
git add .
git commit -m "Update web prototype"
git push origin gh-pages
```

GitHub Pages will automatically rebuild and deploy within a few minutes.

---

## Summary

**Answer: Push to `gh-pages` branch**

This is the recommended and most common approach for GitHub Pages deployment. It keeps your deployment separate from your development branches and is easy to manage.

To get started quickly:
1. Create `gh-pages` branch
2. Ensure your web-prototype files are ready
3. Push to `origin gh-pages`
4. Configure in GitHub Settings → Pages
