import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";

const phrases = [
  ["synergy", "reps", "1%", "trust", "recaps"],
  ["out of office", "precall research", "dials", "metrics", "sql"],
  ["synergy", "reps", "1%", "trust", "recaps"],
  ["out of office", "precall research", "dials", "metrics", "sql"],
  ["synergy", "reps", "1%", "trust", "recaps"],
];

const called = ["synergy", "precall research", "trust"];

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
  tableCellNoMatch: {
    borderBottom: "none",
  },
  tableCellMatch: {
    borderBottom: "none",
    "background-color": "DarkCyan",
  },
});

const BingoCard = () => {
  const classes = useStyles();

  let [matches, setMatches] = useState([]);
  let [indexMatches, setIndexMatches] = useState([]);

  const findMatches = () => {
    phrases.flat().forEach((word, index) => {
      console.log(word, "current word");
      if (called.includes(word)) {
        setMatches((matches) => [...matches, word]);
        setIndexMatches((index) => [...indexMatches, index]);
        //check to see if the card hits BINGO based on newly added index to index match arr
      }
    });

    console.log(matches, "matches");
  };

  return (
    <div>
      <h3>Bingo card</h3>

      <Button variant="contained" color="primary" onClick={() => findMatches()}>
        Update
      </Button>

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
            <TableCell align="center">
              <Typography variant="h3">B</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h3">I</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h3">N</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h3">G</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h3">O</Typography>
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
                  {item}
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
