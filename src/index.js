import Path from 'path'
import App from './app.js'
import {requireDir} from './utils/file'

const controllersPath = Path.join(__dirname, './controllers')
const app = new App({
  port: 3000,
  controllers: requireDir(controllersPath, ['base.js'])
})

app.start()
