'use strict'

const Hapi = require('@hapi/hapi')
const {userRoutes} = require('./routes/user')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  server.route(userRoutes) // route login register 
  // TODO Middleware
  // TODO route ML
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
