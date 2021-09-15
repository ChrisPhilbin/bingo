const findDuplicates = (board) => {
  let duplicates = board.filter(
    (phrase, index) => board.indexOf(phrase) !== index
  );

  return duplicates.length > 0 ? true : false;
};

export default findDuplicates;
