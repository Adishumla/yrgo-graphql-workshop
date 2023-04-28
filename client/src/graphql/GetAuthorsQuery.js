import { gql } from "@apollo/client";

export const GetAuthorsQuery = gql`
  query {
    authors {
      name
      _id
      __typename
    }
  }
`;
