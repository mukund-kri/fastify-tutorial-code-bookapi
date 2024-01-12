// Imports
import { test } from 'tap'
import { build } from '../helper.js'

// Test 1: GET /greet
test('GET /greet', async (t) => {
    const app = await build(t)

    const res = await app.inject({
        url: '/greet'
    })
    t.same(JSON.parse(res.payload), { message: 'Hello from Fastify!' })
})


// Test 2: POST /greet
test('POST /greet', async (t) => {
    const app = await build(t)

    const res = await app.inject({
        method: 'POST',
        url: '/greet',
        payload: { name: 'World' }
    })
    t.same(JSON.parse(res.payload), { message: 'Hello, World!' })
})