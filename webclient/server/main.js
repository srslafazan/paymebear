const express = require('express')
const next = require('next')
const cors = require('cors')
// const proxyMiddleware = require('http-proxy-middleware')

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

// const GATEWAY_HOST = process.env.GATEWAY_HOST || '127.0.0.1'
// const GATEWAY_PORT = process.env.GATEWAY_PORT || '8000'

// const proxy = {
//   '/api': {
//     target: `http://${GATEWAY_HOST}:${GATEWAY_PORT}`,
//     secure: false,
//   },
//   '/graphql': {
//     target: `http://${GATEWAY_HOST}:${GATEWAY_PORT}`,
//     secure: false,
//   },
//   '/subscriptions':  {
//     target: `ws://${GATEWAY_HOST}:${GATEWAY_PORT}`, // TODO wss
//     secure: false,
//     ws: true,
//   },
// }

module.exports = async function main () {
  await app.prepare()
  const server = express()

  server.use(cors())

  // Object.entries(proxy).forEach(([context, target]) => server.use(proxyMiddleware(context, target)))

  /* Standard page routing */
  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
}
