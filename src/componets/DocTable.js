import { useNavigate } from "react-router-dom";


export default function DocTable({ doc, index }) {
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate('/update', { state: doc, replace: true })
    }

    return (

        <tr>
            <td className="docname">{doc.name}</td>
            <td>
                <button onClick={handleEdit} className="button-5 small" >
                    Edit
                </button>
            </td>
        </tr>





    )

}