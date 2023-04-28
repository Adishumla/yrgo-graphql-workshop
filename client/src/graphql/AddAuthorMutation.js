//Create a file called AddAuthorMutation.js in your graphql folder. Your mutation should accept a parameter called name which should have the type String!.
import { gql } from "@apollo/client";

export const AddAuthorMutation = gql`
  mutation AddAuthor($name: String!, $books: [ID]) {
    addAuthor(name: $name, books: $books) {
      message
      success
    }
  }
`;
