const tint = (s, p) => {
  return s.map(sourceChannel => {
    sourceChannel = Number(sourceChannel);
    const whiteChannel = 255;
    return Math.round(sourceChannel + (whiteChannel - sourceChannel) * p);
  });
};

export default tint;
