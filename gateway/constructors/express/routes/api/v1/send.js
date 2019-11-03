const router = require('express').Router()

module.exports = context => {

  router.get('/', (req, res) => {
    return res.status(200).send({ hello: 'world' })
  })

  return router
}
