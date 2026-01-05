#!/bin/bash

# Script to set up git hooks for preventing WIP commits in production
# This should be run once per repository clone

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
GIT_HOOKS_DIR="$REPO_ROOT/.git/hooks"

echo "🔒 Setting up Git protection hooks..."
echo ""

# Check if we're in a git repository
if [ ! -d "$REPO_ROOT/.git" ]; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Create hooks directory if it doesn't exist
mkdir -p "$GIT_HOOKS_DIR"

# Copy pre-push hook
if [ -f "$GIT_HOOKS_DIR/pre-push" ]; then
    echo "⚠️  pre-push hook already exists. Backing up..."
    mv "$GIT_HOOKS_DIR/pre-push" "$GIT_HOOKS_DIR/pre-push.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Copy pre-commit hook
if [ -f "$GIT_HOOKS_DIR/pre-commit" ]; then
    echo "⚠️  pre-commit hook already exists. Backing up..."
    mv "$GIT_HOOKS_DIR/pre-commit" "$GIT_HOOKS_DIR/pre-commit.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Make hooks executable
chmod +x "$GIT_HOOKS_DIR/pre-push" 2>/dev/null || true
chmod +x "$GIT_HOOKS_DIR/pre-commit" 2>/dev/null || true

echo "✅ Git hooks installed successfully!"
echo ""
echo "📋 Protection features:"
echo "  • Pre-commit: Warns when committing WIP to main branch"
echo "  • Pre-push: Blocks pushing WIP commits to protected branches (main/master/production)"
echo ""
echo "🧪 Test the protection:"
echo "  git commit --allow-empty -m 'WIP: test commit'"
echo "  git push origin main  # Should be blocked"
echo ""



