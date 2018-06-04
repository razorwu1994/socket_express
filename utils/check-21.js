module.exports = (cards = []) => {
  return cards.reduce((a, b) => a + b.number + 1, 0) > 21;
};
