const jwt = require(`jsonwebtoken`)
const HttpStatus = require('http-status')
const { isValidPassword } = require('../../utils')
const { defaultResponse, errorResponse } = require('../../utils')

class AuthController {
  constructor (models, jwtSecret) {
    const { User } = models

    this.Users = User
    this.jwtSecret = jwtSecret
  }

  async authenticate (req) {
    const { email, password } = req.body

    if (email && password) {
      const user = await this.Users.findOne({ email })
      const validPassword = user
        ? await isValidPassword(password, user.password)
        : false

      if (user && validPassword) {
        const payload = { id: user.id, email: user.email, darkMode: user.darkMode }
        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '12h' })
        const { id, name, email } = user

        return defaultResponse({ id, name, email, token })
      } else {
        return errorResponse(HttpStatus.UNAUTHORIZED)
      }
    } else {
      return errorResponse(HttpStatus.UNAUTHORIZED)
    }
  }
}

module.exports = Object.assign({}, { AuthController })