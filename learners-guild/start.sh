#!/bin/sh

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
echo "Loading Learners Guild Environment"

cd "$ROOT"

source .env
for var in `cat .env | grep = | cut -f1 -d=`
do
  export "$var"
done
echo "Starting Meteor"

meteor

cd -
