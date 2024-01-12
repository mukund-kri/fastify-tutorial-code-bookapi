// Imports
import { test } from 'tap'
import { build } from '../helper.js'

// Test 1: GET /time
// Check if the time format is correct
test('GET /time', async (t) => {
    const app = await build(t)

    const res = await app.inject({
        url: '/time'
    })

    // Check for 200 OK status code
    t.equal(res.statusCode, 200)

    // Pull out time from the body
    const { time } = JSON.parse(res.payload)

    // Check if the time is in the correct format (ISO 8601)
    let timeObj = new Date(time)
    t.ok(timeObj instanceof Date && !isNaN(timeObj.valueOf()))

})