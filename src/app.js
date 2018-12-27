import http from 'http'
import Koa from 'koa'
import Router from 'koa-66'
import debug from './utils/debug'

const DEFAULT_CONFIG = {
  prefix: ''
}

export default class App {
  constructor(config) {
    this._ns = 'app'
    this._config = {
      ...DEFAULT_CONFIG,
      ...config}
    const app = this._app = new Koa()

    this._configApp(this._config)
    this._httpServer = http.createServer(app.callback())
  }

  start() {
    const {port} = this._config
    this._httpServer.listen(port, () => {
      debug.log(this._ns, `Server started on port ${port}`)
    })
  }

  _configApp(config) {
    // Loads controllers
    const controllers = config.controllers
    const controllerInstances = controllers.map((Constructor) => new Constructor())
    const router = new Router()

    for (const instance of controllerInstances) {
      router.mount(config.prefix, instance.router)
    }

    this._app.use(router.routes())
  }
}
