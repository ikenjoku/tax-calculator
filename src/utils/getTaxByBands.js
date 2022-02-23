export const getTaxByBands = (bands, gross) => {
  let sum = 0;
  bands.forEach((band) => {
    if (gross > band.min && gross > band.max) {
      sum += (band.max * band.percent) / 100;
    } else if (gross > band.min && gross <= band.max) {
      sum += ((gross - band.min) * band.percent) / 100;
    }
  });
  return sum;
};
