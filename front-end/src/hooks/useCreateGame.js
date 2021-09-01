const phrases = [
  "synergy",
  "reps",
  "1%",
  "trust",
  "recaps",
  "out of office",
  "precall research",
  "dials",
  "metrics",
  "sql",
  "synergy",
  "reps",
  "1%",
  "trust",
  "recaps",
  "out of office",
  "precall research",
  "dials",
  "metrics",
  "sql",
  "synergy",
  "reps",
  "1%",
  "trust",
  "recaps",
];

const createRandomGameId = () => {
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

const shufflePhrases = (phrasesArray) => {
  var currentIndex = phrasesArray.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [phrasesArray[currentIndex], phrasesArray[randomIndex]] = [
      phrasesArray[randomIndex],
      phrasesArray[currentIndex],
    ];
  }

  return phrasesArray;
};

const createGame = (phrasesArray = phrases) => {
  if (phrasesArray.length !== 25) {
    throw new Error("Game board must have 25 phrases.");
  }

  const gamePhrases = shufflePhrases(phrasesArray);

  const gameId = createRandomGameId();

  return { gamePhrases, gameId };
};

export default createGame;
