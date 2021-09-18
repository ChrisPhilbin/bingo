import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import createGame from "../../hooks/useCreateGame";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  newGameContainer: {
    margin: "auto",
    backgroundColor: "white",
  },
  startButton: {
    borderRadius: 20,
    backgroundColor: "#6930C3",
    "&:hover": {
      backgroundColor: "#5390D9",
    },
    color: "white",
    width: 300,
    height: 100,
    marginBottom: 30,
  },
  choiceFont: {
    color: "white",
    fontFamily: '"Permanent Marker", cursive',
  },
  chips: {
    margin: 3,
  },
});

const CreateNewGame = () => {
  const classes = useStyles();

  let [showCustomSetup, setShowCustomSetup] = useState(false);
  let [customPhrases, setCustomPhrases] = useState([]);
  let [phrase, setPhrase] = useState("");
  let [startButtonDisabled, setStartButtonDisabled] = useState(true);

  const startNewGame = () => {
    if (customPhrases.length === 25) {
      let game = createGame(customPhrases);
      return game;
    }
    let game = createGame();
    console.log(game);
    return game;
  };

  const updatePhrases = (event) => {
    event.preventDefault();
    if (customPhrases.length >= 25) {
      alert("Total phrases cannot be greater than 25");
      return;
    }
    if (customPhrases.includes(phrase.toLowerCase())) {
      alert(`${phrase} has already been added`);
      setPhrase("");
      return;
    }
    setCustomPhrases((customPhrases) => [
      ...customPhrases,
      phrase.toLowerCase(),
    ]);
    setPhrase("");
    if (customPhrases.length === 25) {
      setStartButtonDisabled(false);
    }
  };

  const removePhrase = ({ phrase }) => {
    let filteredPhrases = customPhrases.filter((word) => word !== phrase);
    setCustomPhrases(filteredPhrases);
  };

  const cancel = () => {
    if (window.confirm("Are you sure?")) {
      setCustomPhrases([]);
      setPhrase("");
      setShowCustomSetup(false);
      setStartButtonDisabled(true);
    }
  };
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} alignItems="center" justiy="center">
        <Button
          onClick={() => setShowCustomSetup(true)}
          variant="contained"
          color="primary"
          className={classes.startButton}
        >
          Start new game with custom phrases
        </Button>
        <Dialog
          open={showCustomSetup}
          onClose={() => setShowCustomSetup(false)}
        >
          <DialogTitle id="form-dialog-title">Enter custom phrases</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter 25 key phrases/buzzwords below for your bingo game.
              <br />
              <p
                style={
                  customPhrases.length === 25
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {customPhrases.length} of 25
              </p>
              <form onSubmit={(event) => updatePhrases(event)}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="phrase"
                  label="Phrase"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                />
                <Button type="submit" variant="contained">
                  Add
                </Button>
              </form>
              {customPhrases
                ? customPhrases.map((phrase) => (
                    <Chip
                      label={phrase}
                      onDelete={() => removePhrase({ phrase })}
                      className={classes.chips}
                    />
                  ))
                : null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => cancel()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={startButtonDisabled}
              color="primary"
            >
              Start Game
            </Button>
          </DialogActions>
        </Dialog>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          className={classes.choiceFont}
        >
          OR
        </Typography>
        <Button
          onClick={() => startNewGame()}
          color="primary"
          variant="contained"
          className={classes.startButton}
          component={Link}
          to="/play"
        >
          Start new game with generic phrases
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateNewGame;
