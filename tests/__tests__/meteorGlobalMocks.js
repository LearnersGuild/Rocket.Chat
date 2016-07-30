// defined by Meteor, with LG-specific hooks
global.Accounts = {
  registerLoginHandler() {}
}
global.ChatMessage = {}
global.HTTP = {}
global.Meteor = {
  methods() {},
  publish() {},
  startup() {},
  subscribe() {},
  server: {
    method_handlers: {
      getSentryClientDSN() {}
    }
  }
}
global.Npm = {
  depends() {},
  require() {
    return {
      userFromJWT: () => null
    }
  }
}
global.Package = {
  describe() {},
  onUse() {}
}
global.Random = {}
global.RavenLogger = {}
global.Restivus = () => ({
  addRoute() {}
})
global.RocketChat = {}
global.Session = {}
global.Template = {
  flexPanel: {
    helpers() {}
  },
  flexPanelIframe: {},
  loginLayout: {}
}
global.Tracker = {}

// defined by LG packages
global.GAME = null
global.IDM = null
global.LG_BOT_USERNAME = null
global.apiHeaders = null
global.commandFuncs = {}
global.ensureFlexPanelTemplate = null
global.formatError = null
global.formatMessage = null
global.formatUsage = null
global.getPackageLogger = null
global.getServiceBaseURL = null
global.graphQLFetcher = null
global.lastSlashCommandRoomIds = null
global.logger = null
global.notifyUser = null
global.openFlexPanel = null
global.rawGraphQLFetcher = null
global.toggleFlexPanel = null
global.tokenizeCommandString = null
global.userFromJWT = null
