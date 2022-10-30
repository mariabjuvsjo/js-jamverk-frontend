import docModel from '../models/docs';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import useUser from '../hooks/useUser';
export default
    function CreateDoc() {
    const [newDoc, setNewDoc] = useState({});
    const { auth } = useUser()
    let newObject = {};
    const navigate = useNavigate();

    function changeName(event) {


        newObject[event.target.name] = event.target.value;


        setNewDoc({ ...newDoc, ...newObject });
    }

    function handleSelect(event) {
        newObject[event.target.name] = event.target.value;

        setNewDoc({ ...newDoc, ...newObject });

    }


    async function saveText(e) {
        e.preventDefault()
        console.log(newDoc)
        await docModel.createDoc(newDoc, auth.token);

        navigate("/documents")
        //submitFunction();
    }




    return (
        <>
            <form onSubmit={saveText}>
                <input
                    type="text"
                    data-testid="input"
                    placeholder="Name of document"
                    onChange={changeName}
                    name="name"
                    className="name-text"
                    required

                />
                <select onChange={handleSelect} name="docType">
                    <option>Select mode: </option>
                    <option value={"text"}>Text</option>
                    <option value={"code"}>Code</option>
                </select>
                <div className='toolbar'>

                    <button className="button-5">
                        Create
                    </button>

                </div>
            </form>
        </>


    );
}
