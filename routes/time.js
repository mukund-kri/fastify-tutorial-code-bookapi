// This router has one route, which is a GET request to /time.
export default async function (fastify, opts) {
    fastify.get('/time', async function (request, reply) {
        return { time: new Date() }
    })
}