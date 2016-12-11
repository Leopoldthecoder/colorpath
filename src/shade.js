const shade = (s, p) => {
  return s.map(sourceChannel => Math.round(sourceChannel * (1 - p)));
};

export default shade;
