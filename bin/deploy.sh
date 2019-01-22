#!/bin/bash


BRANCH_REGEX="^master|develop$"

if [ $TRAVIS_BRANCH =~ $BRANCH_REGEX ]; then
  firebase deploy -P $TRAVIS_BRANCH --token $FIREBASE_TOKEN
elif [ $TRAVIS_PULL_REQUEST != false ]; then
  firebase deploy -P develop --token $FIREBASE_TOKEN
else
  echo "No need to deploy."
fi

exit 0