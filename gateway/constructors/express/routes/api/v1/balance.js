const router = require('express').Router()
const zabo = require('zabo-sdk-js')

module.exports = context => {
  router.get('/', async (req, res) => {
    // return res.status(200).send({ yes: true })
    try {
      let app = await zabo.init({
        apiKey: process.env.PMB_SANDBOX_ZABO_PRIVATE_KEY,
        secretKey: process.env.PMB_SANDBOX_ZABO_SECRET,
        env: 'sandbox',
      })
    } catch (error) {
      console.log(error)
    }
    const users = await zabo.users.getList()
    return res.status(200).send({ users })
  })

  return router
}

