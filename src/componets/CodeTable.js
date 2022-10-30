import { useNavigate } from "react-router-dom";


export default function CodeTable({ doc, index }) {
    const navigate = useNavigate()

    const handleInvite = () => {
        navigate(`/invite/${doc._id}`, { state: doc, replace: true })
    }

    const handleCodeMode = () => {
        navigate(`/codemode/${doc._id}`, { state: doc, replace: true })
    }

    return (
        <div className="docWrapp">
            <p> Doc: {doc.name}</p>
            <button className="button-5" onClick={handleInvite}>Add User</button>
            <button className="button-5" onClick={handleCodeMode} >
                Edit
            </button>
            <p> Doctype: {doc.docType}</p>
        </div>
    )

}