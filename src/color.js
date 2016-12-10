const color = (s, t) => {
  let p;
  let mixer = [0, 0, 0];

  const getMixerProjection = (index, p) => {
    return (t[index] - s[index] * p) / (1 - p);
  };
  const getP = index => {
    return (mixer[index] - t[index]) / (mixer[index] - s[index]);
  };
  const findLegal = item => {
    if (item.some(num => isNaN(num))) return false;
    item.forEach((num, index) => {
      if (index < 3) {
        item[index] = Math.round(num);
      } else {
        item[index] = Number(num.toPrecision(4));
      }
    });
    let rgb = item.slice(0, 3);
    return item[3] >= 0 && item[3] <= 1 && rgb.every(num => num >= 0 && num <= 255);
  };

  let candidate = [];
  for (let i = 0; i < 3; i++) {
    [0, 255].forEach(edge => {
      mixer[i] = edge;
      p = getP(i);
      candidate.push([getMixerProjection(0, p), getMixerProjection(1, p), getMixerProjection(2, p), p]);
    });
  }
  return candidate.filter(findLegal) && candidate.filter(findLegal)[0];
};

export default color;
