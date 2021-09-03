import React from "react";

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

export default checkForBingo;
