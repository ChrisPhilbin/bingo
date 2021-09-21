import { gql } from "@apollo/client";

export const DELETE_GAME_MUTATION = gql`
  mutation deleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
      title
    }
  }
`;

export const CREATE_GAME_MUTATION = gql`
  mutation GameMutation(
    $title: String!
    $published: Boolean!
    $finished: Boolean!
  ) {
    createGame(
      data: { title: $title, published: $published, finished: $finished }
    ) {
      id
      title
      published
      finished
      slug
    }
  }
`;
