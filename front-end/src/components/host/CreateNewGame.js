import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CREATE_GAME_MUTATION } from "../../mutations/mutations";

const useStyles = makeStyles({});

const CreateNewGame = () => {
  const classes = useStyles();

  let [gameTitle, setGameTitle] = useState("");
  let [gameIsPublished, setGameIsPublished] = useState(false);
  let [gameIsFinished, setGameIsFinished] = useState(false);

  const [createGame] = useMutation(CREATE_GAME_MUTATION, {
    variables: {
      title: gameTitle,
      published: gameIsPublished,
      finished: gameIsFinished,
    },
  });

  return (
    <>
      <FormGroup>
        <TextField
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox onChange={() => setGameIsPublished(!gameIsPublished)} />
          }
          label="Publish Game?"
        />

        <FormControlLabel
          control={
            <Checkbox onChange={() => setGameIsFinished(!gameIsFinished)} />
          }
          label="Game Finished?"
        />

        <Button onClick={() => createGame()}>Create Game</Button>
      </FormGroup>
    </>
  );
};

export default CreateNewGame;
