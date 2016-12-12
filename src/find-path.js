import findShade from './find-shade';
import findTint from './find-tint';
import findMixer from './find-mixer';
import util from './utils/index';

const findPath = (s, d) => {
  let source = util.formatColor(s);
  let destination = util.formatColor(d);
  try {
    try {
      return {
        method: 'shade',
        percentage: findShade(source, destination)
      };
    } catch (e) {
      return {
        method: 'tint',
        percentage: findTint(source, destination)
      };
    }
  } catch (e) {
    const result = findMixer(source, destination);
    return {
      method: 'mix',
      mixer: result.mixer,
      percentage: result.percentage
    };
  }
};

export default findPath;
