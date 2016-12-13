import util from './utils/index'

const findShade = (s, d) => {
  const source = util.formatColor(s)
  const destination = util.formatColor(d)
  const pByChannel = source.map((sourceChannel, index) => {
    const destChannel = destination[index]
    return destChannel / sourceChannel
  })
  if (util.validatePercentages(pByChannel)) {
    return util.formatNumber(1 - util.getAverage(pByChannel))
  } else {
    throw new Error(`${ d } can not be shaded from ${ s }, try findPath instead.`)
  }
}

export default findShade
