const checkForBingo = (card) => {
  if (card.length !== 25) {
    throw new Error("Not a valid card. Must have exactly 25 spots.");
  }

  if (!Array.isArray(card)) {
    throw new Error("Not a valid card. Must be of type Array.");
  }

  for (let i = 0; i < 5; i++) {
    if (
      card[i] &&
      card[i + 5] &&
      card[i + 10] &&
      card[i + 15] &&
      card[i + 20]
    ) {
      return true;
    }
  }

  for (let i = 0; i < 21; i += 5) {
    if (card[i] && card[i + 1] && card[i + 2] && card[i + 3] && card[i + 4]) {
      return true;
    }
  }

  if (card[4] && card[8] && card[12] && card[16] && card[20]) {
    return true;
  }

  return false;
};

const updateBoards = (players, newCalledPhrase, prisma) => {
  players.forEach((player) => {
    let indexMatch = player.board.indexOf(newCalledPhrase);

    if (indexMatch !== -1) {
      player.matches[indexMatch] = true;

      let bingo = checkForBingo(player.matches);

      prisma.mutation.updatePlayer({
        where: {
          id: player.id,
        },
        data: {
          bingo: bingo,
          matches: {
            set: player.matches,
          },
        },
      });
    }

    console.log(player.matches, "player matches");
  });
};

export default updateBoards;
