const assert = require('power-assert')
const clp = require('../lib/colorpath')
const TEST_COUNT = 100

describe('tint', () => {
  it('dual-processing', () => {
    for (let i = 0; i < TEST_COUNT; i++) {
      const redChannel = Math.floor(Math.random() * 256)
      const greenChannel = Math.floor(Math.random() * 256)
      const blueChannel = Math.floor(Math.random() * 256)
      const percentage = Math.random()
      const source = [redChannel, greenChannel, blueChannel]
      console.log(source, percentage)
      assert(clp.findTint(source, clp.tint(source, percentage)) - percentage < 0.02)
    }
  })
})