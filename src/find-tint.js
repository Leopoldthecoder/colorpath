import util from './utils/index'

const findTint = (s, d) => {
  const source = util.formatColor(s)
  const destination = util.formatColor(d)
  const pByChannel = []
  source.forEach((sourceChannel, index) => {
    const whiteChannel = 255
    const destChannel = destination[index]
    if (sourceChannel === whiteChannel) {
      if (destChannel !== whiteChannel) pByChannel.push(-1)
      return
    }
    pByChannel.push((destChannel - sourceChannel) / (whiteChannel - sourceChannel))
  })
  if (util.validatePercentages(pByChannel)) {
    return util.formatNumber(util.getAverage(pByChannel))
  } else {
    throw new Error(`${ d } can not be tinted from ${ s }, try findPath instead.`)
  }
}

export default findTint
