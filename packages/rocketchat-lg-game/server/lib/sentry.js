if (!Meteor.server.method_handlers.getSentryClientDSN) {
  Meteor.methods({
    getSentryClientDSN() {
      return process.env.SENTRY_CLIENT_DSN || null
    },
  })
}

/* eslint-disable prefer-arrow-callback */
Meteor.startup(function () {
  if (process.env.SENTRY_SERVER_DSN) {
    RavenLogger.initialize({
      server: process.env.SENTRY_SERVER_DSN,
    })
  }
})
