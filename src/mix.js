import util from './utils/index';

const mix = (s, m, p) => {
  let source = util.formatColor(s);
  let mixer = util.formatColor(m);
  return source.map((sourceChannel, index) => {
    const mixerChannel = mixer[index];
    return Math.round(mixerChannel - (mixerChannel - sourceChannel) * p);
  });
};

export default mix;
