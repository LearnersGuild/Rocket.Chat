# Learners Guild Rocket.Chat

This is Learners Guild's custom fork of Rocket.Chat. The primary difference is the presence of a few custom plugins, a small startup script, and this readme.

## Getting Started

1. Clone the repository.

2. Checkout the `lg-master` branch (if not checked out by default).

3. Setup and run [mehserve][mehserve]. Then figure out which port you intend to use and create the mehserve config file:

```bash
echo 3000 > ~/.mehserve/echo.learnersguild
```

4. Set your `NODE_ENV` environment variable:

```bash
export NODE_ENV=development
```

5. Create your `.env` file for your environment. Example:

```bash
ROOT_URL=http://echo.learnersguild.dev/
CHAT_API_USER_SECRET='s3cr3t-p@ssw0rd'
JWT_PUBLIC_KEY="<IDM PUBLIC KEY (let it
span
multiple
lines)>
"
```

6. Install [Meteor][meteor]

```bash
curl https://install.meteor.com/ | sh
```

7. Run the server:

```bash
learners-guild/start.sh
```

## Need to send a PR Upstream?

1. First, make sure we are tracking `upstream` via git:

```bash
git remote add upstream git@github.com:RocketChat/Rocket.Chat.git
git remote update
```

2. Then, make sure our `develop` branch is sync'ed with `upstream`. If it's your first time:

```bash
git checkout -b develop origin/develop
```

     If you've already worked from the `develop` branch before:

```bash
git checkout develop
```

3. Merge any changes from `upstream`:

```bash
git merge upstream/develop
```

4. Create a branch for your fix. Replace `YOUR_BRANCH_NAME` with something sensible, like your initials followed by the fix you're making, e.g., `jw/fix-double-notifications`:

```bash
git checkout -b YOUR_BRANCH_NAME
```

5. Make your changes. Test them. Commit to your branch, then push to origin:

```bash
git push -u origin YOUR_BRANCH_NAME
```

6. Then go [submit the pull request on Rocket.Chat upstream][rocket-chat-pr].

7. No need to wait for Rocket.Chat to merge-in your changes. In the meantime you can merge your branch with the branch from which we deploy, `lg-master`:

```bash
git checkout lg-master
git merge YOUR_BRANCH_NAME
git push
git push heroku lg-master:master
```


## Differences from Upstream

In order to maintain our own sanity, rather than making lots and lots of changes to Rocket.Chat, we've chosen a strategy of isolating our changes into a few meteor packages. At the time of this writing, those are:

## [learnersguild:rocketchat-lg-sso][rocketchat-lg-sso]

This package is how we integrate our SSO functionality (via [idm][idm]) into Rocket.Chat / Meteor.

## [learnersguild:rocketchat-lg-api-extensions][rocketchat-lg-api-extensions]

This package contains custom API extensions for Rocket.Chat within Learners Guild.

## [learnersguild:rocketchat-lg-slash-commands][rocketchat-lg-slash-commands]

This package contains all of our custom `/slash` commands that interface with our Learners Guild services. For example, `/profile` and `/vote`.

The easiest way to test changes locally (that I've found so far) is to:

1. Uninstall the custom package(s)

2. Create a symbolic link from your clone of the package's git repository into the `packages` directory

3. Re-add the package(s) (it will look for them in the `/packages` folder first):

4. At this point, any changes you make in your cloned repository will cause the Meteor server to restart and the client to reload (which, on Meteor 1.2, takes forever). Once you're confident that things are working, you should bump the version number (using good [semver][semver] practices), publish the package to meteor, and reverse the process you did above:

```bash
meteor remove learnersguild:rocketchat-lg-slash-commands
rm packages/rocketchat-lg-slash-commands
cd ../rocketchat-lg-slash-commands
#
# BUMP VERSION IN package.js
#
cd ../Rocket.Chat
meteor add learnersguild:rocketchat-lg-slash-commands
```

When you re-add the package, be sure that it gets your _newer_ version. I've noticed that sometimes it does and sometimes it doesn't. In the worst case, you can edit the `.meteor/versions` file yourself.

Steps 1-3 for all custom packages can be done by simply executing the provided update script:

```bash
learnersguild/update.sh
```

Make sure you've cloned each package's repo from github into the same directory as the `echo-chat` clone. **Note that this will currently pull the `master` branch for each of those repos**, so if you'd like to incorporate changes in any of those repos that haven't already been merged to master on github, you'll want to update any packages  manually.

## Troubleshooting

- Issue: attempting to update dependencies results in this error:
  ```
  essjay:echo-chat essjay-lg$ meteor add learnersguild:rocketchat-lg-sso
  learnersguild:rocketchat-lg-sso: updating npm dependencies -- @learnersguild/idm-jwt-auth...
   => Errors while adding packages:

  While building package learnersguild:rocketchat-lg-sso:
  error: couldn't install npm package @learnersguild/idm-jwt-auth@0.2.4: Command failed: npm ERR! 404 Not Found
  npm ERR! 404
  npm ERR! 404 'learnersguild/idm-jwt-auth' is not in the npm registry.
  npm ERR! 404 You should bug the author to publish it
  npm ERR! 404
  npm ERR! 404 Note that you can also install from a
  npm ERR! 404 tarball, folder, or http url, or git url.
  ```

  You might have run into an issue with installing scoped packages from NPM and incompatibility with the version of NPM used by meteor. Try updating it:
  ```
  cd ~/.meteor/packages/meteor-tool/1.1.*/mt-*/dev_bundle/lib
  ../bin/npm install npm
  ```

[mehserve]: https://github.com/timecounts/mehserve
[meteor]: https://www.meteor.com/
[rocket-chat-pr]: https://github.com/RocketChat/Rocket.Chat/pulls
[idm]: https://github.com/LearnersGuild/idm
[rocketchat-lg-sso]: https://github.com/LearnersGuild/rocketchat-lg-sso
[rocketchat-lg-api-extensions]: https://github.com/LearnersGuild/rocketchat-lg-api-extensions
[rocketchat-lg-slash-commands]: https://github.com/LearnersGuild/rocketchat-lg-slash-commands
[semver]: http://semver.org/
