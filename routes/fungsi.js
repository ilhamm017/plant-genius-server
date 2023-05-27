const { Authentication } = require('../middleware/Authentication')

const fungsiRoutes = [
    {
        path: '/fungsi',
        method: 'GET',
        handler: (request, h) => {
        return h.response({
            message: 'pass authentication'
            //TODO sambungin ke ML
        })
        },
        options: {
            pre: [Authentication]
        }
    }
]

module.exports = { fungsiRoutes }