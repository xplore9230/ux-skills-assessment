# Preventing WIP Code in Production

## What Happened?

The commit `c02cb60` with message "WIP: Home/Quiz updates..." was accidentally pushed directly to `main` branch, which auto-deployed to production. This happened because:

1. **No branch protection**: GitHub branch protection rules weren't enabled
2. **No git hooks**: No local hooks to prevent WIP commits on main
3. **Direct push**: The commit was pushed to `origin main` instead of `wip main`

## How to Prevent This in the Future

### 1. ✅ Git Hooks (Already Installed)

Git hooks are now installed to prevent this:

- **Pre-commit hook**: Warns when committing WIP to main branch
- **Pre-push hook**: **BLOCKS** pushing WIP commits to protected branches

**Protected branches**: `main`, `master`, `production`, `prod`

**To test:**
```bash
# This will be blocked:
git commit --allow-empty -m "WIP: test"
git push origin main
```

**To install hooks in new clones:**
```bash
./scripts/setup-git-protection.sh
```

### 2. 🔒 GitHub Branch Protection (RECOMMENDED)

Set up branch protection on GitHub to require PRs for `main`:

1. Go to: **Repository Settings** → **Branches**
2. Click **Add rule** for `main`
3. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1
   - ✅ Require branches to be up to date
   - ✅ Do not allow bypassing
   - ✅ Include administrators

See `GITHUB_BRANCH_PROTECTION.md` for detailed instructions.

### 3. 📝 Workflow Best Practices

#### For WIP Work:
```bash
# Option 1: Use WIP repository
git push wip main

# Option 2: Use feature branch
git checkout -b feature/premium-wip
git push origin feature/premium-wip
```

#### For Production-Ready Code:
```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and commit (NO WIP in message)
git commit -m "feat: add new feature"

# 3. Push to feature branch
git push origin feature/my-feature

# 4. Create PR: feature/my-feature → main
# 5. Get approval, then merge
```

### 4. 🚨 Emergency: If WIP Gets to Production

If WIP code accidentally reaches production:

1. **Immediately revert**:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. **Or create a hotfix branch**:
   ```bash
   git checkout -b hotfix/remove-wip-feature
   # Remove WIP code
   git commit -m "fix: remove WIP features from production"
   git push origin hotfix/remove-wip-feature
   # Create PR and merge quickly
   ```

## Current Protection Status

✅ **Git hooks installed** - Will block WIP pushes to main
⚠️ **GitHub branch protection** - **NOT YET CONFIGURED** (recommended to enable)

## Quick Reference

| Action | Command | Protected? |
|--------|---------|-----------|
| Push WIP to WIP repo | `git push wip main` | ✅ Safe |
| Push WIP to main | `git push origin main` | ❌ **BLOCKED** |
| Commit WIP on main | `git commit -m "WIP: ..."` | ⚠️ Warns |
| Push feature branch | `git push origin feature/name` | ✅ Safe |

## Testing Protection

Test that protection works:

```bash
# 1. Try committing WIP on main (should warn)
git checkout main
git commit --allow-empty -m "WIP: test commit"

# 2. Try pushing WIP to main (should block)
git push origin main
# Expected: "❌ BLOCKED: Found WIP commits..."

# 3. Push to WIP repo instead (should work)
git push wip main
# Expected: Success ✅
```

## Summary

- ✅ Git hooks are installed and active
- ⚠️ Enable GitHub branch protection for extra safety
- 📝 Always use feature branches or WIP repo for WIP work
- 🚨 If WIP reaches production, revert immediately



