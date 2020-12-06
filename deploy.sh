#!/usr/bin/env sh

set -e

npm run build

cd dist

git init

git add -A

git commit -m "deploy"

git push -f https://gitee.com/sherrykeeper/when2meet.git master:gh-pages
