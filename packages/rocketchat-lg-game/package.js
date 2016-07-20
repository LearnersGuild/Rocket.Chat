Package.describe({
  name: 'learnersguild:rocketchat-lg-game',
  version: '1.0.1',
  summary: 'Custom functionality for the Learners Guild game (including slash commands for Rocket.Chat).',
  git: 'https://github.com/LearnersGuild/rocketchat-lg-slash-commands'
})

/* eslint-disable prefer-arrow-callback */
Package.onUse(function (api) {
  api.versionsFrom('1.2.1')

  api.use([
    'ecmascript',
    'learnersguild:rocketchat-lg-sso@1.0.0',
    'deepwell:raven@0.3.0'
  ])
  api.use([
    'rocketchat:lib@0.0.1'
  ], {weak: true, unordered: false})
  api.use([
    'templating'
  ], 'client')

  api.addFiles([
    'lib/commandFuncs.js',
    'lib/tokenizeCommandString.js',
  ])
  api.addFiles([
    'client/commands/profile.js',
    'client/commands/retro.js',
    'client/commands/vote.js',
    'client/lib/flexPanel.js',
    'client/lib/getServiceBaseURL.js',
    'client/lib/sentry.js',
    'client/index.js',
    'client/views/flexPanelIframe.html',
    'client/views/flexPanelIframe.js',
  ], 'client')
  api.addFiles([
    'server/lib/format.js',
    'server/lib/notifyUser.js',
    'server/lib/sentry.js',
    'server/index.js',
  ], 'server')
})

Npm.depends({
  '@learnersguild/game-cli': '1.0.0',
  'socketcluster-client': '4.3.17'
})
