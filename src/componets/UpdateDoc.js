import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import docModel from '../models/docs';
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";


//import parse from "html-react-parser";

function UpdateDoc() {
    const [newDoc, setNewDoc] = useState({});
    let newObject = {};
    const routing = useNavigate();
    const params = useParams();
    const [name, setName] = useState()
    const [text, setText] = useState()
    const quill = useRef();

    useEffect(() => {
        getDocDetails();
    }, [])


    const getDocDetails = async () => {

        let res = await docModel.getOneDoc(params.id)
        setName(res.name)
        setText(res.text)

    }




    const updateDocDetails = async () => {
        let res = await docModel.updateOneDoc({ name, text }, params.id)

        console.log(res)



        routing("/show")
    }

    return (

        <>

            <div className='createcontainer'>
                <label>Name of Document: </label>
                <input
                    type="text"
                    placeholder="Add Name of document"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    name="name"
                    className="name-text"

                />

                <ReactQuill
                    placeholder="Add text to document"
                    value={text}
                    theme="snow"
                    name="text"

                    //value="editor.getContents()"
                    onEditorChange={(e) => { setText(e.target.ref) }}
                    ref={quill}

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