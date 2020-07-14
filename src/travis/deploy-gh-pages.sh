#!/usr/bin/env bash
if [ $TRAVIS_PULL_REQUEST == false ] ; then
 
  if [ "${TRAVIS_BRANCH}" == "master" ]
  then
    export VERSION=""
  else
    export VERSION="${TRAVIS_BRANCH}"
  fi

  git remote add -t gh-pages -f origin-gh-pages https://github.com/${TRAVIS_REPO_SLUG}
  git fetch origin-gh-pages
  git checkout .
  git checkout gh-pages
  
  git checkout ${TRAVIS_BRANCH} -- ./src

  node ./src/docs/GenerateFileSchema.js
  graphdoc -s ./src/docs/schemaDoc.graphql -o ./${VERSION} -f
  
  rm -fr ./_static
  git rm -r ./src -f

  git add ${VERSION}
  git status
  ls
  git commit -m 'Updating gh-pages' 
   git status
  ls
  git push --force http://${GITHUB_TOKEN}:x-oauth-basic@github.com/${TRAVIS_REPO_SLUG} gh-pages
  
  
  git checkout -- .
  git clean -fd
  git checkout ${TRAVIS_BRANCH}
  
fi
