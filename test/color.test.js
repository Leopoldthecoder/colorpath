const assert = require('power-assert')
const clp = require('../lib/colorpath')

describe('findPath', () => {
  it('dual-processing', () => {
    assert(clp.findPath('187264', '0d3ca8').percentage - 0.52 < 0.02)
  })
})