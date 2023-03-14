import fp from 'fastify-plugin'

import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

export default fp(async (fastify) => {

    fastify.register(swagger, {});
    fastify.register(swaggerUI, {
        routePrefix: '/docs',
    });

});