const mix = (s, t, p) => {
  return s.map((sourceChannel, index) => {
    const targetChannel = t[index];
    return Math.round(targetChannel - (targetChannel - sourceChannel) * p);
  });
};

export default mix;
