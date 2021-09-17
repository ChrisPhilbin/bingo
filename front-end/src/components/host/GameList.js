import React from "react";
import { useQuery, gql } from "@apollo/client";

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
  const { data } = useQuery(HOST_GAMES_QUERY);
  return (
    <div>
      {data && (
        <>
          {data.games.map((game) => (
            <p>{game.title}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default GameList;
