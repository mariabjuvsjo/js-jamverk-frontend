import CreateDoc from "../componets/CreateDoc"
import { Link } from 'react-router-dom'
const Create = () => {



    return (
        <div className="create">
            <h2>Create</h2>
            <CreateDoc />
            <p>Choose a name for your document to create a new one or go to  <Link to="/documents">
                Documents
            </Link> to edit one</p>

        </div>
    )
}

export default Create