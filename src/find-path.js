import findShade from './find-shade';
import findTint from './find-tint';
import findMixer from './find-mixer';

const findPath = (s, d) => {
  try {
    try {
      return {
        method: 'shade',
        percentage: findShade(s, d)
      };
    } catch (e) {
      return {
        method: 'tint',
        percentage: findTint(s, d)
      };
    }
  } catch (e) {
    const result = findMixer(s, d);
    return {
      method: 'mix',
      mixer: result.mixer,
      percentage: result.percentage
    };
  }
};

export default findPath;
