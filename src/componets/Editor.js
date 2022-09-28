/*import io from "socket.io-client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

//import parse from "html-react-parser";


//const socket = io.connect("http://localhost:3001")

export default function Editor() {
    //
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();

    const refe = useCallback((wrapper) => {
        if (wrapper == null) return
        wrapper.innerHTML = '';
        const textEditor = document.createElement('div')
        wrapper.append(textEditor)
        const q = new Quill(textEditor, { theme: "snow" })
        setQuill(q)
    }, [])

    useEffect(() => {
        const s = io("http://localhost:3001")
        setSocket(s)

        return () => {
            s.disconnect()
        }


    }, [])


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

    useEffect(() => {
        if (socket == null || quill == null) return
        const changer = (delta) => {
            quill.updateContents(delta)
        }

        socket.on('receive-changes', changer)

        return () => {
            socket.off('receive-changes', changer)
        }
    }, [socket, quill])



    return (
        <>

            <div className='createcontainer'>


                <div className="quill" ref={refe}>

                </div>


            </div>

        </>
    )
}*/