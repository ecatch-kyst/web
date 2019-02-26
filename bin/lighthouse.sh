#!/bin/bash
set -e

# If there were build failures, abort
if [ "${TRAVIS_TEST_RESULT}" = "1" ]; then
  echo "Deploy aborted, there were build/test failures."
  exit
fi

if [ "${TRAVIS_EVENT_TYPE}" == "pull_request" ]
  # this is a pull request continue.
  then
  # add some delay, so deploy can be propagated.
  sleep 15
  if [ "$TRAVIS_BRANCH" = "master" ]
  then
    yarn lh https://ecatch-kyst.firebaseapp.com
  elif [ "$TRAVIS_BRANCH" = "develop" ]
  then
    yarn lh https://ecatch-kyst-beta.firebaseapp.com
  else
    echo "Target branch should be develop or master, it was $TRAVIS_BRANCH."
    exit
  fi
else
  echo "This only runs on pull_request events. Event was $TRAVIS_EVENT_TYPE."
  exit
fi