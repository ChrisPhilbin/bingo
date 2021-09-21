import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import CreateNewGame from "./CreateNewGame";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_GAME_MUTATION } from "../../mutations/mutations";
import { HOST_GAMES_QUERY } from "../../quearies/quearies";

const GameList = () => {
  const { data, error, loading } = useQuery(HOST_GAMES_QUERY);

  const [deleteGame] = useMutation(DELETE_GAME_MUTATION);
  return (
    <div>
      {data && (
        <>
          {data.games.map((game) => (
            <p>
              {game.title}
              <DeleteIcon
                onClick={() =>
                  deleteGame({
                    variables: { id: game.id },
                    refetchQueries: [{ query: HOST_GAMES_QUERY }],
                  })
                }
              />
            </p>
          ))}
        </>
      )}

      <CreateNewGame />
    </div>
  );
};

export default GameList;
