import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const called = ["synergy", "precall", "trust"];

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

  useEffect(() => {
    phrases.flat().forEach((word) => {
      if (called.includes(word)) {
        matches.push(word);
      }
    });
  }, []);

  return (
    <div>
      {console.log(matches, "matches")}
      <h3>Bingo card</h3>

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
