const updateBoards = (players, newCalledPhrase, prisma) => {
  players.forEach((player) => {
    let indexMatch = player.board.indexOf(newCalledPhrase);

    if (indexMatch !== -1) {
      player.matches.splice(indexMatch, 0, true);

      prisma.mutation.updatePlayer({
        where: {
          id: player.id,
        },
        data: {
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
