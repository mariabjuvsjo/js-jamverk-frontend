import Editor from '@monaco-editor/react'
import { useNavigate, useLocation } from "react-router-dom";
import docModel from "../models/docs";
import useUser from '../hooks/useUser';
import codeModal from '../models/codeExe';
import { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        height: '50vh',
        backgroundColor: '#252525',
        color: '#00FF00'
    },
};

Modal.setAppElement('#root');

export default function UpdateCode() {
    const { state } = useLocation();
    const docId = (state._id);
    const [code, setCode] = useState('')
    const [codeRes, setCodeRes] = useState('')
    const editorRef = useRef(null)
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    async function openModal() {

        const codeRes = await codeModal.executeCode(editorRef.current.getValue())
        setIsOpen(true);
        setCodeRes(codeRes)
    }

    async function fetchOneDoc() {
        //const allDocs = await docModel.getAllDocs();


        const response = await fetch(`${docModel.baseUrl}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: `{  doc(id: "${docId}") {code}}` })
        });
        const res = await response.json();


        setCode(res.data.doc.code)
    }


    useEffect(() => {
        (async () => {
            await fetchOneDoc();


        })();
    }, []);

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#00FF00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor
    }

    async function handleSave() {
        let code = (editorRef.current.getValue())

        await docModel.updateOneDoc({ code }, docId)

        navigate('/documents')
    }

    return (
        <>
            <div>
                <button className='button-5' onClick={openModal}>Run code</button>
                <button className='button-5' onClick={handleSave}>Save code</button>
                <Editor
                    height='90vh'
                    width='50vw'
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value)}
                    onMount={handleEditorDidMount}
                />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <div className='flex'>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Code Result</h2>
                    <button className='button-5 modal small' onClick={closeModal}>Close</button>
                </div>
                <div><p>{codeRes}</p></div>


            </Modal>
        </>


    )
}
