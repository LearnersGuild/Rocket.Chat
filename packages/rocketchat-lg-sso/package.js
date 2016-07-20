Package.describe({
  name: 'learnersguild:rocketchat-lg-sso',
  version: '1.0.1',
  summary: 'Accounts login handler for Learners Guild SSO.',
  git: 'https://github.com/LearnersGuild/rocketchat-lg-sso'
})

/* eslint-disable prefer-arrow-callback */
Package.onUse(function (api) {
  api.versionsFrom('1.2.1')

  api.use([
    'ecmascript',
    'deepwell:raven@0.3.0',
    'evaisse:http-query-string@0.0.1',
  ])
  api.use([
    'rocketchat:lib@0.0.1',
  ], {weak: true, unordered: false})
  api.use([
    'templating'
  ], 'client')
  api.use([
    'accounts-base',
    'webapp',
  ], 'server')

  api.addFiles([
    'lib/graphQLFetcher.js',
    'lib/mapEmoji.js',
  ])
  api.addFiles([
    'client/sentry.js',
    'client/sso.js',
    'client/slidingSession.js',
  ], 'client')
  api.addFiles([
    'server/sentry.js',
    'server/sso.js',
    'server/startup.js',
  ], 'server')

  api.export('userFromJWT', 'server')
  api.export('LG_BOT_USERNAME', 'server')
})

Npm.depends({
  '@learnersguild/idm-jwt-auth': '0.2.5'
})
