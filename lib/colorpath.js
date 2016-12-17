'use strict';

var getAverage = function (arr) {
  return arr.reduce(function (prev, next) { return prev + next; }) / arr.length
};

var validatePercentages = function (p) {
  return (Math.max.apply(null, p) - Math.min.apply(null, p)) <= 0.02
};

var formatColor = function (color) {
  if (Array.isArray(color)) { return color }

  color = '' + color;
  if (/^#?[0123456789AaBbCcDdEeFf]{6}$/.test(color)) {
    color = color.slice(-6);
    var redChannel = parseInt(color[0] + color[1], 16);
    var greenChannel = parseInt(color[2] + color[3], 16);
    var blueChannel = parseInt(color[4] + color[5], 16);
    return [redChannel, greenChannel, blueChannel]
  } else if (/\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}/.test(color)) {
    color = /\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}/.exec(color)[0].split(',').map(function (channel) { return Number(channel.trim()); });
    if (color.every(function (channel) { return channel <= 255; })) { return color }
  }
  throw new Error((color + " is not a legal color!"))
};

var formatNumber = function (num) { return Number(num.toPrecision(4)); };

var util = {
  getAverage: getAverage,
  validatePercentages: validatePercentages,
  formatColor: formatColor,
  formatNumber: formatNumber
};

var tint = function (s, p) {
  var source = util.formatColor(s);
  return source.map(function (sourceChannel) {
    sourceChannel = Number(sourceChannel);
    var whiteChannel = 255;
    return Math.round(sourceChannel + (whiteChannel - sourceChannel) * p)
  })
};

var shade = function (s, p) {
  var source = util.formatColor(s);
  return source.map(function (sourceChannel) { return Math.round(sourceChannel * (1 - p)); })
};

var mix = function (s, m, p) {
  var source = util.formatColor(s);
  var mixer = util.formatColor(m);
  return source.map(function (sourceChannel, index) {
    var mixerChannel = mixer[index];
    return Math.round(mixerChannel - (mixerChannel - sourceChannel) * p)
  })
};

var findTint = function (s, d) {
  var source = util.formatColor(s);
  var destination = util.formatColor(d);
  var pByChannel = [];
  source.forEach(function (sourceChannel, index) {
    var whiteChannel = 255;
    var destChannel = destination[index];
    if (sourceChannel === whiteChannel) {
      if (destChannel !== whiteChannel) { pByChannel.push(-1); }
      return
    }
    pByChannel.push((destChannel - sourceChannel) / (whiteChannel - sourceChannel));
  });
  if (util.validatePercentages(pByChannel)) {
    return util.formatNumber(util.getAverage(pByChannel))
  } else {
    throw new Error((d + " can not be tinted from " + s + ", try findPath instead."))
  }
};

var findShade = function (s, d) {
  var source = util.formatColor(s);
  var destination = util.formatColor(d);
  var pByChannel = source.map(function (sourceChannel, index) {
    var destChannel = destination[index];
    return destChannel / sourceChannel
  });
  if (util.validatePercentages(pByChannel)) {
    return util.formatNumber(1 - util.getAverage(pByChannel))
  } else {
    throw new Error((d + " can not be shaded from " + s + ", try findPath instead."))
  }
};

var source;
var destination;

var getMixerChannel = function (index, p) {
  return Math.round((destination[index] - source[index] * p) / (1 - p))
};

var getPercentage = function (index, edge) {
  return (edge - destination[index]) / (edge - source[index])
};

var validatePercentage = function (p) {
  p = util.formatNumber(p);
  return p >= 0 && p <= 1
};

var validateMixer = function (mixer) {
  return mixer.every(function (channel) { return channel >= 0 && channel <= 255; })
};

var findMixer = function (s, d) {
  source = util.formatColor(s);
  destination = util.formatColor(d);
  var p;
  var mixer = [];

  var edges = [0, 255];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 2; j++) {
      var edge = edges[j];
      p = getPercentage(i, edge);
      mixer = [getMixerChannel(0, p), getMixerChannel(1, p), getMixerChannel(2, p)];
      if (validatePercentage(p) && validateMixer(mixer)) {
        return {
          mixer: mixer,
          percentage: util.formatNumber(p)
        }
      }
    }
  }
  return {}
};

var findPath = function (s, d) {
  var source = util.formatColor(s);
  var destination = util.formatColor(d);
  try {
    try {
      return {
        method: 'shade',
        percentage: findShade(source, destination)
      }
    } catch (e) {
      return {
        method: 'tint',
        percentage: findTint(source, destination)
      }
    }
  } catch (e) {
    var result = findMixer(source, destination);
    return {
      method: 'mix',
      mixer: result.mixer,
      percentage: result.percentage
    }
  }
};

var colorPath = {
  tint: tint,
  shade: shade,
  mix: mix,
  findTint: findTint,
  findShade: findShade,
  findMixer: findMixer,
  findPath: findPath
};

module.exports = colorPath;
