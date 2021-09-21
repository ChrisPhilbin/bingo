import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import CreateNewGame from "./CreateNewGame";
import DeleteIcon from "@material-ui/icons/Delete";
import { HOST_DELETE_GAME_QUERY } from "../../mutations";

const HOST_GAMES_QUERY = gql`
  {
    games {
      id
      slug
      title
      published
      finished
      calledPhrases
      players {
        id
        nickname
      }
    }
  }
`;

const GameList = () => {
  const { data, error, loading } = useQuery(HOST_GAMES_QUERY);

  const [deleteGame] = useMutation(HOST_DELETE_GAME_QUERY);
  return (
    <div>
      {data && (
        <>
          {data.games.map((game) => (
            <p>
              {game.title} {game.id}
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
