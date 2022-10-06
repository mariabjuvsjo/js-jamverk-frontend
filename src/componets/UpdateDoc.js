import { io } from "socket.io-client";
import React, { useState, useEffect, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
//import docModel from '../models/docs';
import { useNavigate, useLocation } from "react-router-dom";

const SAVE_AFTER_3000 = 3000

export default function UpdateDoc() {
    const { state } = useLocation();
    const docId = (state._id)
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const s = io("https://jsramverk-editor-mabs21.azurewebsites.net/")
        setSocket(s)

        return () => {
            s.disconnect()
        }


    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once('load-document', document => {
            console.log(document)
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
        const q = new Quill(editor, { theme: "snow", })
        q.disable()
        //q.setText("lets type....")
        setQuill(q)
    }, [])


    async function saveText() {


        navigate("/documents")
        //submitFunction();
    }

    return (
        <>
            <button className="button-5" type="button" onClick={saveText}>
                Edit Finish
            </button>
            <div className="quill" ref={refe}>

            </div>

        </>

    )
}