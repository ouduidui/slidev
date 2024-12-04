import path from 'path'
import fs from 'fs'

export const getSlidesPath = () => {
  const slidesDir = path.resolve(path.dirname('../'), './slides')
  const dir = fs.readdirSync(slidesDir)
  return dir.map((item) => ({
    fileName: item,
    path: `./slides/${item}/index.md`
  }))
}