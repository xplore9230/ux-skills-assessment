#!/bin/bash

# Quick script to push to WIP repository
# Make sure you've created the repo on GitHub first!

REPO_NAME="${1:-ux-skills-assessment-wip}"
GITHUB_USER="${2:-xplore9230}"
WIP_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "🚀 Setting up WIP repository: $REPO_NAME"
echo ""

# Check if wip remote exists, if not add it
if git remote | grep -q "^wip$"; then
    echo "✓ WIP remote already exists, updating URL..."
    git remote set-url wip "$WIP_URL"
else
    echo "✓ Adding WIP remote..."
    git remote add wip "$WIP_URL"
fi

echo ""
echo "Current remotes:"
git remote -v

echo ""
echo "📦 Staging all changes..."
git add .

echo ""
read -p "Commit message (or press Enter for default): " COMMIT_MSG
COMMIT_MSG=${COMMIT_MSG:-"WIP: Current work in progress"}

echo ""
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

echo ""
echo "🚀 Pushing to WIP repository..."
git push -u wip main

echo ""
echo "✅ Done! Your WIP work is now on GitHub."
echo "   Repository: $WIP_URL"
echo ""
echo "To access from another device:"
echo "   git clone $WIP_URL"

