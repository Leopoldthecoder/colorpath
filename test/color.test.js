import assert from 'power-assert'
import clp from '../src/index'
import utils from '../src/utils'

describe('utils', () => {
  it('color formatter', () => {
    const hexColor = '3F7D2A'
    const rgbColorStr = 'rgb(63, 125, 42)'
    const rgbColorArr = [63, 125, 42]
    assert.deepEqual(utils.formatColor(hexColor), rgbColorArr)
    assert.deepEqual(utils.formatColor(rgbColorStr), rgbColorArr)
    assert.deepEqual(utils.formatColor(rgbColorArr), rgbColorArr)
  })
})

describe('find path', function() {
  this.timeout(6000)

  const TEST_COUNT = 50000
  
  const getRandomChannel = _ => {
    return Math.floor(Math.random() * 256)
  }

  const getRandomColor = _ => {
    return [getRandomChannel(), getRandomChannel(), getRandomChannel()]
  }

  const isWithinTolerance = (a, b) => {
    let within = true
    for (let i = 0; i < a.length; i++) {
      if (Math.abs(a[i] - b[i]) > 3) {
        within = false
      }
    }
    return within
  }

  it('wild slaughter', () => {
    for (let i = 0; i < TEST_COUNT; i++) {
      const source = getRandomColor()
      const destination = getRandomColor()
      const result = clp.findPath(source, destination)
      let realDest

      switch (result.method) {
        case 'tint':
          console.log(result.method)
          realDest = clp.tint(source, result.percentage)
          assert(isWithinTolerance(realDest, destination) === true)
          break

        case 'shade':
          console.log(result.method)
          realDest = clp.shade(source, result.percentage)
          assert(isWithinTolerance(realDest, destination) === true)
          break

        default:
          assert.deepEqual(clp.mix(source, result.mixer, result.percentage), destination)
      }
    }
  })
})