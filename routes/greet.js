// This route has two endpoints.
// 
// 1. `GET /greet` - Returns a greeting message.
// 2. `POST /greet` - Accepts a name and returns a greeting message.

export default async function (fastify, opts) {
    fastify.get('/greet', async function (request, reply) {
        return { message: 'Hello from Fastify!' }
    })

    fastify.post('/greet', async function (request, reply) {
        return { message: `Hello, ${request.body.name}!` }
    })
};
