import util from './utils/index';

const shade = (s, p) => {
  let source = util.formatColor(s);
  return source.map(sourceChannel => Math.round(sourceChannel * (1 - p)));
};

export default shade;
