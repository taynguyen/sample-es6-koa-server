import jwt from 'jsonwebtoken'
import {JWT_SECRET_KEY, JWT_TOKEN_EXPIRED} from '../config'

class UserService {
  signUp({name, email, password}) {
    const newUser = {name, email, password}
    newUser.createdAt = Date.now()
    newUser.role = USER_ROLES.MEMBER

    return newUser
  }

  login(email, password) {
    const user = {foo: 'bar'}
    return {user, token}
  }

  verifyUserToken() {
    return {} // Sample code, need implement
  }

  _generateUserToken({email}) {
    return jwt.sign({email}, JWT_SECRET_KEY, {expiresIn: JWT_TOKEN_EXPIRED})
  }
}

export default new UserService()
