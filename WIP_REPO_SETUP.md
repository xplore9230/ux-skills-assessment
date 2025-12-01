# WIP Repository Setup Guide

## Step 1: Create the Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `ux-skills-assessment-wip` (or any name you prefer)
3. Description: "Work in progress - UX Skills Assessment Quiz"
4. Choose **Private** (recommended for WIP work) or **Public**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Add the Remote and Push

After creating the repository, run:

```bash
# Add the WIP remote (replace with your actual repo name if different)
git remote add wip https://github.com/xplore9230/ux-skills-assessment-wip.git

# Push current branch to WIP repo
git push -u wip main

# Or if you want to push all branches:
git push -u wip --all
```

## Step 3: Push Your Current Work

Since you have uncommitted changes, you can either:

**Option A: Commit and push**
```bash
git add .
git commit -m "WIP: Current work in progress"
git push -u wip main
```

**Option B: Push without committing (stash)**
```bash
git stash
git push -u wip main
git stash pop
```

## Quick Commands

- **Push to WIP**: `git push wip main`
- **Pull from WIP**: `git pull wip main`
- **View remotes**: `git remote -v`
- **Remove WIP remote** (if needed): `git remote remove wip`

## Accessing from Other Devices

1. Clone the WIP repository:
   ```bash
   git clone https://github.com/xplore9230/ux-skills-assessment-wip.git
   ```

2. Or add it as a remote to an existing clone:
   ```bash
   git remote add wip https://github.com/xplore9230/ux-skills-assessment-wip.git
   git fetch wip
   git checkout -b main wip/main
   ```

