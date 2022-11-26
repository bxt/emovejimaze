#!/usr/bin/env sh

set -e

npm run build

cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f git@github.com:bxt/emovejimaze.git main:gh-pages

cd -