export const initialState = () => ({
  awsUrl: 'https://s3-sa-east-1.amazonaws.com/',
  awsBucket: 'not-a-solar-system',
  company: 'Not a solar system',
  userId: '',
  username: '',
  userEmail: '',
  userAvatar: '',
  isLoggedIn: false,
  jwt: '',
  appMainColor: 'blue darken-2',
  isDarkTheme: true,
  snackbar: false,
  snackbarText: '',
  snackbarColor: 'info',
  snackbarTimeout: 2000,
  productsList: [],
  productsCount: 0
})

export const state = { ...initialState() }
