import { useState, useEffect } from "react";
import docModel from "../models/docs";
import useUser from '../hooks/useUser';
import UserTable from "./UserTable";



export default function ShowUsers() {
    const { auth } = useUser()

    const [users, setUsers] = useState([]);

    const USER_QUERY = `
     {
        users {
          id
          firstname
          lastname
          username
        }
      }
     `

    //const { loading, error, data } = useQuery(GET_USERS)
    //console.log(data)

    async function fetchUser() {
        //const allDocs = await docModel.getAllDocs();


        const response = await fetch(`${docModel.baseUrl}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: USER_QUERY })
        });
        const res = await response.json();

        console.log(res)




        setUsers(res.data.users);
    }


    useEffect(() => {
        (async () => {
            await fetchUser();


        })();
    }, []);

    let userTable = users.map((user) => {
        return <UserTable user={user} key={user.id} />
    })


    return (
        <>

            <table className='x'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>

                    {userTable}


                </tbody>
            </table>


        </>

    )
};