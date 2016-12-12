import util from './utils/index';

const tint = (s, p) => {
  let source = util.formatColor(s);
  return source.map(sourceChannel => {
    sourceChannel = Number(sourceChannel);
    const whiteChannel = 255;
    return Math.round(sourceChannel + (whiteChannel - sourceChannel) * p);
  });
};

export default tint;
