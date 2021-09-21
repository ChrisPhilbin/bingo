import { gql } from "@apollo/client";

export const HOST_DELETE_GAME_QUERY = gql`
  mutation deleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
      title
    }
  }
`;
