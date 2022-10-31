

export default function UserTable({ user }) {

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