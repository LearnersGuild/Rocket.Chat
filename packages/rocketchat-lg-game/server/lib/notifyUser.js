/* global LG_BOT_USERNAME, notifyUser:true, lastSlashCommandRoomIds */
/* exported notifyUser */

const socketCluster = Npm.require('socketcluster-client')

notifyUser = (roomId, message) => {
  const {_id, username, name} = Meteor.users.findOne({username: LG_BOT_USERNAME})
  RocketChat.Notifications.notifyUser(Meteor.userId(), 'lg-slash-command-response', {
    _id: Random.id(),
    rid: roomId,
    ts: new Date(),
    msg: message,
    u: {_id, username, name},
    private: true,
  })
}

let socket
function scConnect() {
  const scHostname = process.env.NODE_ENV === 'development' ? 'game.learnersguild.dev' : 'game.learnersguild.org'
  socket = socketCluster.connect({hostname: scHostname})
  socket.on('connect', () => console.log('... socket connected'))
  socket.on('disconnect', () => console.log('socket disconnected, will try to reconnect socket ...'))
  socket.on('connectAbort', () => null)
  socket.on('error', error => console.warn(error.message))
}

Meteor.methods({
  subscribeToLGUserNotifications() {
    const user = Meteor.user()
    if (user) {
      if (!socket) {
        scConnect()
      }
      if (!user.services || !user.services.lgSSO) {
        const message = `Player notification subscribe not working for ${user.username} (id=${user._id}) because the user record is missing the 'services.lgSSO' attribute`
        RavenLogger.log(message)
        console.error(`[LG SLASH COMMANDS] ${message}`)
        return
      }
      const {lgUser} = user.services.lgSSO
      const channelName = `notifyUser-${lgUser.id}`
      if (!socket.isSubscribed(channelName, true)) {
        const playerNotificationsChannel = socket.subscribe(channelName)
        playerNotificationsChannel.watch(Meteor.bindEnvironment(playerNotification => {
          if (lastSlashCommandRoomIds[user._id]) {
            notifyUser(lastSlashCommandRoomIds[user._id], playerNotification)
          } else {
            const message = `Received player notification for ${user.username} (id=${user._id}), but do not know to which room to send it`
            RavenLogger.log(message)
            console.error(`[LG SLASH COMMANDS] ${message}`)
          }
        }))
      }
    }
  },

  unsubscribeFromLGUserNotifications() {
    const user = Meteor.user()
    if (user) {
      if (!socket) {
        return
      }
      if (!user.services || !user.services.lgSSO) {
        const message = `Player notification unsubscribe not working for ${user.username} (id=${user._id}) because the user record is missing the 'services.lgSSO' attribute`
        RavenLogger.log(message)
        console.error(`[LG SLASH COMMANDS] ${message}`)
        return
      }
      const {lgUser} = user.services.lgSSO
      const channelName = `notifyUser-${lgUser.id}`
      socket.unsubscribe(channelName)
    }
  }
})

/* eslint-disable prefer-arrow-callback */
Meteor.startup(function () {
  scConnect()
})
