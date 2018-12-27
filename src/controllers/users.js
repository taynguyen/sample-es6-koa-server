import HttpStatusCodes from 'http-status-codes'
import bodyParser from 'koa-bodyparser'
import lodashGet from 'lodash/get'
import {controller, get, post} from 'route-decorators'
import BaseController from './base'
import {USER_ROLES} from '../constants'
import {auth} from '../middlewares'
import usersService from '../services/users'
import debug from '../utils/debug'

@controller('/users', bodyParser())
export default class UsersController extends BaseController {
  @post('/signup')
  async signUp(ctx, next) {
    const {name, email, password} = ctx.request.body

    try {
      await usersService.signUp({name, email, password})
      ctx.status = HttpStatusCodes.OK
    }
    catch (err) {
      debug.error('Can not create new user', err)
      ctx.status = HttpStatusCodes.INTERNAL_SERVER_ERROR
    }
  }

  @post('/signin')
  async signin(ctx, next) {
    const {email, password} = ctx.request.body
    const {user, token} = await usersService.login(email, password)

    let success = false
    let data = []
    if (user) {
      ctx.set('udid', token)
      success = true
    }

    ctx.body = {success, data}
  }

  @post('/signout', auth())
  signout(ctx, next) {
    const uuid = lodashGet(ctx, 'request.headers.uuid')
    const user = ctx.state.user
    usersService.logout(user, uuid)

    ctx.status = HttpStatusCodes.OK
  }
}
