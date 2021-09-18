import React from "react";
import { useQuery, gql } from "@apollo/client";
import CreateNewGame from "./CreateNewGame";

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
  console.log(loading, "value of loading");
  return (
    <div>
      {data && (
        <>
          {data.games.map((game) => (
            <p>{game.title}</p>
          ))}
        </>
      )}

      <CreateNewGame />
    </div>
  );
};

export default GameList;
