const mix = (s, d, p) => {
  return s.map((sourceChannel, index) => {
    const destChannel = d[index];
    return Math.round(destChannel - (destChannel - sourceChannel) * p);
  });
};

export default mix;
