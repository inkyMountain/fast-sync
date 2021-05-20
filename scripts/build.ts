// const all = require('nuxt')
// const { build, loadNuxt } = all
// process.env.NODE_ENV = 'production'
// // Check if we need to run Nuxt in development mode
// // const isDev = process.env.NODE_ENV !== 'production'
// const isDev = true
//
// // Get a ready to use Nuxt instannce
// const xxx = loadNuxt(isDev ? 'dev' : 'start')
// xxx.then((nuxt) => {
//   // Enable live build & reloading on dev
//   if (isDev) {
//     build(nuxt)
//   }
// })

// const { Nuxt, Builder } = require('nuxt')
// process.env.NODE_ENV = 'production'
// const options = require('../nuxt.config.js')
// const nuxt = new Nuxt(options)
//
// new Builder(nuxt).build({ dev: false }).then((builder) => {
//   console.log('result ============>', builder)
// })

const { exec } = require('child_process')
const { promisify } = require('util')
const execPromise = promisify(exec)
execPromise('yarn build').then((stdout) => {
  console.log('stdout ============>', stdout)
}).then(() => {
  return execPromise('yarn generate')
}).then(xxx => {
  console.log('xxx ============>', xxx)
})

