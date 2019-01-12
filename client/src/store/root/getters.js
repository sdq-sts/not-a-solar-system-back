export const getters = {
  jwt: (state) => state.jwt,
  userId: (state) => state.userId,
  company: (state) => state.company,
  username: (state) => state.username,
  userEmail: (state) => state.userEmail,
  userAvatar: (state) => state.userAvatar,
  isLoggedIn: (state) => state.isLoggedIn,
  darkMode: (state) => state.darkMode,
  snackbar: (state) => state.snackbar,
  snackbarText: (state) => state.snackbarText,
  snackbarColor: (state) => state.snackbarColor,
  awsBucketUrl: (state) => `${state.awsUrl}/${state.awsBucket}`,
  getImage: (state) => (key) => `${state.awsUrl}/${state.awsBucket}/${key}`
}
