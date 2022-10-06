import { useQuery } from "@apollo/client"
import {
    GET_USERS
} from "../graphql/users"
import UserData from "./UserData"
export default function Users() {
    const { loading, error, data } = useQuery(GET_USERS)
    console.log(data)

    const handleSelect = (e) => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    if (loading) return <p>Loding..</p>
    if (error) return <p>Error</p>
    return (
        <>
            {!loading && !error && (
                <>
                    <h4>Add users to your documents: </h4>
                    <form onSubmit={handleSubmit}>
                        <select onChange={handleSelect}>
                            <option>Select user</option>
                            {data.users.map((user) => (
                                <UserData key={user.id} user={user} />
                            ))}
                        </select>
                    </form>

                </>
            )}

        </>
    )
}
