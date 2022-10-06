

import { useMutation } from '@apollo/client';

import { GET_USERS } from '../graphql/users';


export default function UserData({ user }) {


    return (




        <option>{user.username}</option>



    );
}