export const phrases = [
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

export const shuffle = (phrasesArray) => {
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
