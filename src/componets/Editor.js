import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import docModel from '../models/docs';
import { useNavigate } from "react-router-dom";
//import parse from "html-react-parser";

export default function Editor() {
    const [newDoc, setNewDoc] = useState({});
    let newObject = {};
    const refe = useRef();
    const navigate = useNavigate();

    function changeName(event) {


        newObject[event.target.name] = event.target.value;

        setNewDoc({ ...newDoc, ...newObject });
    }

    function changeText(event) {
        newObject["text"] = event;



        setNewDoc({ ...newDoc, ...newObject });
    }

    async function saveText() {
        await docModel.createDoc(newDoc);

        navigate("/show")





        //submitFunction();
    }


    return (
        <>

            <div className='createcontainer'>
                <label data-testid="labelInput">Name of Document:</label>
                <input
                    type="text"
                    data-testid="input"
                    placeholder="Add Name of document"
                    onChange={changeName}
                    name="name"
                    className="name-text"
                    required

                />
                <div className='toolbar'>
                    <button className="button-5" type="button" onClick={saveText}>
                        Save
                    </button>
                </div>

                <ReactQuill
                    placeholder="Add text to document"
                    //value={text}
                    name="text"
                    //value="editor.getContents()"
                    onChange={changeText}
                    ref={refe}
                    required

                />
            </div>

        </>
    )
}