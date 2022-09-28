import { useNavigate } from "react-router-dom";


export default function DocTable({ doc, index }) {
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/update/${doc._id}`, { state: doc, replace: true })
    }

    return (
        <button onClick={handleEdit} className="docWrapp">
            {doc.name}
        </button>
    )

}