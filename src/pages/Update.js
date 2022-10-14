import UpdateDoc from "../componets/UpdateDoc"

import { useParams } from "react-router-dom";
const Update = () => {

    const { id } = useParams()
    console.log(id)



    return (
        <div className="update">

            <UpdateDoc />
        </div>

    )
}

export default Update