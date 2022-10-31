import { useState, useEffect } from "react";
import docModel from "../models/docs";
import UserTable from "./UserTable";



export default function ShowUsers() {
    //const { auth } = useUser()

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


    async function fetchUser() {

        const response = await fetch(`${docModel.baseUrl}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: USER_QUERY })
        });
        const res = await response.json();

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

            <table className='user-table'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>

                    </tr>
                </thead>
                <tbody>
                    {userTable}
                </tbody>
            </table>
        </>
    )
};