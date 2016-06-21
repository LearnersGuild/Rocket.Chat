#!/bin/sh
echo "\nUpdating Echo Chat Dependencies"

echo "\nUpdating local copies of packages"
cd ../rocketchat-lg-api-extensions
git pull origin master

cd ../rocketchat-lg-sso
git pull origin master

cd ../rocketchat-lg-slash-commands
git pull origin master

echo "\nRemoving meteor packages"
cd ../echo-chat
meteor remove learnersguild:rocketchat-lg-api-extensions
meteor remove learnersguild:rocketchat-lg-sso
meteor remove learnersguild:rocketchat-lg-slash-commands

echo "\nCreating package symlinks"
cd packages
ln -s ../../rocketchat-lg-api-extensions .
ln -s ../../rocketchat-lg-sso .
ln -s ../../rocketchat-lg-slash-commands .

echo "\nAdding meteor packages"
cd ..
meteor add learnersguild:rocketchat-lg-api-extensions
meteor add learnersguild:rocketchat-lg-sso
meteor add learnersguild:rocketchat-lg-slash-commands
