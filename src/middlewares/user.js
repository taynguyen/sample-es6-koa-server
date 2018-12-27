import HttpStatusCodes from 'http-status-codes'
import get from 'lodash/get'
import userService from '../services/users'

export function auth(roles = null) {
  return async (ctx, next) => {
    const uuid = get(ctx, 'request.headers.uuid')

    try {
      const user = userService.verifyUserToken(uuid)

      ctx.state.user = user
    }
    catch (err) {
      ctx.throw(HttpStatusCodes.FORBIDDEN, 'Not authenticated.')
    }

    if (roles && roles.length) {
      const userRole = ctx.state.user.role
      if (!roles.includes(userRole)) {
        ctx.throw(HttpStatusCodes.UNAUTHORIZED, 'Access denied.')
      }
    }

    await next()
  }
}
