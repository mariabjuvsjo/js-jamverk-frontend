import { gql } from "@apollo/client";

const GET_DOC = gql`
query getDocs{
    docs {
       name
       user{
        username
       }
    }
}
`;

const DOCS_BY_USER_ID = gql`
query docsbyUserId($user: ID!) {
    docsbyUserId(user: $user) {
      name,
      id
    }
  }
`;
export { GET_DOC, DOCS_BY_USER_ID }