// function which returns true if card attribute "matched" is false
const isCardMatched = (card) => {
  if (card.matched === false) {
    return true;
  }
};

// shuffles array of cards
const shuffleCards = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// looks up correct data for passed theme
const getThemeData = (data, tema, value) => {
  return data[tema][value];
};

// sleep function for delaying upcoming behaviour
const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export { isCardMatched, shuffleCards, getThemeData, sleep };
