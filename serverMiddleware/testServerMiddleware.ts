import { ServerMiddleware } from '@nuxt/types'
const middleware: ServerMiddleware = function (req, res, next) {
  // req is the Node.js http request object
  console.log('req.url', req.url)
  res.end('hello server middleware')

  // res is the Node.js http response object

  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  // next()
}

export default middleware
