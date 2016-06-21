#!/bin/sh
echo "Updating Echo Chat Dependencies"

echo "Git: Pulling repos"
echo "Git: Pulling rocketchat-ls-sso"
cd ../rocketchat-lg-sso
git pull origin master

echo "Git: Pulling rocketchat-ls-slash-commands"
cd ../rocketchat-lg-slash-commands
git pull origin master

echo "Git: Pulling rocketchat-lg-api-extensions"
cd ../rocketchat-lg-api-extensions
git pull origin master

echo "Meteor: Removing packages"
cd ../echo-chat
echo "Meteor: Removing learnersguild:rocketchat-lg-sso"
meteor remove learnersguild:rocketchat-lg-sso
echo "Meteor: Removing learnersguild:rocketchat-lg-sso"
meteor remove learnersguild:rocketchat-lg-slash-commands

echo "Creating package symlinks"
cd packages
ln -s ../../rocketchat-lg-sso .
ln -s ../../rocketchat-lg-slash-commands .

echo "Meteor: Adding packages"
cd ..
echo "Meteor: Adding learnersguild:rocketchat-lg-sso"
meteor add learnersguild:rocketchat-lg-sso
echo "Meteor: Adding learnersguild:rocketchat-lg-slash-commands"
meteor add learnersguild:rocketchat-lg-slash-commands
