/* eslint-disable prefer-arrow-callback */
Meteor.startup(function () {
  Meteor.call('getSentryClientDSN', (err, sentryClientDSN) => {
    if (err) {
      console.error('ERROR invoking getSentryClientDSN(): could not get Sentry client DSN.')
      return
    }
    if (sentryClientDSN) {
      RavenLogger.initialize({
        client: sentryClientDSN,
      })
    }
  })
})
