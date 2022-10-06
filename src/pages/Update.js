import UpdateDoc from "../componets/UpdateDoc"
import Users from "../componets/Users"
import { useNavigate, useLocation, useParams } from "react-router-dom";
const Update = () => {

    const { id } = useParams()
    console.log(id)



    return (
        <div className="update">
            <h2>Update</h2>

            <UpdateDoc />
        </div>

    )
}

export default Update