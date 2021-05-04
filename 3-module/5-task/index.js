function getMinMax(str) {
  const numbers = str
    .split(/\s|,/)
    .filter((item => !isNaN(item) && item !== ''))
    .map(item => Number(item));

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}
