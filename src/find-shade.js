import util from './utils/index';

const findShade = (s, d) => {
  const pByChannel = s.map((sourceChannel, index) => {
    const destChannel = d[index];
    return destChannel / sourceChannel;
  });
  if (util.validatePercentages(pByChannel)) {
    return util.formatNumber(1 - util.getAverage(pByChannel));
  } else {
    throw new Error(`${ d } can not be shaded from ${ s }, try findPath instead.`);
  }
};

export default findShade;
