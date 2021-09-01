import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import createGame from "../../hooks/useCreateGame";
import { Typography } from "@material-ui/core";

const CreateNewGame = () => {
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

  const updatePhrases = () => {
    if (customPhrases.length > 25) {
      alert("Total phrases cannot be greater than 25");
      return;
    }
    setCustomPhrases((customPhrases) => [...customPhrases, phrase]);
    setPhrase("");
    if (customPhrases.length === 25) {
      setStartButtonDisabled(false);
    }
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
    <>
      <Button
        onClick={() => setShowCustomSetup(true)}
        variant="contained"
        color="primary"
        style={{ width: 300, height: 100 }}
      >
        Start new game with custom phrases
      </Button>
      <Dialog open={showCustomSetup} onClose={() => setShowCustomSetup(false)}>
        <DialogTitle id="form-dialog-title">Enter custom phrases</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter 25 key phrases/buzzwords below for your bingo game.
            <TextField
              autoFocus
              margin="dense"
              id="phrase"
              label="Phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => updatePhrases()}
            >
              Add
            </Button>
            {customPhrases
              ? customPhrases.map((phrase) => <div>{phrase}</div>)
              : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={() => cancel()}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={startButtonDisabled}
          >
            Start Game
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h3" gutterBottom>
        OR
      </Typography>
      <Button
        onClick={() => startNewGame()}
        variant="contained"
        color="primary"
        style={{ width: 300, height: 100 }}
      >
        Start new game with generic phrases
      </Button>
    </>
  );
};

export default CreateNewGame;
