import { gql } from "@apollo/client";

export const HOST_GAMES_QUERY = gql`
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
