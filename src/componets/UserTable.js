import docModel from "../models/docs";

export default function UserTable({ user }) {




    /* async function deleteUser() {
         console.log(user.id)
 
         const response = await fetch(`${docModel.baseUrl}/graphql`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 'Accept': 'application/json',
             },
             body: JSON.stringify({
                 query: ` 
             mutation{
             deleteUser(id: "${user.id}"){
                 id
                 username
             }
         }` })
         });
         const res = await response.json();
 
         console.log(res)
     }*/
    return (



        <tr>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>

        </tr >

    );
}

//<td><button className="button-5" onClick={deleteUser}>Delete?</button></td>