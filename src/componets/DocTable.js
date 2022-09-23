import { useNavigate } from "react-router-dom";


export default function DocTable({ doc, index }) {
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate('/update', { state: doc, replace: true })
    }

    return (
        <div className="docWrapp">
            <h3 className="docname">{doc.name}</h3>

            <button onClick={handleEdit} className="button-5 small" >
                Edit
            </button>
        </div>
    )

}