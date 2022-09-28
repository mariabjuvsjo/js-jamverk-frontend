import docModel from '../models/docs';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
export default
    function CreateDoc() {
    const [newDoc, setNewDoc] = useState({});
    let newObject = {};
    const navigate = useNavigate();

    function changeName(event) {


        newObject[event.target.name] = event.target.value;


        setNewDoc({ ...newDoc, ...newObject });
    }


    async function saveText() {
        console.log(newDoc)
        await docModel.createDoc(newDoc);

        navigate("/documents")
        //submitFunction();
    }




    return (
        <>
            <input
                type="text"
                data-testid="input"
                placeholder="Name of document"
                onChange={changeName}
                name="name"
                className="name-text"
                required

            />
            <div className='toolbar'>

                <button className="button-5" type="button" onClick={saveText}>
                    Create
                </button>

            </div>
        </>


    );
}
