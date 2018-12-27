import Path from 'path'

const appDir = Path.dirname(require.main.filename)
const defaultDbFileDir = Path.join(appDir, '..')
const defaultDbFilePath = Path.join(defaultDbFileDir, 'users.json')
export const DB_FILE_PATH = process.env.USER_SERVICE_DB_FILE_PATH || defaultDbFilePath

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'user_service_shhhh'
export const JWT_TOKEN_EXPIRED = process.env.JWT_TOKEN_EXPIRE_DURATION || '2h'

export const MAX_USERS_PERPAGE = Number(process.env.MAX_USERS_PERPAGE) || 50
