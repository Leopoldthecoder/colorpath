const getAverage = arr => {
  return arr.reduce((prev, next) => prev + next) / arr.length;
};

const validatePercentages = p => {
  return (Math.max.apply(null, p) - Math.min.apply(null, p)) <= 0.02;
};

const formatNumber = num => Number(num.toPrecision(4));

export default {
  getAverage,
  validatePercentages,
  formatNumber
};
