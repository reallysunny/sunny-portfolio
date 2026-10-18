#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
command -v gh >/dev/null || { echo 'Install the GitHub CLI: brew install gh'; exit 1; }
gh api user --jq .login >/dev/null || { echo 'Sign in first: gh auth login -h github.com'; exit 1; }
owner="$(gh api user --jq .login)"
repo="sunny-portfolio"
full_repo="$owner/$repo"
if [ -d .git ]; then
  remote="$(git remote get-url origin 2>/dev/null || true)"
  case "$remote" in
    "https://github.com/$full_repo.git"|"git@github.com:$full_repo.git"|"https://github.com/$full_repo") ;;
    *) echo 'This folder already has a different Git repository. Stopping to protect it.'; exit 1 ;;
  esac
else
  if gh repo view "$full_repo" >/dev/null 2>&1; then
    echo "https://github.com/$full_repo already exists. Stopping without modifying it."
    echo 'Choose another repository name in launch.sh, then run it again.'
    exit 1
  fi
  git init -b main
  git add index.html styles.css app.js assets .github .gitignore .nojekyll README.md launch.sh
  git -c user.name="$owner" -c user.email="$owner@users.noreply.github.com" commit -m 'Create Sunny Desai portfolio'
  gh repo create "$full_repo" --public --source . --remote origin --description 'Sunny Desai — software engineering portfolio and resume'
fi
if ! gh api "repos/$full_repo/pages" >/dev/null 2>&1; then
  gh api --method POST "repos/$full_repo/pages" -f build_type=workflow >/dev/null
fi
git add index.html styles.css app.js assets .github .gitignore .nojekyll README.md launch.sh
if ! git diff --cached --quiet; then
  git -c user.name="$owner" -c user.email="$owner@users.noreply.github.com" commit -m 'Update Sunny Desai developer workspace portfolio'
fi
git push -u origin main
url="https://$owner.github.io/$repo/"
gh repo edit "$full_repo" --homepage "$url"
echo "GitHub Pages deployment started: $url"
echo "Follow deployment: https://github.com/$full_repo/actions"
echo 'The first deployment may take several minutes.'
