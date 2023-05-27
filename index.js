'use strict'

const Hapi = require('@hapi/hapi');
const { userRoutes } = require('./routes/user')
const { fungsiRoutes } = require('./routes/fungsi')

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

async function startServer() {
  await server.start();
  console.log('Server running on', server.info.uri);
}

server.route(userRoutes);
server.route(fungsiRoutes)

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
