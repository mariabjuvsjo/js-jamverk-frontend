//import { gql } from "@apollo/client";
/**
// queries
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

//mutation
const UPDATE_DOC = gql`
mutation UpdateDoc(
  $id: ID!
  $allowed_users: String!
){
  updateDoc(id: $id, allowed_users: $allowed_users){
    name
    allowed_users
  }
}`
export { GET_DOC, DOCS_BY_USER_ID, UPDATE_DOC } */