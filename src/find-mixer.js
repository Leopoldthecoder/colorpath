import util from './utils/index'
let source, destination

const getMixerChannel = (index, p) => {
  return Math.round((destination[index] - source[index] * p) / (1 - p))
}

const getPercentage = (index, edge) => {
  return (edge - destination[index]) / (edge - source[index])
}

const validatePercentage = p => {
  p = util.formatNumber(p)
  return p >= 0 && p <= 1
}

const validateMixer = mixer => {
  return mixer.every(channel => channel >= 0 && channel <= 255)
}

const findMixer = (s, d) => {
  console.log(2)
  source = util.formatColor(s)
  destination = util.formatColor(d)
  let p
  let mixer = []

  const edges = [0, 255]
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      const edge = edges[j]
      p = getPercentage(i, edge)
      mixer = [getMixerChannel(0, p), getMixerChannel(1, p), getMixerChannel(2, p)]
      if (validatePercentage(p) && validateMixer(mixer)) {
        return {
          mixer,
          percentage: util.formatNumber(p)
        }
      }
    }
  }
  return {}
}

export default findMixer
