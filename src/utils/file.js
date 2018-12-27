import Path from 'path'
import fs from 'fs'

export function requireDir(dirPath, excepts = []) {
  return fs.readdirSync(dirPath)
    .filter((fileName) => !excepts.includes(fileName))
    .map((fileName) => {
      const module = require(Path.join(dirPath, fileName))
      module.srcFileName = Path.parse(fileName).name
      return module
    })
}
