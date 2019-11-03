const router = require('express').Router()

const v1 = context => {
  router.use('/send', require('./v1/send')(context))
  router.use('/balance', require('./v1/balance')(context))
  return router
}

module.exports = (context) => {
  router.get('/health', (req, res, next) => res.send({ healthy: true }))
  router.get('/version', (req, res, next) => res.send({ version: require('../../../../package.json').version }))
  // router.use('/v1/balance', require('./v1/balance')(context))
  router.use('/v1', v1(context))
  return router
}
