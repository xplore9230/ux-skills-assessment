#!/bin/bash

# Script to set up WIP repository
# Usage: ./setup-wip-repo.sh <github-username> <repo-name>

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./setup-wip-repo.sh <github-username> <repo-name>"
    echo "Example: ./setup-wip-repo.sh xplore9230 ux-skills-assessment-wip"
    exit 1
fi

GITHUB_USER=$1
REPO_NAME=$2
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

echo "Setting up WIP repository..."
echo "Repository URL: $REPO_URL"
echo ""

# Check if wip remote already exists
if git remote | grep -q "^wip$"; then
    echo "WIP remote already exists. Updating URL..."
    git remote set-url wip "$REPO_URL"
else
    echo "Adding WIP remote..."
    git remote add wip "$REPO_URL"
fi

echo ""
echo "Current remotes:"
git remote -v

echo ""
echo "Next steps:"
echo "1. Make sure the repository '$REPO_NAME' exists on GitHub"
echo "2. Run: git push -u wip main"
echo "   (or git push -u wip <branch-name> for a different branch)"

