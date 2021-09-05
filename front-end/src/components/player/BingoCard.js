import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import checkForBingo from "../../hooks/checkForBingo";
import useWindowSize from "../../hooks/useWindowSize";
import Confetti from "react-confetti";

const phrases = [
  ["synergy", "reps", "1%", "trust", "recaps"],
  ["out of office", "precall research", "dials", "metrics", "sql"],
  ["synergy", "reps", "1%", "trust", "recaps"],
  ["out of office", "precall research", "dials", "metrics", "sql"],
  ["synergy", "reps", "1%", "trust", "recaps"],
];

const called = [
  "synergy",
  "precall research",
  "trust",
  "1%",
  "metrics",
  "recaps",
];

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
    margin: "auto",
  },
  tableCellNoMatch: {
    borderBottom: "none",
    "background-color": "White",
    borderRadius: 18,
  },
  tableCellMatch: {
    borderBottom: "none",
    "background-color": "DarkCyan",
    borderRadius: 18,
  },
  bingoTitle: {
    color: "white",
    borderBottom: "none",
  },
  bingoFont: {
    fontFamily: '"Permanent Marker", cursive',
  },
});

const BingoCard = () => {
  const { width, height } = useWindowSize();

  const classes = useStyles();

  let [matches, setMatches] = useState([]);
  let [indexMatches, setIndexMatches] = useState([...Array(25)]);
  let [winner, setWinner] = useState(false);
  let [gameOver, setGameOver] = useState(false);

  const findMatches = () => {
    phrases.flat().map((word, index) => {
      if (called.includes(word)) {
        setMatches((matches) => [...matches, word]);
        indexMatches[index] = true;
        if (checkForBingo(indexMatches)) {
          setWinner(true);
          setGameOver(true);
        }
      }
    });
  };

  const startGame = () => {
    return null;
  };

  return (
    <div>
      <h3>Bingo card</h3>

      <Button variant="contained" color="primary" onClick={() => findMatches()}>
        Update
      </Button>

      <Button variant="contained" color="primary" onClick={() => startGame()}>
        Start Game
      </Button>

      {winner ? <Confetti width={width} height={height} /> : null}

      <Table className={classes.table} aria-label="simple table">
        <colgroup>
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <TableBody>
          <TableRow>
            <TableCell align="center" className={classes.bingoTitle}>
              <Typography variant="h3" className={classes.bingoFont}>
                B
              </Typography>
            </TableCell>
            <TableCell align="center" className={classes.bingoTitle}>
              <Typography variant="h3" className={classes.bingoFont}>
                I
              </Typography>
            </TableCell>
            <TableCell align="center" className={classes.bingoTitle}>
              <Typography variant="h3" className={classes.bingoFont}>
                N
              </Typography>
            </TableCell>
            <TableCell align="center" className={classes.bingoTitle}>
              <Typography variant="h3" className={classes.bingoFont}>
                G
              </Typography>
            </TableCell>
            <TableCell align="center" className={classes.bingoTitle}>
              <Typography variant="h3" className={classes.bingoFont}>
                O
              </Typography>
            </TableCell>
          </TableRow>
          {phrases.map((row, index) => (
            <TableRow key={index}>
              {row.map((item, index) => (
                <TableCell
                  align="center"
                  className={
                    matches.includes(item)
                      ? classes.tableCellMatch
                      : classes.tableCellNoMatch
                  }
                  key={index}
                >
                  <Typography variant="h5">{item}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BingoCard;
