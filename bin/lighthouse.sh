#!/bin/bash


# Add some delay, so deploy can be propagated.
sleep 15

# NOTE: Add tresholds
TRESHOLDS="--pwa=1"

if [ "$TRAVIS_PULL_REQUEST" != false ]
  then
  if [ "$TRAVIS_BRANCH" = "master" ]
  then
    yarn lh $TRESHOLDS https://ecatch-kyst.firebaseapp.com
  elif [ "$TRAVIS_BRANCH" = "develop" ]
  then
    yarn lh $TRESHOLDS https://ecatch-kyst-beta.firebaseapp.com
  fi
fi

exit 0