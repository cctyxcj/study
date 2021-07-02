const getters = {
  /* app */
  sidebar: state => state.app.sidebar,

  /* user */
  userInfo: state => state.account.userInfo,
  roles: state => state.account?.userInfo?.sysMenuEntities,

  /* message */
  eventHub: state => state.message.eventHub,
  messageAmount: state => state.message.messageAmount || 0,

  /* permission */
  permission_routes: state => state.permission.routes
}

export default getters
