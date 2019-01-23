#!/bin/bash


if [[ "$TRAVIS_BRANCH" =~ ^master|develop$ ]]
  then
  firebase deploy -P "$TRAVIS_BRANCH" --token "$FIREBASE_TOKEN"
elif [ "$TRAVIS_PULL_REQUEST" != false ]
  then
  firebase deploy -P develop --token "$FIREBASE_TOKEN"
else
  echo "No need to deploy."
fi

exit 0