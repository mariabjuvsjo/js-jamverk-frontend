import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
query getUsers {
    users {
        id
        firstname
        lastname
        username
    }
}
`;

export { GET_USERS }