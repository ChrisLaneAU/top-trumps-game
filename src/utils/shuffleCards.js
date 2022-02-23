const shuffleCards = (cards = {}) =>
  Object.entries(cards)
    .map((card) => ({ card, sortOrder: Math.random() }))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(({ card }) => card);

export default shuffleCards;
