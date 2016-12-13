const getAverage = arr => {
  return arr.reduce((prev, next) => prev + next) / arr.length
}

const validatePercentages = p => {
  return (Math.max.apply(null, p) - Math.min.apply(null, p)) <= 0.02
}

const formatColor = color => {
  if (Array.isArray(color)) return color
  color = '' + color
  if (/^#?[0123456789AaBbCcDdEeFf]{6}$/.test(color)) {
    color = color.slice(-6)
    const redChannel = parseInt(color[0] + color[1], 16)
    const greenChannel = parseInt(color[2] + color[3], 16)
    const blueChannel = parseInt(color[4] + color[5], 16)
    return [redChannel, greenChannel, blueChannel]
  } else if (/\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}/.test(color)) {
    color = /\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}/.exec(color)[0].split(',').map(channel => Number(channel.trim()))
    if (color.every(channel => channel <= 255)) return color
  }
  throw new Error(`${color} is not a legal color!`)
}

const formatNumber = num => Number(num.toPrecision(4))

export default {
  getAverage,
  validatePercentages,
  formatColor,
  formatNumber
}
