import util from './utils/index';

const findTint = (s, d) => {
  const pByChannel = [];
  s.forEach((sourceChannel, index) => {
    const whiteChannel = 255;
    if (sourceChannel === whiteChannel) return;
    const destChannel = d[index];
    pByChannel.push((destChannel - sourceChannel) / (whiteChannel - sourceChannel));
  });
  if (util.validatePercentages(pByChannel)) {
    return util.formatNumber(util.getAverage(pByChannel));
  } else {
    throw new Error(`${ d } can not be tinted from ${ s }, try findPath instead.`);
  }
};

export default findTint;