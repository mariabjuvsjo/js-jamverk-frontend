import { io } from "socket.io-client";

import { pdfExporter } from 'quill-to-pdf';
import { saveAs } from 'file-saver';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
//import docModel from '../models/docs';
import Comments from "./Comments";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import docModel from "../models/docs";
import useUser from '../hooks/useUser';


const SAVE_AFTER_3000 = 3000

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

export default function UpdateDoc() {
    const { state } = useLocation();
    const docId = (state._id);
    const { auth } = useUser();
    const [showComments, setShowComments] = useState([]);
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    async function fetchOne() {
        try {
            const response = await fetch(`${docModel.baseUrl}/text/${docId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            const com = await response.json();

            const comments = com.comments

            console.log(comments)

            setComments(comments)

        } catch (err) {
            console.log("no comments")
        }
    }

    console.log('berofr')

    useEffect(() => {
        (async () => {
            await fetchOne();
        })();
    }, []);


    async function fetchUsers() {
        try {
            const response = await fetch(`${docModel.baseUrl}/users`);
            const users = await response.json();

            console.log(users)

            setUsers(users)

        } catch (err) {
            console.log("no users")
        }
    }

    console.log('berofr')

    useEffect(() => {
        (async () => {
            await fetchUsers();
        })();
    }, []);

    useEffect(() => {
        const s = io("https://jsramverk-editor-mabs21.azurewebsites.net")
        setSocket(s)

        return () => {
            s.disconnect()
        }


    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once('load-document', document => {

            quill.setContents(document)
            quill.enable()
        })

        socket.emit('get-document', docId)

    }, [socket, quill, docId])

    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit("save-document", quill.getContents())
        }, SAVE_AFTER_3000)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return
        const changer = delta => {
            quill.updateContents(delta)
        }



        socket.on('receive-changes', changer)

        return () => {
            socket.off('receive-changes', changer)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return
        const changer = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }

        quill.on('text-change', changer)

        return () => {
            quill.off('text-change', changer)
        }
    }, [socket, quill])



    const refe = useCallback(wrapper => {
        if (wrapper == null) return

        wrapper.innerHTML = '';
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: "snow",
            modules: { toolbar: TOOLBAR_OPTIONS },
        }, [])
        q.disable()
        //q.setText("lets type....")
        setQuill(q)
    }, [])


    function saveText() {

        navigate("/documents")

    }

    async function savePdf(e) {
        //pdfexportwithcomponents.current.save();

        const quillDelta = quill.getContents();
        console.log(quillDelta)
        const toPdf = await pdfExporter.generatePdf(quillDelta)

        saveAs(toPdf, `${docId}.pdf`)
    }



    async function addComment() {
        let comment = window.prompt("please add comment", "");
        let highlighted;
        if (comment == null || comment == "") return

        highlighted = quill.getSelection();

        if (highlighted) {
            if (highlighted.length == 0) {
                alert("highlight the text you like to comment on")
            } else {

                let textToComment = quill.getText(highlighted.index, highlighted.length);
                console.log("User has highlighted: ", textToComment);
                quill.formatText(highlighted.index, highlighted.length, {
                    background: "#fce3c5",
                });


                //commentArr.push({ range: highlighted, comment: comments });

                let comments = {
                    range: highlighted,
                    comment: comment,
                    created: new Date(),
                    addedby: auth.username
                }

                await docModel.updateOneDoc({ comments }, docId)
            }



        } else {
            alert("go in to texteditor field to highlight comment")
        }

    }


    console.log(comments)




    function findCommentText(e) {
        let commentIdx = e.target.value;

        let connection = comments[commentIdx]



        quill.setSelection(connection.range.index, connection.range.length)
    }

    function removeComments() {
        setComments
            ([])
    }

    async function addUser(e) {
        let allowed_users = e.target.value
        try {

            console.log(allowed_users)

            await docModel.updateOneDoc({ allowed_users }, docId)

        } catch (err) {
            alert("user already added")

        }



    }




    let commentTable = comments.map((comm, index) => {
        if (comments.length > 0) {
            return <button type="button" onClick={findCommentText} value={index}>{comm.comment}</button>
        } else {
            return <p>No comments</p>;
        }

    })

    let usersTable = users.map((user, index) => {
        if (users.length > 0) {
            return <button type="button" onClick={addUser} value={user.username}>{user.username}</button>

        } else {
            return <p>No allowed users</p>;
        }


    })



    console.log('after')
    return (
        <>
            <div className="users-wrapp"> <h3>Add allowed Users for document:  </h3>{usersTable}</div>
            <div>
                <div className="button-wrapp">
                    <button className="button-5" type="button" onClick={saveText}>
                        Edit Finish
                    </button>
                    <button className="button-5" type="button" onClick={removeComments}>
                        Remove Comments
                    </button>
                    <button className="button-5" type="button" onClick={savePdf}>
                        export to PDF
                    </button>
                    <button className="button-5" type="button" onClick={addComment} >
                        Add comment
                    </button>
                </div>

                <div className="quill" ref={refe}>

                </div>
            </div>
            <div className="comment-wrapp">
                <h3>Comments</h3>
                {commentTable}

            </div>



        </>


    )
}

