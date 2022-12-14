import { useNavigate } from "react-router-dom";


export default function DocTable({ doc, index }) {
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/update/${doc._id}`, { state: doc, replace: true })
    }

    const handleInvite = () => {
        navigate(`/invite/${doc._id}`, { state: doc, replace: true })
    }



    return (
        <div className="docWrapp" style={{ backgroundColor: "white" }}>
            <p> Doc: {doc.name}</p>
            <button className="button-5" onClick={handleInvite}>Add User</button>
            <button className="button-5" onClick={handleEdit} >
                Edit
            </button>
            <p>Type: {doc.docType}</p>
        </div>
    )

}