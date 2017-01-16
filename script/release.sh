#!/usr/bin/env bash

set -x            # print commands before execution
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

git clone $npm_package_repository
cd $(basename $npm_package_repository)
npm run build
npm test
[[ `git status --porcelain` ]] || exit
git add .
git config user.email $npm_package_author_email
git config user.name $npm_package_author_name
git commit -am "update $npm_package_name"
npm version minor -m "bump minor to %s"
npm publish
git push origin master --follow-tags
