import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import docModel from '../models/docs';
import { useNavigate, useLocation } from "react-router-dom";
//import parse from "html-react-parser";

function UpdateDoc() {
    const { state } = useLocation();
    const [newDoc, setNewDoc] = useState({
        _id: state._id,
        name: state.name,
        text: state.text
    });
    let newObject = {};
    const routing = useNavigate();
    //const params = useParams();
    //const [name, setName] = useState()
    //const [text, setText] = useState()
    const quill = useRef();
    console.log(state)



    function changeName(event) {


        newObject[event.target.name] = event.target.value;

        setNewDoc({ ...newDoc, ...newObject });
    }

    function changeText(event) {
        newObject["text"] = event;



        setNewDoc({ ...newDoc, ...newObject });
    }




    const updateDocDetails = async () => {
        console.log(newDoc)
        let res = await docModel.updateOneDoc(newDoc)

        console.log(res)



        routing("/show")
    }

    return (

        <>

            <div className='createcontainer'>
                <label>Name of Document: </label>
                <input
                    type="text"
                    placeholder='Add name on document'
                    defaultValue={newDoc.name}
                    onChange={changeName}
                    name="name"
                    className="name-text"

                />

                <ReactQuill
                    placeholder="Add text to document"
                    defaultValue={newDoc.text}
                    theme="snow"
                    name="text"
                    //value="editor.getContents()"
                    onChange={changeText}
                //ref={quill}

                />
            </div>
            <div className='toolbar'>
                <button className="button-5" type="button" onClick={updateDocDetails} >
                    Update
                </button>
            </div>

        </>



    )
}

export default UpdateDoc